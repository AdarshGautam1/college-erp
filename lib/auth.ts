import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserRole } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 12;

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return null;
    }
  }

  static async authenticate(email: string, password: string): Promise<{ success: boolean; user?: JWTPayload; token?: string; message: string }> {
    // In a real app, this would query the database
    // For now, we'll use hardcoded demo users
    const demoUsers = [
      {
        id: '1',
        email: 'admin@college.edu',
        password: await this.hashPassword('admin123'),
        role: UserRole.ADMIN as UserRole,
        name: 'System Administrator'
      },
      {
        id: '2',
        email: 'staff@college.edu',
        password: await this.hashPassword('staff123'),
        role: UserRole.STAFF as UserRole,
        name: 'Staff Member'
      },
      {
        id: '3',
        email: 'student@college.edu',
        password: await this.hashPassword('student123'),
        role: UserRole.STUDENT as UserRole,
        name: 'John Doe'
      }
    ];

    const user = demoUsers.find(u => u.email === email);
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    const isValidPassword = await this.comparePasswords(password, user.password);
    if (!isValidPassword) {
      return { success: false, message: 'Invalid credentials' };
    }

    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    const token = this.generateToken(payload);

    return {
      success: true,
      user: payload,
      token,
      message: 'Authentication successful'
    };
  }

  static hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
    const roleHierarchy = {
      [UserRole.STUDENT]: 1,
      [UserRole.STAFF]: 2,
      [UserRole.ADMIN]: 3
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  }
}

export const getTokenFromHeaders = (authHeader: string | null): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
};

export const requireAuth = (requiredRole: UserRole = UserRole.STUDENT) => {
  return (token: string | null): { success: boolean; user?: JWTPayload; message: string } => {
    if (!token) {
      return { success: false, message: 'No token provided' };
    }

    const payload = AuthService.verifyToken(token);
    if (!payload) {
      return { success: false, message: 'Invalid or expired token' };
    }

    if (!AuthService.hasPermission(payload.role, requiredRole)) {
      return { success: false, message: 'Insufficient permissions' };
    }

    return { success: true, user: payload, message: 'Authorized' };
  };
};
