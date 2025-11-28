/*
  # Create employees table

  1. New Tables
    - `employees`
      - `id` (uuid, primary key) - รหัสพนักงาน
      - `employee_code` (text) - รหัสพนักงาน
      - `status` (text) - สถานะ
      - `employee_type` (text) - ประเภทพนักงาน
      - `title_th` (text) - คำนำหน้าชื่อ (ไทย)
      - `first_name_th` (text) - ชื่อ (ไทย)
      - `last_name_th` (text) - นามสกุล (ไทย)
      - `nickname_th` (text) - ชื่อเล่น (ไทย)
      - `first_name_en` (text) - First Name
      - `last_name_en` (text) - Last Name
      - `nickname_en` (text) - Nickname
      - `gender` (text) - เพศ
      - `marital_status` (text) - สถานะภาพสมรส
      - `ethnicity` (text) - เชื้อชาติ
      - `nationality` (text) - สัญชาติ
      - `blood_type` (text) - หมู่เลือด
      - `weight` (numeric) - น้ำหนัก (กก.)
      - `height` (numeric) - ส่วนสูง (ซม.)
      - `military_status` (text) - สภาพเกณฑ์ทหาร
      - `religion` (text) - ศาสนา
      - `created_at` (timestamptz) - วันที่สร้าง
      - `updated_at` (timestamptz) - วันที่แก้ไข

  2. Security
    - Enable RLS on `employees` table
    - Add policy for authenticated users to read all employees
    - Add policy for authenticated users to insert employees
    - Add policy for authenticated users to update employees
    - Add policy for authenticated users to delete employees
*/

CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_code text UNIQUE NOT NULL,
  status text DEFAULT 'active',
  employee_type text DEFAULT '',
  title_th text DEFAULT '',
  first_name_th text NOT NULL,
  last_name_th text NOT NULL,
  nickname_th text DEFAULT '',
  first_name_en text DEFAULT '',
  last_name_en text DEFAULT '',
  nickname_en text DEFAULT '',
  gender text DEFAULT '',
  marital_status text DEFAULT '',
  ethnicity text DEFAULT 'ไทย',
  nationality text DEFAULT 'ไทย',
  blood_type text DEFAULT '',
  weight numeric DEFAULT 0,
  height numeric DEFAULT 0,
  military_status text DEFAULT '',
  religion text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read all employees"
  ON employees
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert employees"
  ON employees
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update employees"
  ON employees
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete employees"
  ON employees
  FOR DELETE
  TO authenticated
  USING (true);