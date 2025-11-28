import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Search, Edit, Trash2, Plus } from 'lucide-react';

const EmployeeListDemo = () => {
  const mockEmployees = [
    {
      id: '1',
      employee_code: 'EMP001',
      status: 'active',
      employee_type: 'fulltime',
      title_th: 'นาย',
      first_name_th: 'สมชาย',
      last_name_th: 'ใจดี',
      nickname_th: 'ชาย',
      first_name_en: 'Somchai',
      last_name_en: 'Jaidee',
      nickname_en: 'Som',
    },
    {
      id: '2',
      employee_code: 'EMP002',
      status: 'active',
      employee_type: 'fulltime',
      title_th: 'นางสาว',
      first_name_th: 'สมหญิง',
      last_name_th: 'สวยใจ',
      nickname_th: 'หญิง',
      first_name_en: 'Somying',
      last_name_en: 'Suaychai',
      nickname_en: 'Som',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-botnoi-primary-dark">
            รายชื่อพนักงาน
          </h1>
          <Button className="bg-botnoi-primary hover:bg-botnoi-primary-dark text-white">
            <Plus className="h-4 w-4 mr-2" />
            เพิ่มพนักงานใหม่
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ค้นหาด้วยรหัส, ชื่อ หรือนามสกุล..."
                  className="pl-10"
                  disabled
                />
              </div>
              <CardTitle className="text-botnoi-primary-dark">
                ทั้งหมด: {mockEmployees.length}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">รหัส</TableHead>
                    <TableHead className="font-semibold">ชื่อ-นามสกุล</TableHead>
                    <TableHead className="font-semibold">ชื่อเล่น</TableHead>
                    <TableHead className="font-semibold">ประเภทพนักงาน</TableHead>
                    <TableHead className="font-semibold">สถานะ</TableHead>
                    <TableHead className="text-right font-semibold">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEmployees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-botnoi-primary-dark">
                        {employee.employee_code}
                      </TableCell>
                      <TableCell>
                        {employee.title_th}
                        {employee.first_name_th} {employee.last_name_th}
                      </TableCell>
                      <TableCell>{employee.nickname_th}</TableCell>
                      <TableCell>
                        {employee.employee_type === 'fulltime' ? 'พนักงานประจำ' : employee.employee_type}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          ใช้งาน
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-botnoi-primary text-botnoi-primary hover:bg-botnoi-primary-light"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
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
          </CardContent>
        </Card>

        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold text-botnoi-primary-dark mb-6">
            ตัวอย่างข้อมูลรายละเอียดของพนักงาน:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockEmployees.map((emp) => (
              <Card key={emp.id} className="border-botnoi-primary-light">
                <CardHeader className="bg-botnoi-primary-light/20">
                  <CardTitle className="text-lg text-botnoi-primary-dark">
                    {emp.employee_code} - {emp.title_th}{emp.first_name_th} {emp.last_name_th}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 font-semibold">ชื่อ (ไทย):</p>
                      <p className="text-gray-900">{emp.first_name_th}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-semibold">นามสกุล (ไทย):</p>
                      <p className="text-gray-900">{emp.last_name_th}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-semibold">First Name:</p>
                      <p className="text-gray-900">{emp.first_name_en}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-semibold">Last Name:</p>
                      <p className="text-gray-900">{emp.last_name_en}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-semibold">ชื่อเล่น (ไทย):</p>
                      <p className="text-gray-900">{emp.nickname_th}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-semibold">Nickname:</p>
                      <p className="text-gray-900">{emp.nickname_en}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-semibold">ประเภท:</p>
                      <p className="text-gray-900">พนักงานประจำ</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-semibold">สถานะ:</p>
                      <Badge className="bg-green-100 text-green-800 w-fit">ใช้งาน</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeListDemo;
