export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
};

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    await refreshToken();
    throw new Error('Token refreshed, please retry');
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `API Error: ${response.status}`);
  }

  return response.json();
};

export const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await fetch(`${BACKEND_URL}/token/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};

export const revokeToken = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) return;

  try {
    await fetch(`${BACKEND_URL}/token/revoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  } catch (error) {
    console.error('Token revoke failed:', error);
  }
};

export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${BACKEND_URL}/healthz`);
    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

export const getMainPageData = async () => {
  const response = await fetch(`${BACKEND_URL}/api/mainpage`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const searchMonthData = async (month: string, name?: string) => {
  const params = new URLSearchParams({ month });
  if (name) params.append('name', name);

  const response = await fetch(
    `${BACKEND_URL}/api/monthsearch?${params.toString()}`,
    { headers: getAuthHeaders() }
  );
  return handleResponse(response);
};

export const getLeaveData = async () => {
  const response = await fetch(`${BACKEND_URL}/api/leave`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const logout = async (): Promise<void> => {
  try {
    await revokeToken();
    await fetch(`${BACKEND_URL}/logout`);
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const initiateDiscordLogin = () => {
  // สร้าง state parameter สำหรับความปลอดภัย
  const state = Math.random().toString(36).substring(7);
  // เก็บ state ไว้ตรวจสอบตอน callback
  localStorage.setItem('oauth_state', state);

  const redirectUri = `${FRONTEND_URL}/auth/discord/callback`;
  const loginUrl = `${BACKEND_URL}/auth/discord/login?` +
    new URLSearchParams({
      redirect_uri: redirectUri,
      state: state
    }).toString();

  window.location.href = loginUrl;
};

// เพิ่มฟังก์ชันสำหรับตรวจสอบ OAuth callback
export const handleOAuthCallback = (accessToken: string, refreshToken: string) => {
  console.log("Storing tokens from URL"); // debug

  if (accessToken && refreshToken) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    console.log("Tokens stored successfully");
    return { success: true };
  } else {
    console.error("Access token or refresh token not found in URL");
    return { success: false, error: "Tokens not found" };
  }
};
