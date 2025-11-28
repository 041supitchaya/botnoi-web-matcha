import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockAttendance } from '@/data/mockData';
import { Clock } from 'lucide-react';

const AttendanceTab = () => {
  const { t } = useLanguage();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-botnoi-success hover:bg-botnoi-success/80 text-white">{t('status.present')}</Badge>;
      case 'late':
        return <Badge className="bg-botnoi-warning hover:bg-botnoi-warning/80 text-white">{t('status.late')}</Badge>;
      case 'absent':
        return <Badge variant="destructive">{t('status.absent')}</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-botnoi-primary-light max-w-[510px] md:max-w-none">
        <CardHeader>
          <CardTitle className="flex items-center text-botnoi-primary-dark">
            <Clock className="h-5 w-5 mr-2" />
            {t('title.attendance')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6 px-4 md:px-6">
          <div className="hidden sm:block w-full rounded-md border border-botnoi-primary-light text-center overflow-x-auto overflow-y-auto max-h-[500px] max-w-[900px] lg:max-w-none">
            <div className="inline-block w-full h-full">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow className="bg-botnoi-primary-light/30">
                    <TableHead className="w-1/3 font-medium text-botnoi-primary-dark text-center">{t('title.date')}</TableHead>
                    <TableHead className="w-1/3 font-medium text-botnoi-primary-dark text-center">{t('title.startTime')}</TableHead>
                    {/* <TableHead className="font-medium text-botnoi-primary-dark text-center">{t('title.outTime')}</TableHead> */}
                    {/* <TableHead className="font-medium text-botnoi-primary-dark text-center">{t('title.workhour')}</TableHead> */}
                    <TableHead className="w-1/3 font-medium text-botnoi-primary-dark text-center">{t('title.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAttendance.map((record) => (
                    <TableRow key={record.id} className="hover:bg-botnoi-primary-light/10">
                      <TableCell className="whitespace-nowrap">{formatDate(record.date)}</TableCell>
                      <TableCell className="whitespace-nowrap">{record.checkIn}</TableCell>
                      {/* <TableCell className="whitespace-nowrap">
                        {record.checkOut} 
                      </TableCell> */}
                      {/* <TableCell className="whitespace-nowrap">
                        {record.workHours > 0 ? `${record.workHours}  ${t('attendance.hour')}` : '-'} -
                      </TableCell> */}
                      <TableCell className="whitespace-nowrap">{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="sm:hidden space-y-4 px-2 overflow-auto max-h-[500px] max-w-[900px]">
            {mockAttendance.map((record) => (
              <Card key={record.id} className="border-botnoi-primary-light p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{t('title.date')}</span>
                  <span>{formatDate(record.date)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{t('title.startTime')}</span>
                  <span>{record.checkIn}</span>
                </div>
                {/* <div className="flex justify-between mb-2">
                  <span className="font-semibold">{t('title.outTime')}</span>
                  <span>{record.checkOut}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{t('title.workhour')}</span>
                  <span>{record.workHours > 0 ? `${record.workHours}  ${t('attendance.hour')}` : '-'}</span>
                </div> */}
                <div className="flex justify-between">
                  <span className="font-semibold">{t('title.status')}</span>
                  <span>{getStatusBadge(record.status)}</span>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-botnoi-primary-light">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-botnoi-success">
              {mockAttendance.filter(r => r.status === 'present').length}
            </div>
            <p className="text-sm text-muted-foreground">{t('dashboard.workday')}</p>
          </CardContent>
        </Card>

        <Card className="border-botnoi-primary-light">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-botnoi-warning">
              {mockAttendance.filter(r => r.status === 'late').length}
            </div>
            <p className="text-sm text-muted-foreground">{t('dashboard.lateday')}</p>
          </CardContent>
        </Card>

        <Card className="border-botnoi-primary-light">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">
              {mockAttendance.filter(r => r.status === 'absent').length}
            </div>
            <p className="text-sm text-muted-foreground">{t('dashboard.absent')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceTab;