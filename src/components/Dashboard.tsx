import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockAttendance, mockLeave, mockStandups } from '@/data/mockData';
import { Clock, Calendar, MessageSquare, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { t } = useLanguage();

  // Calculate stats
  const todayAttendance = mockAttendance.find(record => 
    record.date === new Date().toISOString().split('T')[0]
  );
  
  const thisMonthLeave = mockLeave.filter(leave => {
    const leaveDate = new Date(leave.startDate);
    const now = new Date();
    return leaveDate.getMonth() === now.getMonth() && 
           leaveDate.getFullYear() === now.getFullYear();
  }).length;

  const recentStandups = mockStandups.slice(0, 3);

  const presentDays = mockAttendance.filter(record => record.status === 'present').length;
  const lateDays = mockAttendance.filter(record => record.status === 'late').length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-botnoi-primary to-botnoi-accent rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {t('dashboard.welcome')}, สมชาย!
            </h1>
            <p className="text-white/75">
              {t('dashboard.overview')}
            </p>
          </div>
          <div className="hidden md:block">
            <img 
              src="/lovable-uploads/26594962-7055-4399-9796-5131b247b6df.png" 
              alt="Matcha Mascot" 
              className="h-20 w-20"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-botnoi-primary-light">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('dashboard.todayAttendance')}
            </CardTitle>
            <Clock className="h-4 w-4 text-botnoi-primary" />
          </CardHeader>
          <CardContent className='pl-6'>
            <div className="text-2xl font-bold text-botnoi-primary-dark">
              {todayAttendance ? todayAttendance.checkIn : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              {todayAttendance?.status === 'present' && 'เข้างานตรงเวลา'}
              {todayAttendance?.status === 'late' && 'เข้างานสาย'}
              {!todayAttendance && t('dashboard.noAttendance')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-botnoi-primary-light pb-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('dashboard.thisMonthLeave')}
            </CardTitle>
            <Calendar className="h-4 w-4 text-botnoi-primary" />
          </CardHeader>
          <CardContent className='pl-6'>
            <div className="text-2xl font-bold text-botnoi-primary-dark">
              {thisMonthLeave}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.time')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-botnoi-primary-light">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('dashboard.workday')}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-botnoi-success" />
          </CardHeader>
          <CardContent className='pl-6'>
            <div className="text-2xl font-bold text-botnoi-success">
              {presentDays}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.lastsevenday')}
            </p>
          </CardContent>
        </Card>

        <Card className="border-botnoi-primary-light">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('dashboard.lateday')}
            </CardTitle>
            <Clock className="h-4 w-4 text-botnoi-warning" />
          </CardHeader>
          <CardContent className='pl-6'>
            <div className="text-2xl font-bold text-botnoi-warning ">
              {lateDays}
            </div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.lastsevenday')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Stand-ups */}
      <Card className="border-botnoi-primary-light">
        <CardHeader>
          <CardTitle className="flex items-center text-botnoi-primary-dark">
            <MessageSquare className="h-5 w-5 mr-2" />
            {t('dashboard.recentStandups')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 pb-4 px-4">
            {recentStandups
             .filter((standup) => {
              const today = new Date().toISOString().split("T")[0];
              const standupDate = new Date(standup.date).toISOString().split("T")[0];
              return standupDate === today;
            })
            .map((standup) => (
              <div key={standup.id} className="border border-botnoi-primary-light rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-botnoi-primary-dark">
                    {new Date(standup.date).toLocaleDateString('th-TH')}
                  </h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    {/* <span className="font-medium text-muted-foreground">{t('standup.today')}: </span> */}
                    <div className="bg-botnoi-accent/20 rounded-md p-4">
                      <p className="text-foreground leading-relaxed">{standup.today}</p>
                    </div>
                  </div>
                  {/* {standup.blockers !== 'ไม่มีอุปสรรค' && (
                    <div>
                      <span className="font-medium text-muted-foreground">{t('standup.blockers')}: </span>
                      <span className="text-botnoi-warning">{standup.blockers}</span>
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;