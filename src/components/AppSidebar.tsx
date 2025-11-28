
import { useLanguage } from '@/contexts/LanguageContext';
import {
  LayoutDashboard,
  Clock,
  Calendar,
  MessageSquare,
  UserPlus
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AppSidebar = ({ activeTab, setActiveTab }: AppSidebarProps) => {
  const { t } = useLanguage();
  const { state } = useSidebar();

  const navItems = [
    { key: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { key: 'attendance', label: t('nav.attendance'), icon: Clock },
    { key: 'leave', label: t('nav.leave'), icon: Calendar },
    { key: 'standup', label: t('nav.standup'), icon: MessageSquare },
    { key: 'employee', label: t('nav.employee'), icon: UserPlus },
  ];

  return (
    <Sidebar collapsible="icon" >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-botnoi-primary-dark font-semibold text-sm">
            {t('nav.menu')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                const {state, toggleSidebar,isMobile} = useSidebar();
                
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      onClick={() => {
                        setActiveTab(item.key);
                        if (isMobile) toggleSidebar();
                      }}
                      isActive={isActive}
                      className={
                        isActive 
                          ? '!bg-botnoi-primary !text-white' 
                          : '!text-botnoi-primary hover:bg-botnoi-primary-light hover:text-botnoi-primary-dark'
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {(state === "expanded" || isMobile) && <span>{item.label}</span>}

                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;