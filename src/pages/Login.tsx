import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';
import { initiateDiscordLogin } from '@/lib/api';

const Login = () => {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      window.location.href = '/';
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'th' ? 'en' : 'th');
  };

  const handleDiscordLogin = () => {
    initiateDiscordLogin();
  };

  const getCurrentFlag = () => {
    if (language === 'th') {
      return (
        <div className='flex items-center space-x-2'>
          <img 
            src="/lovable-uploads/th.png" 
            alt="Thailand Flag" 
            className="w-6 h-6 rounded-sm object-cover"
          />
          <p className='text-md'>TH</p>
        </div>
      );
    } else {
      return (
        <div className='flex items-center space-x-2'>
          <img 
            src="/lovable-uploads/uk.png" 
            alt="Uk Flag" 
            className="w-6 h-6 rounded-sm object-cover"
          />
          <p className='text-md'>EN</p>
        </div>
      );
    }
  };


  return (
    <div className="h-screen bg-gradient-to-br from-botnoi-primary-light via-white to-botnoi-accent flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-botnoi-primary hover:bg-botnoi-primary-light hover:text-botnoi-primary-dark"
          >
            {getCurrentFlag()}
          </Button>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-botnoi-primary-light">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <img 
              src="/lovable-uploads/botnoi.png" 
              alt="BotNoi Logo" 
              className=" h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-botnoi-primary-dark mb-2">
              Employee Dashboard
            </h1>
            <p className="text-muted-foreground">
              {language === 'th' ? 'เข้าสู่ระบบด้วยบัญชี Discord' : 'Login with your Discord account'}
            </p>
          </div>

          {/* Mascot */}
          <div className="text-center mb-6">
            <img 
              src="/lovable-uploads/26594962-7055-4399-9796-5131b247b6df.png" 
              alt="Matcha Mascot" 
              className="h-24 w-auto mx-auto"
            />
          </div>

          {/* Discord Login Button */}
          <Button
            onClick={handleDiscordLogin}
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 text-lg font-semibold"
          >
            <svg className="!w-6 !h-6 mr-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.4-2.172-1.27-2.172-1.27s.135.064.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.337.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.165-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.34.002-.74.573-1.338 1.27-1.335zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.34 0-.74.57-1.335 1.27-1.335z"/>
            </svg>
            {language === 'th' ? 'เข้าสู่ระบบด้วย Discord' : 'Login with Discord'}
          </Button>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>
              {language === 'th'
                ? 'สำหรับพนักงานบริษัทบอทน้อยเท่านั้น'
                : 'For BotNoi employees only'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;