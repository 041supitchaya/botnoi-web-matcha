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
import { mockLeave } from '@/data/mockData';
import { Calendar } from 'lucide-react';

const LeaveTab = () => {
  const { t } = useLanguage();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-botnoi-success hover:bg-botnoi-success/80 text-white">
            {t('status.approve')}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-botnoi-warning hover:bg-botnoi-warning/80 text-white">
            {t('status.pending')}
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive">
            {t('status.reject')}
          </Badge>
        );
      default:
        return null;
    }
  };

  const getLeaveTypeBadge = (type: string) => {
    switch (type) {
      case 'sick':
        return (
          <Badge variant="outline" className="border-botnoi-info text-botnoi-info">
            {t('leave.sick')}
          </Badge>
        );
      case 'annual':
        return (
          <Badge variant="outline" className="border-botnoi-primary text-botnoi-primary">
            {t('leave.annual')}
          </Badge>
        );
      case 'personal':
        return (
          <Badge variant="outline" className="border-botnoi-accent text-botnoi-primary-dark">
            {t('leave.personal')}
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
     <div className="space-y-6">
      <Card className="border-botnoi-primary-light max-w-[510px] md:max-w-none">
        <CardHeader>
          <CardTitle className="flex items-center text-botnoi-primary-dark">
            <Calendar className="h-5 w-5 mr-2" />
            {t('title.leave')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-6 md:px-6 ">
          <div className="hidden sm:block w-full rounded-md border border-botnoi-primary-light text-center overflow-x-auto overflow-y-auto max-h-[500px]  ">
            <div className="w-full h-full">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow className="bg-botnoi-primary-light/30">
                    <TableHead className="w-1/3 font-medium text-botnoi-primary-dark text-center">{t('title.startDate')}</TableHead>
                    {/* <TableHead className="font-medium text-botnoi-primary-dark text-center">{t('title.endDate')}</TableHead>
                    <TableHead className="font-medium text-botnoi-primary-dark text-center">{t('title.amountDay')}</TableHead> */}
                  
                    <TableHead className="w-1/3 font-medium text-botnoi-primary-dark text-center">{t('title.reason')}</TableHead>
                    <TableHead className="w-1/3 font-medium text-botnoi-primary-dark text-center">{t('title.type')}</TableHead>
                    {/* <TableHead className="font-medium text-botnoi-primary-dark text-center">{t('title.status')}</TableHead> */}

                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLeave.map((record) => (
                    <TableRow key={record.id} className="hover:bg-botnoi-primary-light/10">
                    
                      <TableCell className="whitespace-nowrap">{formatDate(record.startDate)}</TableCell>
                      {/* <TableCell className="whitespace-nowrap">
                        {formatDate(record.endDate)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                         {record.days}
                      </TableCell> */}
                        
                      <TableCell className="whitespace-nowrap">
                         {record.reason}
                      </TableCell>
                      <TableCell className="whitespace-nowrap font-medium">{getLeaveTypeBadge(record.type)}</TableCell>
                      {/* <TableCell className="whitespace-nowrap">{getStatusBadge(record.status)}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="sm:hidden space-y-4 px-2 overflow-auto max-h-[500px] max-w-[900px]">
            {mockLeave.map((record) => (
              <Card key={record.id} className="border-botnoi-primary-light p-4">
              
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{t('title.startDate')}</span>
                  <span>{formatDate(record.startDate)}</span>
                </div>
                
                {/* <div className="flex justify-between mb-2">
                  <span className="font-semibold">{t('title.endDate')}</span>
                  <span>{formatDate(record.endDate)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{t('title.amountDay')}</span>
                  <span>{record.days}</span>
                </div> */}
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{t('title.reason')}</span>
                  <span>{record.days}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{t('title.type')}</span>
                  <span>{getLeaveTypeBadge(record.type)}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="font-semibold">{t('title.status')}</span>
                  <span>{getStatusBadge(record.status)}</span>
                </div> */}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-botnoi-primary-light">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-botnoi-success">
              {mockLeave.filter(r => r.type === 'sick').length}
            </div>
            <p className="text-sm text-muted-foreground">{t('dashboard.workday')}</p>
          </CardContent>
        </Card>

        <Card className="border-botnoi-primary-light">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-botnoi-warning">
              {mockLeave.filter(r => r.type === 'annual').length}
            </div>
            <p className="text-sm text-muted-foreground">{t('dashboard.lateday')}</p>
          </CardContent>
        </Card>

        <Card className="border-botnoi-primary-light">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">
              {mockLeave.filter(r => r.type === 'personal').length}
            </div>
            <p className="text-sm text-muted-foreground">{t('leave.personal')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaveTab;