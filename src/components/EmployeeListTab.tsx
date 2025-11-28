import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Employee {
  id: string;
  employee_code: string;
  status: string;
  employee_type: string;
  title_th: string;
  first_name_th: string;
  last_name_th: string;
  nickname_th: string;
  first_name_en: string;
  last_name_en: string;
  nickname_en: string;
  gender: string;
  marital_status: string;
  ethnicity: string;
  nationality: string;
  blood_type: string;
  weight: number;
  height: number;
  military_status: string;
  religion: string;
  created_at: string;
  updated_at: string;
}

interface EmployeeListTabProps {
  onAddNew: () => void;
  onEdit?: (employee: Employee) => void;
}

const EmployeeListTab = ({ onAddNew, onEdit }: EmployeeListTabProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: t('employee.error'),
        description: t('employee.fetchError'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;

    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', selectedEmployee.id);

      if (error) throw error;

      toast({
        title: t('employee.success'),
        description: t('employee.deleteSuccess'),
      });

      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast({
        title: t('employee.error'),
        description: t('employee.deleteError'),
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedEmployee(null);
    }
  };

  const openDeleteDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const filteredEmployees = employees.filter((emp) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      emp.employee_code.toLowerCase().includes(searchLower) ||
      emp.first_name_th.toLowerCase().includes(searchLower) ||
      emp.last_name_th.toLowerCase().includes(searchLower) ||
      emp.first_name_en.toLowerCase().includes(searchLower) ||
      emp.last_name_en.toLowerCase().includes(searchLower) ||
      emp.nickname_th.toLowerCase().includes(searchLower) ||
      emp.nickname_en.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      active: 'default',
      inactive: 'secondary',
      resigned: 'destructive',
    };
    return (
      <Badge variant={variants[status] || 'default'}>
        {t(`employee.status${status.charAt(0).toUpperCase()}${status.slice(1)}`)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-botnoi-primary-dark">
          {t('employee.listTitle')}
        </h1>
        <Button
          onClick={onAddNew}
          className="bg-botnoi-primary hover:bg-botnoi-primary-dark text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('employee.addNew')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('employee.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <CardTitle className="text-botnoi-primary-dark">
              {t('employee.total')}: {filteredEmployees.length}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              {t('employee.loading')}
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? t('employee.noResults') : t('employee.noData')}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('employee.code')}</TableHead>
                    <TableHead>{t('employee.fullName')}</TableHead>
                    <TableHead>{t('employee.nickname')}</TableHead>
                    <TableHead>{t('employee.type')}</TableHead>
                    <TableHead>{t('employee.status')}</TableHead>
                    <TableHead className="text-right">{t('employee.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        {employee.employee_code}
                      </TableCell>
                      <TableCell>
                        {language === 'th'
                          ? `${employee.title_th}${employee.first_name_th} ${employee.last_name_th}`
                          : `${employee.first_name_en} ${employee.last_name_en}`}
                      </TableCell>
                      <TableCell>
                        {language === 'th' ? employee.nickname_th : employee.nickname_en}
                      </TableCell>
                      <TableCell>
                        {employee.employee_type
                          ? t(`employee.type${employee.employee_type.charAt(0).toUpperCase()}${employee.employee_type.slice(1)}`)
                          : '-'}
                      </TableCell>
                      <TableCell>{getStatusBadge(employee.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit?.(employee)}
                            className="border-botnoi-primary text-botnoi-primary hover:bg-botnoi-primary-light"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(employee)}
                            className="border-red-500 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('employee.deleteConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('employee.deleteConfirmMessage')}
              {selectedEmployee && (
                <span className="font-semibold">
                  {' '}
                  {language === 'th'
                    ? `${selectedEmployee.title_th}${selectedEmployee.first_name_th} ${selectedEmployee.last_name_th}`
                    : `${selectedEmployee.first_name_en} ${selectedEmployee.last_name_en}`}
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('employee.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              {t('employee.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmployeeListTab;
