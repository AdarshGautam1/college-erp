'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { Fee, FeeStatus, FeeType, PaymentMethod } from '../../types';
import { format } from 'date-fns';

interface FeeManagementProps {
  studentId: string;
  fees: Fee[];
  onPayFee: (feeId: string, paymentMethod: PaymentMethod) => Promise<void>;
  onGenerateReceipt: (feeId: string) => Promise<void>;
}

export function FeeManagement({ studentId, fees, onPayFee, onGenerateReceipt }: FeeManagementProps) {
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);
  const [loading, setLoading] = useState(false);

  const totalPending = fees
    .filter(fee => fee.status === FeeStatus.PENDING || fee.status === FeeStatus.OVERDUE)
    .reduce((sum, fee) => sum + fee.amount + (fee.late_fee || 0), 0);

  const totalPaid = fees
    .filter(fee => fee.status === FeeStatus.PAID)
    .reduce((sum, fee) => sum + fee.amount, 0);

  const handlePayment = async (fee: Fee) => {
    setLoading(true);
    try {
      await onPayFee(fee.id, paymentMethod);
      setSelectedFee(null);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReceipt = async (feeId: string) => {
    setLoading(true);
    try {
      await onGenerateReceipt(feeId);
    } catch (error) {
      console.error('Receipt generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: FeeStatus) => {
    const styles = {
      [FeeStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
      [FeeStatus.PAID]: 'bg-green-100 text-green-800',
      [FeeStatus.OVERDUE]: 'bg-red-100 text-red-800',
      [FeeStatus.PARTIAL]: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getFeeTypeLabel = (type: FeeType) => {
    const labels = {
      [FeeType.TUITION]: 'Tuition Fee',
      [FeeType.HOSTEL]: 'Hostel Fee',
      [FeeType.LIBRARY]: 'Library Fee',
      [FeeType.LABORATORY]: 'Laboratory Fee',
      [FeeType.EXAMINATION]: 'Examination Fee',
      [FeeType.DEVELOPMENT]: 'Development Fee',
      [FeeType.MISCELLANEOUS]: 'Miscellaneous Fee'
    };
    return labels[type];
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Pending</h3>
          <p className="text-3xl font-bold text-red-600">₹{totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Paid</h3>
          <p className="text-3xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Fees</h3>
          <p className="text-3xl font-bold text-blue-600">₹{(totalPending + totalPaid).toLocaleString()}</p>
        </div>
      </div>

      {/* Fee List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Fee Details</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {getFeeTypeLabel(fee.type)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {fee.academicYear}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₹{fee.amount.toLocaleString()}
                    </div>
                    {fee.late_fee && fee.late_fee > 0 && (
                      <div className="text-sm text-red-600">
                        Late Fee: ₹{fee.late_fee.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(fee.dueDate), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(fee.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Semester {fee.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    {fee.status === FeeStatus.PENDING || fee.status === FeeStatus.OVERDUE ? (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setSelectedFee(fee)}
                      >
                        Pay Now
                      </Button>
                    ) : fee.status === FeeStatus.PAID ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateReceipt(fee.id)}
                        loading={loading}
                      >
                        Receipt
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedFee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Process Payment
              </h3>
              
              <div className="mb-4 p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium text-gray-900">{getFeeTypeLabel(selectedFee.type)}</h4>
                <p className="text-sm text-gray-600">{selectedFee.academicYear} - Semester {selectedFee.semester}</p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  Total Amount: ₹{(selectedFee.amount + (selectedFee.late_fee || 0)).toLocaleString()}
                </p>
                {selectedFee.late_fee && selectedFee.late_fee > 0 && (
                  <p className="text-sm text-red-600">
                    (Includes late fee: ₹{selectedFee.late_fee.toLocaleString()})
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={PaymentMethod.CASH}>Cash</option>
                  <option value={PaymentMethod.CARD}>Card</option>
                  <option value={PaymentMethod.BANK_TRANSFER}>Bank Transfer</option>
                  <option value={PaymentMethod.UPI}>UPI</option>
                  <option value={PaymentMethod.CHECK}>Check</option>
                </select>
              </div>

              <div className="flex space-x-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedFee(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handlePayment(selectedFee)}
                  loading={loading}
                >
                  Process Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
