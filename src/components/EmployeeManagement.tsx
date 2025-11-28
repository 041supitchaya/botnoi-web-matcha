import { useState } from 'react';
import EmployeeListTab from './EmployeeListTab';
import EmployeeFormTab from './EmployeeFormTab';

type ViewMode = 'list' | 'form';

const EmployeeManagement = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editEmployee, setEditEmployee] = useState<any>(null);

  const handleAddNew = () => {
    setEditEmployee(null);
    setViewMode('form');
  };

  const handleEdit = (employee: any) => {
    setEditEmployee(employee);
    setViewMode('form');
  };

  const handleBack = () => {
    setEditEmployee(null);
    setViewMode('list');
  };

  const handleSaveSuccess = () => {
    setEditEmployee(null);
  };

  return (
    <>
      {viewMode === 'list' ? (
        <EmployeeListTab onAddNew={handleAddNew} onEdit={handleEdit} />
      ) : (
        <EmployeeFormTab
          onBack={handleBack}
          editEmployee={editEmployee}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </>
  );
};

export default EmployeeManagement;
