'use client';

import { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  CurrencyDollarIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { DashboardStats } from '../../types';

interface AdminDashboardProps {
  stats: DashboardStats;
}

// Sample data for charts
const monthlyAdmissions = [
  { month: 'Jan', admissions: 45 },
  { month: 'Feb', admissions: 52 },
  { month: 'Mar', admissions: 38 },
  { month: 'Apr', admissions: 61 },
  { month: 'May', admissions: 55 },
  { month: 'Jun', admissions: 67 },
  { month: 'Jul', admissions: 72 },
  { month: 'Aug', admissions: 69 },
  { month: 'Sep', admissions: 58 },
  { month: 'Oct', admissions: 43 },
  { month: 'Nov', admissions: 37 },
  { month: 'Dec', admissions: 41 },
];

const feeCollectionData = [
  { month: 'Jan', collected: 245000, pending: 55000 },
  { month: 'Feb', collected: 280000, pending: 45000 },
  { month: 'Mar', collected: 225000, pending: 75000 },
  { month: 'Apr', collected: 310000, pending: 40000 },
  { month: 'May', collected: 295000, pending: 65000 },
  { month: 'Jun', collected: 320000, pending: 35000 },
];

const courseDistribution = [
  { name: 'Computer Science', value: 180, color: '#3B82F6' },
  { name: 'Mechanical Engineering', value: 145, color: '#10B981' },
  { name: 'Electrical Engineering', value: 120, color: '#F59E0B' },
  { name: 'Civil Engineering', value: 95, color: '#EF4444' },
  { name: 'Business Administration', value: 85, color: '#8B5CF6' },
];

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      subtitle: `${stats.activeStudents} active`,
      icon: UserGroupIcon,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Pending Admissions',
      value: stats.pendingAdmissions.toLocaleString(),
      subtitle: `${stats.totalAdmissions} total applications`,
      icon: AcademicCapIcon,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Fee Collection',
      value: `₹${(stats.totalFeeCollection / 100000).toFixed(1)}L`,
      subtitle: `₹${(stats.pendingFees / 100000).toFixed(1)}L pending`,
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Hostel Occupancy',
      value: `${stats.occupiedRooms}/${stats.totalRooms}`,
      subtitle: `${((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(1)}% occupied`,
      icon: HomeIcon,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Upcoming Exams',
      value: stats.upcomingExams.toString(),
      subtitle: 'In next 30 days',
      icon: ClipboardDocumentListIcon,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome to the College ERP System - {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
              </div>
              <div className={`p-3 rounded-full ${card.color}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Admissions Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Admissions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyAdmissions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="admissions" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Course Distribution Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Student Distribution by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {courseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Collection Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Fee Collection vs Pending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feeCollectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="collected" fill="#10B981" />
              <Bar dataKey="pending" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New student admission</p>
                <p className="text-xs text-gray-600">John Doe applied for Computer Science</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Fee payment received</p>
                <p className="text-xs text-gray-600">₹50,000 tuition fee from Roll No. 2023001</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Room allocation</p>
                <p className="text-xs text-gray-600">Room 204 assigned to Jane Smith</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Exam scheduled</p>
                <p className="text-xs text-gray-600">Mid-term exam for Semester 3</p>
                <p className="text-xs text-gray-500">8 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Overdue fee alert</p>
                <p className="text-xs text-gray-600">5 students have overdue fees</p>
                <p className="text-xs text-gray-500">10 hours ago</p>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-4 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
            View All Activities
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <UserGroupIcon className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium">Add New Student</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium">Process Fee Payment</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <HomeIcon className="h-6 w-6 text-purple-600" />
            <span className="text-sm font-medium">Allocate Room</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <ChartBarIcon className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium">Generate Report</span>
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-gray-900">Database</p>
            <p className="text-xs text-green-600">Online</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-gray-900">Payment Gateway</p>
            <p className="text-xs text-green-600">Online</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-gray-900">Backup Service</p>
            <p className="text-xs text-yellow-600">Running</p>
          </div>
        </div>
      </div>
    </div>
  );
}
