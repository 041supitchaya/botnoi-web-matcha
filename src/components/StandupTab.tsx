import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockStandups } from '@/data/mockData';
import { MessageSquare, Filter, Search } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination';

const StandupTab = () => {
  const itemsPerPage = 7;
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDay, setSearchDay] = useState('');
  const [searchMonth, setSearchMonth] = useState('');
  const [filteredStandups, setFilteredStandups] = useState(mockStandups);

  const totalPages = Math.ceil(filteredStandups.length / itemsPerPage);
  const paginatedStandups = filteredStandups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // เลื่อนกลับไปบนสุดทุกครั้งที่ currentPage เปลี่ยน
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const applyFilter = () => {
    let filtered = mockStandups;
    if (searchMonth) {
      const [year, month] = searchMonth.split('-');
      filtered = mockStandups.filter((standup) => {
        const date = new Date(standup.date);
        return (
          date.getFullYear() === parseInt(year) &&
          date.getMonth() === parseInt(month) - 1
        );
      });
    }

    if (searchDay) {
      const day = parseInt(searchDay);
      filtered = filtered.filter((standup) => {
        const date = new Date(standup.date);
        return date.getDate() === day;
      });
    }
    setFilteredStandups(filtered);
    setCurrentPage(1); // รีเซ็ตไปหน้าแรกหลังจาก filter
  };

  const clearFilter = () => {
    setSearchDay('');
    setSearchMonth('');
    setFilteredStandups(mockStandups);
    setCurrentPage(1);
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
      {/* Filter Section */}
      <Card className="border-botnoi-primary-light">
        <CardHeader>
          <CardTitle className="flex items-center text-botnoi-primary-dark">
            <Filter className="h-5 w-5 mr-2" />
            {t('standup.searchTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 pl-4 pb-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-row space-x-4">
                <div>
                  <Label htmlFor="search-month">{t('standup.searchMonth')}</Label>
                  <Input
                    id="search-month"
                    type="month"
                    value={searchMonth}
                    onChange={e => setSearchMonth(e.target.value)}
                    className="border-botnoi-primary-light focus:border-botnoi-primary"
                  />
                </div>
              </div>
              <div className="flex gap-2 items-end">
                <Button
                  onClick={applyFilter}
                  className="bg-botnoi-primary hover:bg-botnoi-primary-dark text-white"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {t('standup.search')}
                </Button>
                <Button
                  variant="outline"
                  onClick={clearFilter}
                  className="border-botnoi-primary text-botnoi-primary"
                >
                  {t('standup.clear')}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stand-up Reports */}
      <Card className="border-botnoi-primary-light">
        <CardHeader>
          <CardTitle className="flex items-center text-botnoi-primary-dark">
            {/* ({filteredStandups.length} {t('standup.list')}) */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredStandups.length > 0 ? (
            <div className="space-y-4 px-4 pb-3">
              {paginatedStandups.map((standup) => (
                <div
                  key={standup.id}
                  className="border border-botnoi-primary-light rounded-lg p-6 hover:bg-botnoi-primary-light/5 transition-colors"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-botnoi-primary-dark mb-1">
                      {formatDate(standup.date)}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-botnoi-accent/20 rounded-md p-4">
                      <p className="text-foreground leading-relaxed">
                        {standup.today}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('common.noData')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
            </PaginationItem>
          )}

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default StandupTab;
