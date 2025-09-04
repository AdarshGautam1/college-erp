'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Gender } from '../../types';

const admissionSchema = z.object({
  // Personal Information
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
  
  // Address
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Zip code is required'),
  country: z.string().min(2, 'Country is required'),
  
  // Guardian Information
  guardianName: z.string().min(2, 'Guardian name is required'),
  guardianPhone: z.string().min(10, 'Guardian phone is required'),
  guardianEmail: z.string().email('Invalid guardian email').optional().or(z.literal('')),
  
  // Academic Information
  courseId: z.string().min(1, 'Course selection is required'),
  previousEducation: z.string().min(10, 'Previous education details are required'),
  percentage: z.number().min(0).max(100, 'Percentage must be between 0 and 100'),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

interface AdmissionFormProps {
  onSubmit: (data: AdmissionFormData) => Promise<void>;
  loading?: boolean;
}

const courses = [
  { id: '1', name: 'Computer Science Engineering', code: 'CSE' },
  { id: '2', name: 'Mechanical Engineering', code: 'ME' },
  { id: '3', name: 'Electrical Engineering', code: 'EE' },
  { id: '4', name: 'Civil Engineering', code: 'CE' },
  { id: '5', name: 'Business Administration', code: 'MBA' },
];

export function AdmissionForm({ onSubmit, loading = false }: AdmissionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema)
  });

  const onFormSubmit = async (data: AdmissionFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Admission Application</h2>
      
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                {...register('dateOfBirth')}
                type="date"
                id="dateOfBirth"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender *
              </label>
              <select
                {...register('gender')}
                id="gender"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value={Gender.MALE}>Male</option>
                <option value={Gender.FEMALE}>Female</option>
                <option value={Gender.OTHER}>Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                Street Address *
              </label>
              <input
                {...register('street')}
                type="text"
                id="street"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City *
              </label>
              <input
                {...register('city')}
                type="text"
                id="city"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State *
              </label>
              <input
                {...register('state')}
                type="text"
                id="state"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                Zip Code *
              </label>
              <input
                {...register('zipCode')}
                type="text"
                id="zipCode"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country *
              </label>
              <input
                {...register('country')}
                type="text"
                id="country"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Guardian Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Guardian Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">
                Guardian Name *
              </label>
              <input
                {...register('guardianName')}
                type="text"
                id="guardianName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.guardianName && (
                <p className="mt-1 text-sm text-red-600">{errors.guardianName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="guardianPhone" className="block text-sm font-medium text-gray-700">
                Guardian Phone *
              </label>
              <input
                {...register('guardianPhone')}
                type="tel"
                id="guardianPhone"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.guardianPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.guardianPhone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="guardianEmail" className="block text-sm font-medium text-gray-700">
                Guardian Email (Optional)
              </label>
              <input
                {...register('guardianEmail')}
                type="email"
                id="guardianEmail"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.guardianEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.guardianEmail.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">
                Course *
              </label>
              <select
                {...register('courseId')}
                id="courseId"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
              {errors.courseId && (
                <p className="mt-1 text-sm text-red-600">{errors.courseId.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                Previous Academic Percentage *
              </label>
              <input
                {...register('percentage', { valueAsNumber: true })}
                type="number"
                id="percentage"
                min="0"
                max="100"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.percentage && (
                <p className="mt-1 text-sm text-red-600">{errors.percentage.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="previousEducation" className="block text-sm font-medium text-gray-700">
                Previous Education Details *
              </label>
              <textarea
                {...register('previousEducation')}
                id="previousEducation"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Include school/college name, degree, year of completion, etc."
              />
              {errors.previousEducation && (
                <p className="mt-1 text-sm text-red-600">{errors.previousEducation.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
          >
            Reset Form
          </Button>
          <Button
            type="submit"
            loading={loading}
          >
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  );
}
