import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/Header';
import EmployeeListDemo from '@/components/EmployeeListDemo';

const EmployeeDemo = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <SidebarInset className="w-full">
          <Header />
          <main className="flex-1">
            <EmployeeListDemo />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default EmployeeDemo;
