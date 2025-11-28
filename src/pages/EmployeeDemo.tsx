import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/Header';
import AppSidebar from '@/components/AppSidebar';
import EmployeeListDemo from '@/components/EmployeeListDemo';
import { useState } from 'react';

const EmployeeDemo = () => {
  const [activeTab] = useState('employee');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <AppSidebar activeTab={activeTab} setActiveTab={() => {}} />
        <SidebarInset>
          <Header />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <EmployeeListDemo />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default EmployeeDemo;
