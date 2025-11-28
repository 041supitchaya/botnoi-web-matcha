import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { handleOAuthCallback } from "@/lib/api"; // 1. Import ฟังก์ชันเข้ามา

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const authSuccess = params.get("auth");
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        const authError = params.get("error");
        const authErrorDescription = params.get("error_description");

        // ✅ ตรวจว่ามี auth=success ไหม
        if (authSuccess === "success") {
          // ถ้าไม่มี token ใน URL → ลอง refresh token ผ่าน cookie
          // ✅ ถ้ามี token ใน URL ให้เรียกใช้ handleOAuthCallback
          if (accessToken && refreshToken) {
            const result = handleOAuthCallback(accessToken, refreshToken);
            if (!result.success) {
              throw new Error(result.error || "Failed to handle OAuth callback");
            }
            setIsLoggedIn(true);
          }

          // ✅ ลบ query ออกจาก URL (เช่น ?auth=success&access_token=...)
          window.history.replaceState({}, document.title, "/");

          // ✅ redirect ไปหน้า home ด้วยการ reload หน้าใหม่ (ปลอดภัยสุด)
          window.location.href = "/";
          return;
        }

        // ❌ ตรวจสอบว่ามี error ส่งกลับมาหรือไม่
        if (authError || authErrorDescription) {
          throw new Error(authErrorDescription || authError || "Authentication failed from server.");
        }
        // ❌ ถ้าไม่มี auth=success → กลับไป login
        throw new Error("Invalid authentication redirect: 'auth=success' parameter is missing.");
      } catch (err: any) {
        console.error("Auth redirect handling failed:", err);
        setError(err.message || "An unknown authentication error occurred.");
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    handleOAuthRedirect();
  }, [navigate, setIsLoggedIn]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Login Failed</h2>
          <p>{error}</p>
          <p className="mt-2">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Logging in...</h2>
        <p>Please wait while we complete your authentication</p>
      </div>
    </div>
  );
};

export default OAuthCallback;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";

// const BACKEND_URL = "https://baldachined-stainably-shenita.ngrok-free.dev";

// const OAuthCallback: React.FC = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState<string | null>(null);
//   const { setIsLoggedIn } = useAuth();

//   useEffect(() => {
//     const handle = async () => {
//       const params = new URLSearchParams(window.location.search);
//       const code = params.get("code");
//       const state = params.get("state");

//       console.log("Received code:", code);
//       console.log("Received state:", state);

//       if (!code) {
//         setError("No authorization code received");
//         setTimeout(() => navigate("/login"), 2000);
//         return;
//       }

//       try {
//         // ส่ง code ไปให้ backend แลกเป็น token (backend ต้องจัดการ client_secret และ CORS/redirect)
//         const resp = await fetch(`${BACKEND_URL}/auth/discord/exchange`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             code,
//             state,
//             redirect_uri: `${window.location.origin}/auth/discord/callback`,
//           }),
//           credentials: "include", // ถ้า backend ใช้ cookie/session
//         });

//         console.log("Exchange response status:", resp.status);

//         if (!resp.ok) {
//           const text = await resp.text().catch(() => null);
//           console.error("Exchange failed:", text || resp.statusText);
//           throw new Error(text || `HTTP ${resp.status}`);
//         }

//         const data = await resp.json().catch(() => null);
//         console.log("Exchange response data:", data);

//         // ถ้า backend ตอบกลับด้วย tokens
//         if (data?.access_token && data?.refresh_token) {
//           localStorage.setItem("access_token", data.access_token);
//           localStorage.setItem("refresh_token", data.refresh_token);
//           if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
//           setIsLoggedIn(true);
//           window.location.href = "/";
//           return;
//         }

//         // หรือถ้า backend ใช้ cookie/session แล้วตอบ success boolean
//         if (data?.success) {
//           setIsLoggedIn(true);
//           window.location.href = "/";
//           return;
//         }

//         throw new Error("Invalid response from backend");
//       } catch (e: any) {
//         console.error("Error during authentication:", e);
//         setError(e?.message || "Authentication failed");
//         setTimeout(() => navigate("/login"), 3000);
//       }
//     };

//     handle();
//   }, [navigate, setIsLoggedIn]);

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <h2 className="text-xl font-semibold mb-2 text-red-600">Login Failed</h2>
//           <p>{error}</p>
//           <p className="mt-2">Redirecting to login page...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <h2 className="text-xl font-semibold mb-2">Logging in...</h2>
//         <p>Please wait while we complete your authentication</p>
//       </div>
//     </div>
//   );
// };

// export default OAuthCallback;