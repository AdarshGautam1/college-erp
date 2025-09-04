# College ERP System

A comprehensive Enterprise Resource Planning (ERP) system designed specifically for educational institutions. This system provides an integrated solution for managing admissions, fee collection, hostel allocation, and examination records while maintaining data security and providing real-time institutional insights.

## 🎯 Project Overview

This College ERP System addresses the common challenge faced by public colleges where admissions, fee collection, hostel allocation, and examination records are maintained in separate ledgers. By leveraging modern web technologies and cloud services, this solution provides:

- **Streamlined Operations**: Unified data management eliminates duplicate data entry
- **Real-time Insights**: Live dashboards for administrators
- **Cost-Effective Solution**: Built with widely available technologies
- **Role-Based Access**: Secure access for students, staff, and administrators
- **Data Export & Backup**: Comprehensive reporting and data protection

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **Heroicons** - Beautiful SVG icons
- **Recharts** - Responsive charts and graphs

### Form Management & Validation
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Validation resolver for React Hook Form

### Data Processing & Export
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion
- **date-fns** - Date utility functions

### Security & Authentication
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation and verification

## 🚀 Features

### 📋 Admission Management
- Online application form with validation
- Document upload support
- Application status tracking
- Interview scheduling
- Automated application number generation

### 💰 Fee Management
- Multiple fee types (Tuition, Hostel, Library, etc.)
- Automated receipt generation
- Payment tracking with multiple methods
- Late fee calculation
- Comprehensive fee reports

### 🏠 Hostel Management
- Room allocation and tracking
- Occupancy monitoring
- Multi-hostel support (Boys/Girls/Mixed)
- Real-time availability updates
- Warden contact management

### 📊 Admin Dashboard
- Real-time statistics and metrics
- Interactive charts and graphs
- Recent activity tracking
- System status monitoring
- Quick action buttons

### 🔒 Security Features
- Role-based access control (Student/Staff/Admin)
- JWT token authentication
- Password hashing with bcrypt
- Input sanitization
- Data validation

### 📤 Export & Backup
- Export data to CSV/JSON/PDF formats
- Automated receipt generation
- Local storage backup
- Comprehensive reporting

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd college-erp-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   JWT_SECRET=your-super-secret-jwt-key
   NEXT_PUBLIC_APP_NAME=College ERP System
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

The system includes a demo authentication setup with the following test accounts:

### Admin Account
- **Email**: admin@college.edu
- **Password**: admin123
- **Permissions**: Full system access

### Staff Account
- **Email**: staff@college.edu  
- **Password**: staff123
- **Permissions**: Student management, fee processing

### Student Account
- **Email**: student@college.edu
- **Password**: student123
- **Permissions**: View personal records, pay fees

## 📁 Project Structure

```
college-erp-system/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── forms/             # Form components
│   ├── dashboard/         # Dashboard components
│   └── modules/           # Feature-specific modules
├── lib/                   # Library utilities
│   └── auth.ts           # Authentication logic
├── types/                 # TypeScript type definitions
│   └── index.ts          # Main type definitions
├── utils/                # Utility functions
│   ├── cn.ts             # Class name utilities
│   └── export.ts         # Export and validation utilities
├── data/                 # Mock data and constants
└── public/               # Static assets
```

## 🎨 Components Overview

### Core Components

#### `AdmissionForm`
- Comprehensive student admission form
- Multi-step validation with Zod
- File upload support for documents
- Guardian information collection

#### `FeeManagement`
- Fee display and payment processing
- Multiple payment method support
- Receipt generation
- Payment history tracking

#### `HostelManagement`
- Room allocation interface
- Occupancy tracking
- Multi-hostel support
- Real-time availability updates

#### `AdminDashboard`
- Real-time statistics display
- Interactive charts and graphs
- Recent activity feed
- Quick action buttons

### UI Components

#### `Button`
- Consistent styling across the app
- Multiple variants (primary, secondary, danger, etc.)
- Loading states
- Size variations

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration can be found in `tailwind.config.js`.

### TypeScript
Strict TypeScript configuration ensures type safety throughout the application.

### Environment Variables
Required environment variables:
- `JWT_SECRET`: Secret key for JWT token generation
- `NEXT_PUBLIC_APP_NAME`: Application name for display

## 📊 Data Management

### Mock Data
The system currently uses mock data for demonstration. In a production environment, this would be replaced with database connections.

### Data Export
Multiple export formats supported:
- CSV for spreadsheet analysis
- JSON for data backup
- PDF for official documents

### Backup Strategy
- Local storage backup for client-side data
- Export functionality for data portability
- Structured data format for easy migration

## 🔐 Security Considerations

### Authentication
- JWT tokens with configurable expiration
- Password hashing using bcrypt
- Role-based access control

### Input Validation
- Client-side validation with Zod schemas
- Input sanitization to prevent XSS attacks
- Type checking with TypeScript

### Data Protection
- Sensitive data encryption
- Secure token storage recommendations
- Input sanitization utilities

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
Ensure all environment variables are properly configured for production.

### Recommended Platforms
- Vercel (optimized for Next.js)
- Netlify
- AWS Amplify
- Digital Ocean

## 📈 Future Enhancements

### Planned Features
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Email notifications
- [ ] SMS integration for alerts
- [ ] Mobile app development
- [ ] Advanced reporting and analytics
- [ ] Integration with payment gateways
- [ ] Multi-language support
- [ ] Calendar integration for events
- [ ] Library management module
- [ ] Transport management

### Technical Improvements
- [ ] API rate limiting
- [ ] Advanced caching strategies
- [ ] Performance optimization
- [ ] Comprehensive testing suite
- [ ] CI/CD pipeline setup
- [ ] Docker containerization

## 🐛 Known Issues

- Mock data is used instead of persistent storage
- Authentication is demo-only (not production-ready)
- File upload functionality needs backend implementation

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review existing issues and discussions

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🎓 Educational Use

This project is designed for educational institutions and hackathon demonstrations. It showcases:
- Modern React development practices
- TypeScript implementation
- Form handling and validation
- Data visualization
- Authentication patterns
- Export functionality

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- React Hook Form for form management
- The open-source community for various libraries used

---

**Built with ❤️ for educational institutions seeking modern, cost-effective ERP solutions.**
