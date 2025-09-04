'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { Hostel, Room, HostelAllocation, RoomType, HostelType, AllocationStatus } from '../../types';
import { format } from 'date-fns';

interface HostelManagementProps {
  hostels: Hostel[];
  rooms: Room[];
  allocations: HostelAllocation[];
  onAllocateRoom: (studentId: string, roomId: string) => Promise<void>;
  onVacateRoom: (allocationId: string) => Promise<void>;
}

export function HostelManagement({ 
  hostels, 
  rooms, 
  allocations, 
  onAllocateRoom, 
  onVacateRoom 
}: HostelManagementProps) {
  const [selectedHostel, setSelectedHostel] = useState<string>('');
  const [showAllocationForm, setShowAllocationForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredRooms = selectedHostel 
    ? rooms.filter(room => room.hostelId === selectedHostel)
    : rooms;

  const getAvailableRooms = () => {
    return filteredRooms.filter(room => room.currentOccupants < room.capacity);
  };

  const getOccupancyRate = (hostel: Hostel) => {
    return hostel.totalRooms > 0 ? (hostel.occupiedRooms / hostel.totalRooms) * 100 : 0;
  };

  const getRoomTypeLabel = (type: RoomType) => {
    const labels = {
      [RoomType.SINGLE]: 'Single',
      [RoomType.DOUBLE]: 'Double',
      [RoomType.TRIPLE]: 'Triple',
      [RoomType.DORMITORY]: 'Dormitory'
    };
    return labels[type];
  };

  const getHostelTypeLabel = (type: HostelType) => {
    const labels = {
      [HostelType.BOYS]: 'Boys',
      [HostelType.GIRLS]: 'Girls',
      [HostelType.MIXED]: 'Mixed'
    };
    return labels[type];
  };

  const handleRoomAllocation = async () => {
    if (!selectedRoom || !studentId) return;
    
    setLoading(true);
    try {
      await onAllocateRoom(studentId, selectedRoom.id);
      setShowAllocationForm(false);
      setSelectedRoom(null);
      setStudentId('');
    } catch (error) {
      console.error('Room allocation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVacateRoom = async (allocationId: string) => {
    setLoading(true);
    try {
      await onVacateRoom(allocationId);
    } catch (error) {
      console.error('Room vacation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Hostel Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hostels.map((hostel) => (
          <div key={hostel.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{hostel.name}</h3>
                <p className="text-sm text-gray-600">{getHostelTypeLabel(hostel.type)} Hostel</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                hostel.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {hostel.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Rooms:</span>
                <span className="text-sm font-medium">{hostel.totalRooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Occupied:</span>
                <span className="text-sm font-medium">{hostel.occupiedRooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Available:</span>
                <span className="text-sm font-medium">{hostel.totalRooms - hostel.occupiedRooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Occupancy Rate:</span>
                <span className="text-sm font-medium">{getOccupancyRate(hostel).toFixed(1)}%</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${getOccupancyRate(hostel)}%` }}
              ></div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <strong>Warden:</strong> {hostel.wardenName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Contact:</strong> {hostel.wardenPhone}
              </p>
            </div>

            {hostel.facilities.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-1"><strong>Facilities:</strong></p>
                <div className="flex flex-wrap gap-1">
                  {hostel.facilities.slice(0, 3).map((facility, index) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {facility}
                    </span>
                  ))}
                  {hostel.facilities.length > 3 && (
                    <span className="text-xs text-gray-500">+{hostel.facilities.length - 3} more</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Room Management */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Room Management</h2>
          <div className="flex space-x-4">
            <select
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Hostels</option>
              {hostels.map((hostel) => (
                <option key={hostel.id} value={hostel.id}>{hostel.name}</option>
              ))}
            </select>
            <Button
              variant="primary"
              onClick={() => setShowAllocationForm(true)}
            >
              Allocate Room
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Occupancy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Room {room.roomNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      Floor {room.floor} • {room.hostel?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getRoomTypeLabel(room.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {room.currentOccupants}/{room.capacity}
                    </div>
                    <div className={`text-xs ${
                      room.currentOccupants === room.capacity ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {room.currentOccupants === room.capacity ? 'Full' : `${room.capacity - room.currentOccupants} available`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{room.rent.toLocaleString()}/month
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      room.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {room.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    {room.currentOccupants < room.capacity && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          setSelectedRoom(room);
                          setShowAllocationForm(true);
                        }}
                      >
                        Allocate
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Current Allocations */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Current Allocations</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allocation Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allocations.filter(allocation => allocation.status === AllocationStatus.ALLOCATED).map((allocation) => (
                <tr key={allocation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {allocation.student?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {allocation.student?.rollNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Room {allocation.room?.roomNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      {allocation.room?.hostel?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(allocation.allocationDate), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{allocation.rent.toLocaleString()}/month
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      allocation.status === AllocationStatus.ALLOCATED 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {allocation.status.charAt(0).toUpperCase() + allocation.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleVacateRoom(allocation.id)}
                      loading={loading}
                    >
                      Vacate
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Room Allocation Modal */}
      {showAllocationForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Allocate Room
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter student ID or roll number"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Room
                </label>
                <select
                  value={selectedRoom?.id || ''}
                  onChange={(e) => {
                    const room = getAvailableRooms().find(r => r.id === e.target.value);
                    setSelectedRoom(room || null);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a room</option>
                  {getAvailableRooms().map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.hostel?.name} - Room {room.roomNumber} ({getRoomTypeLabel(room.type)}) - ₹{room.rent}/month
                    </option>
                  ))}
                </select>
              </div>

              {selectedRoom && (
                <div className="mb-4 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium text-gray-900">Room Details</h4>
                  <p className="text-sm text-gray-600">
                    Room {selectedRoom.roomNumber} • Floor {selectedRoom.floor}
                  </p>
                  <p className="text-sm text-gray-600">
                    Type: {getRoomTypeLabel(selectedRoom.type)} • Capacity: {selectedRoom.capacity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Rent: ₹{selectedRoom.rent.toLocaleString()}/month
                  </p>
                </div>
              )}

              <div className="flex space-x-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAllocationForm(false);
                    setSelectedRoom(null);
                    setStudentId('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleRoomAllocation}
                  loading={loading}
                  disabled={!selectedRoom || !studentId}
                >
                  Allocate Room
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
