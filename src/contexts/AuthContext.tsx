import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logout as apiLogout, revokeToken } from '@/lib/api';

interface User {
  id?: string;
  username?: string;
  email?: string;
  avatar?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: User | null;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = sessionStorage.getItem('access_token'); // ✅ ใช้ sessionStorage
      const userData = sessionStorage.getItem('user'); // ✅ ใช้ sessionStorage เช่นกัน

      if (accessToken) {
        setIsLoggedIn(true);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await revokeToken();
      await apiLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.clear(); // ✅ เคลียร์ทุกอย่างใน sessionStorage
      setIsLoggedIn(false);
      setUser(null);
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { logout as apiLogout, revokeToken } from '@/lib/api';

// interface User {
//   id?: string;
//   username?: string;
//   email?: string;
//   avatar?: string;
// }

// interface AuthContextType {
//   isLoggedIn: boolean;
//   setIsLoggedIn: (value: boolean) => void;  // Add this line
//   user: User | null;
//   logout: () => Promise<void>;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = () => {
//       const accessToken = localStorage.getItem('access_token');
//       const userData = localStorage.getItem('user');

//       if (accessToken) {
//         setIsLoggedIn(true);
//         if (userData) {
//           setUser(JSON.parse(userData));
//         }
//       }
//       setLoading(false);
//     };

//     checkAuth();
//   }, []);

//   const logout = async () => {
//     try {
//       await revokeToken();
//       await apiLogout();
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');
//       localStorage.removeItem('user');
//       setIsLoggedIn(false);
//       setUser(null);
//       window.location.href = '/login';
//     }
//   };

//   return (
//     <AuthContext.Provider value={{
//       isLoggedIn,
//       setIsLoggedIn,  // Add this line
//       user,
//       logout,
//       loading
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
