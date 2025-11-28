
import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/Header';
import AppSidebar from '@/components/AppSidebar';
import Dashboard from '@/components/Dashboard';
import AttendanceTab from '@/components/AttendanceTab';
import LeaveTab from '@/components/LeaveTab';
import StandupTab from '@/components/StandupTab';
import EmployeeManagement from '@/components/EmployeeManagement';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return <AttendanceTab />;
      case 'leave':
        return <LeaveTab />;
      case 'standup':
        return <StandupTab />;
      case 'employee':
        return <EmployeeManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <SidebarInset>
          <Header />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
