# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Getting Started
```bash
# Install dependencies
npm install

# Start development server with Turbopack (fast refresh)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Application Access
- **Main Application**: http://localhost:3000/ (Full College ERP System with tabbed interface)
- **Demo Page**: http://localhost:3000/demo (Alternative demo page - same content)
- Both routes show the complete ERP system with Dashboard, Admission, Fee Management, and Hostel Management

### Testing and Development
```bash
# Run a specific component in isolation for testing
npm run dev -- --port 3001

# Check TypeScript compilation without running
npx tsc --noEmit

# Format and check for issues
npm run lint -- --fix
```

## Architecture Overview

### Technology Foundation
- **Framework**: Next.js 15 with App Router and Turbopack for fast builds
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Authentication**: JWT with bcryptjs for password hashing

### Core Architecture Patterns

#### Type System (`types/index.ts`)
All data structures are centrally defined with comprehensive TypeScript interfaces:
- User roles with hierarchical permissions (Student → Staff → Admin)
- Complete entity definitions (Student, Fee, Hostel, Course, etc.)
- Status enums for admission tracking, fee processing, and exam management
- API response patterns with standardized error handling

#### Authentication & Authorization (`lib/auth.ts`)
- JWT-based authentication with role-based access control
- Password hashing with bcryptjs (12 rounds)
- Demo users for development: admin@college.edu, staff@college.edu, student@college.edu
- Permission hierarchy system for route protection

#### Component Architecture
- **Feature Modules** (`components/modules/`): Domain-specific components (FeeManagement, HostelManagement)
- **Forms** (`components/forms/`): React Hook Form + Zod validation for all user inputs
- **UI Components** (`components/ui/`): Reusable components with consistent styling
- **Dashboard** (`components/dashboard/`): Real-time statistics with interactive charts

#### Data Management
- Currently uses mock data for development/demo purposes
- Designed for future database integration with proper entity relationships
- Export utilities support CSV, JSON, and PDF generation
- Local storage backup functionality for client-side data persistence

## Working with Core Features

### Adding New Forms
When creating new forms, follow the established pattern:
1. Define Zod schema with comprehensive validation
2. Use React Hook Form with zodResolver
3. Implement proper error handling and loading states
4. Follow the existing styling patterns with Tailwind classes

### Authentication Development
- Test accounts are hardcoded in `lib/auth.ts`
- JWT tokens expire in 7 days
- Role hierarchy: STUDENT (1) → STAFF (2) → ADMIN (3)
- Use `requireAuth()` helper for route protection

### Data Export Features
The `utils/export.ts` provides comprehensive export functionality:
- CSV export with customizable column mapping
- JSON export for data backup
- PDF generation from HTML elements using html2canvas + jsPDF
- Automated receipt generation with proper formatting

### Dashboard Development
- Real-time statistics display with auto-refresh capability
- Interactive charts using Recharts with responsive design
- Color-coded metrics with consistent icon usage from Heroicons
- Sample data structures provided for all chart types

## Environment Configuration

### Required Environment Variables
```env
# JWT authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Application configuration
NEXT_PUBLIC_APP_NAME=College ERP System
```

### TypeScript Configuration
- Strict mode enabled with comprehensive type checking
- Path aliases configured (`@/*` maps to root directory)
- ES2017 target for broad browser compatibility

## Development Workflow

### File Organization
```
components/
├── dashboard/     # Admin statistics and charts
├── forms/         # All form components with validation
├── modules/       # Feature-specific business logic
└── ui/            # Reusable UI components

lib/
└── auth.ts        # Authentication and authorization logic

types/
└── index.ts       # Centralized type definitions

utils/
├── cn.ts          # Class name utilities (clsx)
└── export.ts      # Data export and validation utilities
```

### Code Style Guidelines
- Use TypeScript strict mode - all types must be properly defined
- Forms must use React Hook Form + Zod validation pattern
- Components should be client-side rendered when using hooks (`'use client'`)
- Follow the existing error handling patterns with proper user feedback
- Maintain consistent styling with Tailwind utility classes

### Mock Data Usage
Currently uses hardcoded demo data throughout the application. When extending:
- Follow existing data structure patterns in `types/index.ts`
- Maintain referential integrity in mock relationships
- Use realistic sample data that demonstrates system capabilities

### Security Considerations
- All user inputs are validated using Zod schemas
- Password hashing uses bcryptjs with 12 salt rounds
- JWT tokens have configurable expiration (currently 7 days)
- Input sanitization utilities provided in `utils/export.ts`
- Role-based access control implemented throughout

## Testing User Accounts

### Demo Authentication
Use these accounts for testing different permission levels:
- **Admin**: admin@college.edu / admin123 (Full system access)
- **Staff**: staff@college.edu / staff123 (Student management, fee processing)
- **Student**: student@college.edu / student123 (Personal records, fee payment)

## Future Database Integration
The codebase is structured for easy database integration:
- All entity relationships are properly typed in `types/index.ts`
- Authentication service can be easily extended with real database queries
- API response patterns are standardized for backend integration
- Export utilities can be extended to work with database queries

## Performance Optimization
- Next.js 15 with Turbopack for fast development builds
- Lazy loading patterns in place for chart components
- Responsive design optimized for both desktop and mobile
- Efficient state management with React hooks pattern
