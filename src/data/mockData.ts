// Mock data for Employee Dashboard
export interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: number;
  status: 'present' | 'late' | 'absent';
}

export interface LeaveRecord {
  id: string;
  type: 'sick' | 'annual' | 'personal';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface StandupRecord {
  id: string;
  date: string;
  today: string;
}

export interface Employee {
  id: string;
  role: string;
  name: string;
  position: string;
  avatar: string;
  discordId: string;
}

// Mock current user
export const mockUser: Employee[] = [
  {
  id: '1',
  role: 'employee',
  name: 'สมชาย ใจดี',
  position: 'Senior Developer',
  avatar: '/lovable-uploads/26594962-7055-4399-9796-5131b247b6df.png',
  discordId: 'somchai#1234'
  },
];

// Mock attendance data
export const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    date: '2024-08-01',
    checkIn: '09:00',
    checkOut: '18:00',
    workHours: 8,
    status: 'present'
  },
  {
    id: '2',
    date: '2024-07-31',
    checkIn: '09:15',
    checkOut: '18:10',
    workHours: 8,
    status: 'late'
  },
  {
    id: '3',
    date: '2024-07-30',
    checkIn: '08:45',
    checkOut: '17:50',
    workHours: 8,
    status: 'present'
  },
  {
    id: '4',
    date: '2024-07-29',
    checkIn: '09:30',
    checkOut: '18:30',
    workHours: 8,
    status: 'late'
  },
  {
    id: '5',
    date: '2024-07-28',
    checkIn: '-',
    checkOut: '-',
    workHours: 0,
    status: 'absent'
  },
  {
    id: '6',
    date: '2024-07-27',
    checkIn: '09:00',
    checkOut: '18:00',
    workHours: 8,
    status: 'present'
  },
  {
    id: '7',
    date: '2024-07-26',
    checkIn: '08:55',
    checkOut: '17:45',
    workHours: 8,
    status: 'present'
  },
  {
    id: '8',
    date: '2024-08-01',
    checkIn: '09:00',
    checkOut: '18:00',
    workHours: 8,
    status: 'present'
  },
  {
    id: '9',
    date: '2024-07-31',
    checkIn: '09:15',
    checkOut: '18:10',
    workHours: 8,
    status: 'late'
  },
  {
    id: '10',
    date: '2024-07-30',
    checkIn: '08:45',
    checkOut: '17:50',
    workHours: 8,
    status: 'present'
  },
  {
    id: '11',
    date: '2024-07-29',
    checkIn: '09:30',
    checkOut: '18:30',
    workHours: 8,
    status: 'late'
  },
  {
    id: '12',
    date: '2024-07-28',
    checkIn: '-',
    checkOut: '-',
    workHours: 0,
    status: 'absent'
  },
  {
    id: '13',
    date: '2024-07-27',
    checkIn: '09:00',
    checkOut: '18:00',
    workHours: 8,
    status: 'present'
  },
  {
    id: '14',
    date: '2024-07-26',
    checkIn: '08:55',
    checkOut: '17:45',
    workHours: 8,
    status: 'present'
  }
];

// Mock leave data
export const mockLeave: LeaveRecord[] = [
  {
    id: '1',
    type: 'sick',
    startDate: '2024-07-28',
    endDate: '2024-07-28',
    days: 1,
    reason: 'ป่วยเป็นไข้',
    status: 'approved'
  },
  {
    id: '2',
    type: 'annual',
    startDate: '2024-07-15',
    endDate: '2024-07-16',
    days: 2,
    reason: 'พักร้อนกับครอบครัว',
    status: 'approved'
  },
  {
    id: '3',
    type: 'personal',
    startDate: '2025-08-07',
    endDate: '2024-08-05',
    days: 1,
    reason: 'ธุระส่วนตัว',
    status: 'pending'
  },
  {
    id: '4',
    type: 'annual',
    startDate: '2024-06-20',
    endDate: '2024-06-21',
    days: 2,
    reason: 'เดินทางท่องเที่ยว',
    status: 'approved'
  },
  {
    id: '5',
    type: 'sick',
    startDate: '2024-07-28',
    endDate: '2024-07-28',
    days: 1,
    reason: 'ป่วยเป็นไข้',
    status: 'approved'
  },
  {
    id: '6',
    type: 'annual',
    startDate: '2024-07-15',
    endDate: '2024-07-16',
    days: 2,
    reason: 'พักร้อนกับครอบครัว',
    status: 'approved'
  },
  {
    id: '7',
    type: 'personal',
    startDate: '2025-08-07',
    endDate: '2024-08-05',
    days: 1,
    reason: 'ธุระส่วนตัว',
    status: 'pending'
  },
  {
    id: '8',
    type: 'annual',
    startDate: '2024-06-20',
    endDate: '2024-06-21',
    days: 2,
    reason: 'เดินทางท่องเที่ยว',
    status: 'approved'
  },
  {
    id: '9',
    type: 'annual',
    startDate: '2024-07-15',
    endDate: '2024-07-16',
    days: 2,
    reason: 'พักร้อนกับครอบครัว',
    status: 'approved'
  },
  {
    id: '10',
    type: 'personal',
    startDate: '2025-08-07',
    endDate: '2024-08-05',
    days: 1,
    reason: 'ธุระส่วนตัว',
    status: 'pending'
  },
  {
    id: '11',
    type: 'annual',
    startDate: '2024-06-20',
    endDate: '2024-06-21',
    days: 2,
    reason: 'เดินทางท่องเที่ยว',
    status: 'approved'
  }
];

// Mock stand-up data
export const mockStandups: StandupRecord[] = [
  {
    id: '1',
    date: '2025-08-07',
    today: 'จะทำ dashboard UI และ integrate กับ API ใหม่'
  },
  {
    id: '2',
    date: '2025-08-14',
    today: 'เริ่มทำ authentication system',
  },
  {
    id: '3',
    date: '2025-08-15',
    today: 'ศึกษา requirements สำหรับ feature ใหม่',
  },
  {
    id: '4',
    date: '2025-08-16',
    today: 'Code review pull requests ของทีม',
  },
  {
    id: '5',
    date: '2025-08-13',
    today: 'implement database migrations และ ทำ unit tests',
  },
  {
    id: '6',
    date: '2025-08-12',
    today: 'วางแผน architecture สำหรับ feature ใหม่',
  },
  {
    id: '7',
    date: '2025-08-11',
    today: 'ศึกษา requirements สำหรับ feature ใหม่',
  },
  {
    id: '8',
    date: '2025-08-10',
    today: 'Code review pull requests ของทีม',
  },
  {
    id: '9',
    date: '2025-08-09',
    today: 'implement database migrations และ ทำ unit tests',
  },
  {
    id: '10',
    date: '2025-08-06',
    today: 'วางแผน architecture สำหรับ feature ใหม่',
  },
  {
    id: '11',
    date: '2025-08-05',
    today: 'ศึกษา requirements สำหรับ feature ใหม่',
  },
  {
    id: '12',
    date: '2025-08-04',
    today: 'Code review pull requests ของทีม',
  },
  {
    id: '13',
    date: '2025-08-03',
    today: 'implement database migrations และ ทำ unit tests',
  },
  {
    id: '14',
    date: '2025-08-02',
    today: 'วางแผน architecture สำหรับ feature ใหม่',
  },
   {
    id: '15',
    date: '2025-08-01',
    today: 'วางแผน architecture สำหรับ feature ใหม่',
  },
  {
    id: '16',
    date: '2025-07-01',
    today: 'วางแผน architecture สำหรับ feature ใหม่',
  },
  {
    id: '17',
    date: '2025-07-03',
    today: 'วางแผน architecture สำหรับ feature ใหม่',
  },
  {
    id: '18',
    date: '2025-07-04',
    today: 'วางแผน architecture สำหรับ feature ใหม่',
  },
   {
    id: '19',
    date: '2025-07-05',
    today: 'วางแผน architecture สำหรับ feature ใหม่',
  },
];