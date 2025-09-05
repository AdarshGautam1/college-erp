'use client';

import { useState } from 'react';
import { AdminDashboard } from '../../components/dashboard/AdminDashboard';
import { FeeManagement } from '../../components/modules/FeeManagement';
import { HostelManagement } from '../../components/modules/HostelManagement';
import { AdmissionForm } from '../../components/forms/AdmissionForm';
import { Button } from '../../components/ui/Button';
import { 
  DashboardStats, 
  Fee, 
  FeeStatus, 
  FeeType, 
  PaymentMethod, 
  Hostel, 
  Room, 
  HostelAllocation,
  HostelType,
  RoomType,
  AllocationStatus,
  Gender,
  StudentStatus
} from '../../types';
import { z } from 'zod';
import { Gender as GenderEnum } from '../../types';

const admissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum([GenderEnum.MALE, GenderEnum.FEMALE, GenderEnum.OTHER]),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Zip code is required'),
  country: z.string().min(2, 'Country is required'),
  guardianName: z.string().min(2, 'Guardian name is required'),
  guardianPhone: z.string().min(10, 'Guardian phone is required'),
  guardianEmail: z.string().email('Invalid guardian email').optional().or(z.literal('')),
  courseId: z.string().min(1, 'Course selection is required'),
  previousEducation: z.string().min(10, 'Previous education details are required'),
  percentage: z.number().min(0).max(100, 'Percentage must be between 0 and 100'),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

// Mock data for demonstration
const mockStats: DashboardStats = {
  totalStudents: 625,
  activeStudents: 587,
  totalAdmissions: 156,
  pendingAdmissions: 23,
  totalFeeCollection: 8750000,
  pendingFees: 2250000,
  hostelOccupancy: 245,
  totalRooms: 320,
  occupiedRooms: 245,
  upcomingExams: 12
};

const mockFees: Fee[] = [
  {
    id: '1',
    studentId: '1',
    student: {
      id: '1',
      name: 'John Doe',
      rollNumber: '2023CSE001',
      email: 'john@example.com',
      phone: '1234567890',
      dateOfBirth: new Date('2000-01-01'),
      gender: Gender.MALE,
      address: { street: '123 Main St', city: 'City', state: 'State', zipCode: '12345', country: 'Country' },
      guardianName: 'Jane Doe',
      guardianPhone: '0987654321',
      admissionDate: new Date('2023-08-01'),
      course: { id: '1', name: 'Computer Science', code: 'CSE', duration: 4, fees: 100000, department: 'Engineering', isActive: true },
      year: 1,
      semester: 1,
      status: StudentStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    type: FeeType.TUITION,
    amount: 50000,
    dueDate: new Date('2024-12-31'),
    status: FeeStatus.PENDING,
    semester: 1,
    academicYear: '2023-24',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    studentId: '1',
    student: {
      id: '1',
      name: 'John Doe',
      rollNumber: '2023CSE001',
      email: 'john@example.com',
      phone: '1234567890',
      dateOfBirth: new Date('2000-01-01'),
      gender: Gender.MALE,
      address: { street: '123 Main St', city: 'City', state: 'State', zipCode: '12345', country: 'Country' },
      guardianName: 'Jane Doe',
      guardianPhone: '0987654321',
      admissionDate: new Date('2023-08-01'),
      course: { id: '1', name: 'Computer Science', code: 'CSE', duration: 4, fees: 100000, department: 'Engineering', isActive: true },
      year: 1,
      semester: 1,
      status: StudentStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    type: FeeType.HOSTEL,
    amount: 25000,
    dueDate: new Date('2024-11-30'),
    status: FeeStatus.PAID,
    paidDate: new Date('2024-10-15'),
    receiptNumber: 'RCP001',
    paymentMethod: PaymentMethod.UPI,
    semester: 1,
    academicYear: '2023-24',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockHostels: Hostel[] = [
  {
    id: '1',
    name: 'Boys Hostel A',
    type: HostelType.BOYS,
    totalRooms: 150,
    occupiedRooms: 120,
    wardenName: 'Mr. Smith',
    wardenPhone: '555-0001',
    address: { street: '123 Campus Rd', city: 'College City', state: 'State', zipCode: '12345', country: 'Country' },
    facilities: ['WiFi', 'Laundry', 'Gym', 'Cafeteria'],
    isActive: true
  },
  {
    id: '2',
    name: 'Girls Hostel B',
    type: HostelType.GIRLS,
    totalRooms: 170,
    occupiedRooms: 125,
    wardenName: 'Ms. Johnson',
    wardenPhone: '555-0002',
    address: { street: '456 Campus Ave', city: 'College City', state: 'State', zipCode: '12345', country: 'Country' },
    facilities: ['WiFi', 'Laundry', 'Security', 'Common Room'],
    isActive: true
  }
];

const mockRooms: Room[] = [
  {
    id: '1',
    hostelId: '1',
    hostel: mockHostels[0],
    roomNumber: '101',
    floor: 1,
    capacity: 2,
    currentOccupants: 1,
    type: RoomType.DOUBLE,
    rent: 8000,
    facilities: ['AC', 'Attached Bathroom'],
    isActive: true
  },
  {
    id: '2',
    hostelId: '1',
    hostel: mockHostels[0],
    roomNumber: '102',
    floor: 1,
    capacity: 1,
    currentOccupants: 1,
    type: RoomType.SINGLE,
    rent: 12000,
    facilities: ['AC', 'Attached Bathroom', 'Study Table'],
    isActive: true
  }
];

const mockAllocations: HostelAllocation[] = [
  {
    id: '1',
    studentId: '1',
    student: {
      id: '1',
      name: 'John Doe',
      rollNumber: '2023CSE001',
      email: 'john@example.com',
      phone: '1234567890',
      dateOfBirth: new Date('2000-01-01'),
      gender: Gender.MALE,
      address: { street: '123 Main St', city: 'City', state: 'State', zipCode: '12345', country: 'Country' },
      guardianName: 'Jane Doe',
      guardianPhone: '0987654321',
      admissionDate: new Date('2023-08-01'),
      course: { id: '1', name: 'Computer Science', code: 'CSE', duration: 4, fees: 100000, department: 'Engineering', isActive: true },
      year: 1,
      semester: 1,
      status: StudentStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    roomId: '2',
    room: mockRooms[1],
    allocationDate: new Date('2023-08-15'),
    status: AllocationStatus.ALLOCATED,
    rent: 12000,
    securityDeposit: 5000
  }
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleAdmissionSubmit = async (data: AdmissionFormData) => {
    console.log('Admission data:', data);
    alert('Admission application submitted successfully!');
  };

  const handlePayFee = async (feeId: string, paymentMethod: PaymentMethod) => {
    console.log('Processing payment:', { feeId, paymentMethod });
    alert('Payment processed successfully!');
  };

  const handleGenerateReceipt = async (feeId: string) => {
    console.log('Generating receipt for fee:', feeId);
    alert('Receipt generated!');
  };

  const handleAllocateRoom = async (studentId: string, roomId: string) => {
    console.log('Allocating room:', { studentId, roomId });
    alert('Room allocated successfully!');
  };

  const handleVacateRoom = async (allocationId: string) => {
    console.log('Vacating room:', allocationId);
    alert('Room vacated successfully!');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'admission', label: 'Admission', icon: '📋' },
    { id: 'fees', label: 'Fee Management', icon: '💰' },
    { id: 'hostel', label: 'Hostel Management', icon: '🏠' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">College ERP System - Demo</h1>
          <p className="text-gray-600 mt-1">Comprehensive solution for educational institution management</p>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-white border-b md:flex flex flex-col">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <main className="py-6">
        {activeTab === 'dashboard' && (
          <AdminDashboard stats={mockStats} />
        )}

        {activeTab === 'admission' && (
          <AdmissionForm onSubmit={handleAdmissionSubmit} />
        )}

        {activeTab === 'fees' && (
          <FeeManagement
            studentId="1"
            fees={mockFees}
            onPayFee={handlePayFee}
            onGenerateReceipt={handleGenerateReceipt}
          />
        )}

        {activeTab === 'hostel' && (
          <HostelManagement
            hostels={mockHostels}
            rooms={mockRooms}
            allocations={mockAllocations}
            onAllocateRoom={handleAllocateRoom}
            onVacateRoom={handleVacateRoom}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              College ERP System - Built with Next.js, TypeScript, and Tailwind CSS
            </p>
            <p className="text-sm text-gray-500 mt-2">
              A comprehensive solution for educational institution management
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
