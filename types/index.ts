export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  STUDENT = 'student'
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: Gender;
  address: Address;
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  admissionDate: Date;
  course: Course;
  year: number;
  semester: number;
  status: StudentStatus;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum StudentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  GRADUATED = 'graduated',
  SUSPENDED = 'suspended'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  duration: number; // in years
  fees: number;
  department: string;
  description?: string;
  isActive: boolean;
}

export interface Admission {
  id: string;
  applicationNumber: string;
  studentId: string;
  student: Student;
  courseId: string;
  course: Course;
  applicationDate: Date;
  status: AdmissionStatus;
  documents: Document[];
  interviewDate?: Date;
  interviewScore?: number;
  remarks?: string;
  processedBy?: string;
  processedAt?: Date;
}

export enum AdmissionStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CONFIRMED = 'confirmed'
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}

export interface Fee {
  id: string;
  studentId: string;
  student: Student;
  type: FeeType;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: FeeStatus;
  receiptNumber?: string;
  paymentMethod?: PaymentMethod;
  transactionId?: string;
  late_fee?: number;
  semester: number;
  academicYear: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum FeeType {
  TUITION = 'tuition',
  HOSTEL = 'hostel',
  LIBRARY = 'library',
  LABORATORY = 'laboratory',
  EXAMINATION = 'examination',
  DEVELOPMENT = 'development',
  MISCELLANEOUS = 'miscellaneous'
}

export enum FeeStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
  PARTIAL = 'partial'
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  UPI = 'upi',
  CHECK = 'check'
}

export interface Hostel {
  id: string;
  name: string;
  type: HostelType;
  totalRooms: number;
  occupiedRooms: number;
  wardenName: string;
  wardenPhone: string;
  address: Address;
  facilities: string[];
  isActive: boolean;
}

export enum HostelType {
  BOYS = 'boys',
  GIRLS = 'girls',
  MIXED = 'mixed'
}

export interface Room {
  id: string;
  hostelId: string;
  hostel: Hostel;
  roomNumber: string;
  floor: number;
  capacity: number;
  currentOccupants: number;
  type: RoomType;
  rent: number;
  facilities: string[];
  isActive: boolean;
}

export enum RoomType {
  SINGLE = 'single',
  DOUBLE = 'double',
  TRIPLE = 'triple',
  DORMITORY = 'dormitory'
}

export interface HostelAllocation {
  id: string;
  studentId: string;
  student: Student;
  roomId: string;
  room: Room;
  allocationDate: Date;
  vacateDate?: Date;
  status: AllocationStatus;
  rent: number;
  securityDeposit: number;
  remarks?: string;
}

export enum AllocationStatus {
  ALLOCATED = 'allocated',
  VACATED = 'vacated',
  SUSPENDED = 'suspended'
}

export interface Examination {
  id: string;
  name: string;
  type: ExamType;
  courseId: string;
  course: Course;
  semester: number;
  academicYear: string;
  startDate: Date;
  endDate: Date;
  totalMarks: number;
  passingMarks: number;
  status: ExamStatus;
  createdBy: string;
  createdAt: Date;
}

export enum ExamType {
  INTERNAL = 'internal',
  SEMESTER = 'semester',
  ANNUAL = 'annual',
  SUPPLEMENTARY = 'supplementary'
}

export enum ExamStatus {
  SCHEDULED = 'scheduled',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface ExamResult {
  id: string;
  studentId: string;
  student: Student;
  examinationId: string;
  examination: Examination;
  marksObtained: number;
  grade: string;
  status: ResultStatus;
  remarks?: string;
  publishedAt?: Date;
}

export enum ResultStatus {
  PASS = 'pass',
  FAIL = 'fail',
  ABSENT = 'absent',
  PENDING = 'pending'
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalAdmissions: number;
  pendingAdmissions: number;
  totalFeeCollection: number;
  pendingFees: number;
  hostelOccupancy: number;
  totalRooms: number;
  occupiedRooms: number;
  upcomingExams: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
