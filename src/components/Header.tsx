
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === 'th' ? 'en' : 'th');
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
          <p className='text-md hidden md:inline'>TH</p>
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
          <p className='text-md hidden md:inline'>EN</p>
        </div>
      );
    }
  };

  return (
    <header className="bg-white border-b border-botnoi-primary-light shadow-sm">
      <div className="flex items-center justify-between mx-4 md:mx-7 my-3">
        <div className='flex space-x-3'>
           <SidebarTrigger/>
          <div className="flex items-center justify-start space-x-2 md:space-x-4">
            <img 
              src="/lovable-uploads/botnoi.png" 
              alt="BotNoi Logo" 
              className="h-7 md:h-8 w-auto"
            />
            <h1 className="text-md md:text-xl font-bold text-botnoi-primary-dark">
              Employee Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-4">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-botnoi-primary hover:bg-botnoi-primary-light hover:text-botnoi-primary-dark"
          > 
            {getCurrentFlag()}
          </Button>

          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-7 w-7 md:h-8 md:w-8 rounded-full">
                  <Avatar className="h-7 w-7 md:h-8 md:w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-botnoi-primary text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-botnoi-primary-dark">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.position}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('header.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;