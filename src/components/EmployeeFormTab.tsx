import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

interface EmployeeFormData {
  id?: string;
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
  weight: string;
  height: string;
  military_status: string;
  religion: string;
}

interface EmployeeFormTabProps {
  onBack: () => void;
  editEmployee?: any;
  onSaveSuccess?: () => void;
}

const EmployeeFormTab = ({ onBack, editEmployee, onSaveSuccess }: EmployeeFormTabProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const initialFormData: EmployeeFormData = {
    employee_code: '',
    status: 'active',
    employee_type: '',
    title_th: '',
    first_name_th: '',
    last_name_th: '',
    nickname_th: '',
    first_name_en: '',
    last_name_en: '',
    nickname_en: '',
    gender: '',
    marital_status: '',
    ethnicity: 'ไทย',
    nationality: 'ไทย',
    blood_type: '',
    weight: '',
    height: '',
    military_status: '',
    religion: '',
  };

  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);

  useEffect(() => {
    if (editEmployee) {
      setFormData({
        id: editEmployee.id,
        employee_code: editEmployee.employee_code,
        status: editEmployee.status,
        employee_type: editEmployee.employee_type || '',
        title_th: editEmployee.title_th || '',
        first_name_th: editEmployee.first_name_th,
        last_name_th: editEmployee.last_name_th,
        nickname_th: editEmployee.nickname_th || '',
        first_name_en: editEmployee.first_name_en || '',
        last_name_en: editEmployee.last_name_en || '',
        nickname_en: editEmployee.nickname_en || '',
        gender: editEmployee.gender || '',
        marital_status: editEmployee.marital_status || '',
        ethnicity: editEmployee.ethnicity || 'ไทย',
        nationality: editEmployee.nationality || 'ไทย',
        blood_type: editEmployee.blood_type || '',
        weight: editEmployee.weight?.toString() || '',
        height: editEmployee.height?.toString() || '',
        military_status: editEmployee.military_status || '',
        religion: editEmployee.religion || '',
      });
    }
  }, [editEmployee]);

  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.employee_code || !formData.first_name_th || !formData.last_name_th) {
      toast({
        title: t('employee.error'),
        description: t('employee.requiredFields'),
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    try {
      const employeeData = {
        employee_code: formData.employee_code,
        status: formData.status,
        employee_type: formData.employee_type,
        title_th: formData.title_th,
        first_name_th: formData.first_name_th,
        last_name_th: formData.last_name_th,
        nickname_th: formData.nickname_th,
        first_name_en: formData.first_name_en,
        last_name_en: formData.last_name_en,
        nickname_en: formData.nickname_en,
        gender: formData.gender,
        marital_status: formData.marital_status,
        ethnicity: formData.ethnicity,
        nationality: formData.nationality,
        blood_type: formData.blood_type,
        weight: formData.weight ? parseFloat(formData.weight) : 0,
        height: formData.height ? parseFloat(formData.height) : 0,
        military_status: formData.military_status,
        religion: formData.religion,
        updated_at: new Date().toISOString(),
      };

      toast({
        title: t('employee.success'),
        description: formData.id ? t('employee.updateSuccess') : t('employee.savedSuccess'),
      });

      setFormData(initialFormData);
      onSaveSuccess?.();
      onBack();
    } catch (error: any) {
      console.error('Error saving employee:', error);
      toast({
        title: t('employee.error'),
        description: error.message || t('employee.saveError'),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-botnoi-primary text-botnoi-primary hover:bg-botnoi-primary-light"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('employee.back')}
        </Button>
        <h1 className="text-3xl font-bold text-botnoi-primary-dark">
          {formData.id ? t('employee.editTitle') : t('employee.title')}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-botnoi-primary-dark">
            {t('employee.formTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="employee_code" className="text-botnoi-primary-dark">
                  {t('employee.code')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="employee_code"
                  value={formData.employee_code}
                  onChange={(e) => handleInputChange('employee_code', e.target.value)}
                  placeholder={t('employee.codePlaceholder')}
                  required
                  disabled={!!formData.id}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-botnoi-primary-dark">
                  {t('employee.status')}
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{t('employee.statusActive')}</SelectItem>
                    <SelectItem value="inactive">{t('employee.statusInactive')}</SelectItem>
                    <SelectItem value="resigned">{t('employee.statusResigned')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employee_type" className="text-botnoi-primary-dark">
                  {t('employee.type')}
                </Label>
                <Select value={formData.employee_type} onValueChange={(value) => handleInputChange('employee_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('employee.typePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulltime">{t('employee.typeFulltime')}</SelectItem>
                    <SelectItem value="parttime">{t('employee.typeParttime')}</SelectItem>
                    <SelectItem value="contract">{t('employee.typeContract')}</SelectItem>
                    <SelectItem value="internship">{t('employee.typeInternship')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title_th" className="text-botnoi-primary-dark">
                  {t('employee.titleTh')}
                </Label>
                <Select value={formData.title_th} onValueChange={(value) => handleInputChange('title_th', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('employee.titlePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="นาย">นาย</SelectItem>
                    <SelectItem value="นาง">นาง</SelectItem>
                    <SelectItem value="นางสาว">นางสาว</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="first_name_th" className="text-botnoi-primary-dark">
                  {t('employee.firstNameTh')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="first_name_th"
                  value={formData.first_name_th}
                  onChange={(e) => handleInputChange('first_name_th', e.target.value)}
                  placeholder={t('employee.firstNameThPlaceholder')}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name_th" className="text-botnoi-primary-dark">
                  {t('employee.lastNameTh')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="last_name_th"
                  value={formData.last_name_th}
                  onChange={(e) => handleInputChange('last_name_th', e.target.value)}
                  placeholder={t('employee.lastNameThPlaceholder')}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname_th" className="text-botnoi-primary-dark">
                  {t('employee.nicknameTh')}
                </Label>
                <Input
                  id="nickname_th"
                  value={formData.nickname_th}
                  onChange={(e) => handleInputChange('nickname_th', e.target.value)}
                  placeholder={t('employee.nicknameThPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="first_name_en" className="text-botnoi-primary-dark">
                  {t('employee.firstNameEn')}
                </Label>
                <Input
                  id="first_name_en"
                  value={formData.first_name_en}
                  onChange={(e) => handleInputChange('first_name_en', e.target.value)}
                  placeholder={t('employee.firstNameEnPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name_en" className="text-botnoi-primary-dark">
                  {t('employee.lastNameEn')}
                </Label>
                <Input
                  id="last_name_en"
                  value={formData.last_name_en}
                  onChange={(e) => handleInputChange('last_name_en', e.target.value)}
                  placeholder={t('employee.lastNameEnPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname_en" className="text-botnoi-primary-dark">
                  {t('employee.nicknameEn')}
                </Label>
                <Input
                  id="nickname_en"
                  value={formData.nickname_en}
                  onChange={(e) => handleInputChange('nickname_en', e.target.value)}
                  placeholder={t('employee.nicknameEnPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-botnoi-primary-dark">
                  {t('employee.gender')}
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('employee.genderPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t('employee.genderMale')}</SelectItem>
                    <SelectItem value="female">{t('employee.genderFemale')}</SelectItem>
                    <SelectItem value="other">{t('employee.genderOther')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="marital_status" className="text-botnoi-primary-dark">
                  {t('employee.maritalStatus')}
                </Label>
                <Select value={formData.marital_status} onValueChange={(value) => handleInputChange('marital_status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('employee.maritalStatusPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">{t('employee.maritalSingle')}</SelectItem>
                    <SelectItem value="married">{t('employee.maritalMarried')}</SelectItem>
                    <SelectItem value="divorced">{t('employee.maritalDivorced')}</SelectItem>
                    <SelectItem value="widowed">{t('employee.maritalWidowed')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ethnicity" className="text-botnoi-primary-dark">
                  {t('employee.ethnicity')}
                </Label>
                <Input
                  id="ethnicity"
                  value={formData.ethnicity}
                  onChange={(e) => handleInputChange('ethnicity', e.target.value)}
                  placeholder={t('employee.ethnicityPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-botnoi-primary-dark">
                  {t('employee.nationality')}
                </Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder={t('employee.nationalityPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="blood_type" className="text-botnoi-primary-dark">
                  {t('employee.bloodType')}
                </Label>
                <Select value={formData.blood_type} onValueChange={(value) => handleInputChange('blood_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('employee.bloodTypePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="AB">AB</SelectItem>
                    <SelectItem value="O">O</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="text-botnoi-primary-dark">
                  {t('employee.weight')}
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder={t('employee.weightPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-botnoi-primary-dark">
                  {t('employee.height')}
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  placeholder={t('employee.heightPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="military_status" className="text-botnoi-primary-dark">
                  {t('employee.militaryStatus')}
                </Label>
                <Select value={formData.military_status} onValueChange={(value) => handleInputChange('military_status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('employee.militaryStatusPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exempt">{t('employee.militaryExempt')}</SelectItem>
                    <SelectItem value="completed">{t('employee.militaryCompleted')}</SelectItem>
                    <SelectItem value="not_applicable">{t('employee.militaryNotApplicable')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="religion" className="text-botnoi-primary-dark">
                  {t('employee.religion')}
                </Label>
                <Select value={formData.religion} onValueChange={(value) => handleInputChange('religion', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('employee.religionPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buddhism">{t('employee.religionBuddhism')}</SelectItem>
                    <SelectItem value="christianity">{t('employee.religionChristianity')}</SelectItem>
                    <SelectItem value="islam">{t('employee.religionIslam')}</SelectItem>
                    <SelectItem value="hinduism">{t('employee.religionHinduism')}</SelectItem>
                    <SelectItem value="other">{t('employee.religionOther')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="border-botnoi-primary text-botnoi-primary hover:bg-botnoi-primary-light"
                disabled={saving}
              >
                {t('employee.reset')}
              </Button>
              <Button
                type="submit"
                className="bg-botnoi-primary hover:bg-botnoi-primary-dark text-white"
                disabled={saving}
              >
                {saving ? t('employee.saving') : t('employee.save')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeFormTab;
