import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class ExportService {
  // Export data to CSV
  static exportToCSV<T extends Record<string, any>>(
    data: T[],
    filename: string,
    columns?: { key: keyof T; label: string }[]
  ): void {
    if (!data.length) {
      alert('No data to export');
      return;
    }

    const headers = columns 
      ? columns.map(col => col.label)
      : Object.keys(data[0]);

    const rows = data.map(item => {
      if (columns) {
        return columns.map(col => {
          const value = item[col.key];
          return typeof value === 'object' ? JSON.stringify(value) : value;
        });
      } else {
        return Object.values(item).map(value => 
          typeof value === 'object' ? JSON.stringify(value) : value
        );
      }
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Export data to JSON
  static exportToJSON<T>(data: T, filename: string): void {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Generate PDF from HTML element
  static async exportToPDF(elementId: string, filename: string): Promise<void> {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element with id ${elementId} not found`);
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${filename}.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
      throw error;
    }
  }

  // Generate receipt PDF
  static generateReceiptPDF(receiptData: {
    receiptNumber: string;
    studentName: string;
    rollNumber: string;
    feeType: string;
    amount: number;
    paymentDate: Date;
    paymentMethod: string;
    academicYear: string;
    semester: number;
  }): void {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Header
    pdf.setFontSize(20);
    pdf.text('COLLEGE FEE RECEIPT', pageWidth / 2, 30, { align: 'center' });
    
    // Receipt details
    pdf.setFontSize(12);
    const startY = 60;
    const lineHeight = 10;
    
    const details = [
      { label: 'Receipt Number:', value: receiptData.receiptNumber },
      { label: 'Date:', value: receiptData.paymentDate.toLocaleDateString() },
      { label: 'Student Name:', value: receiptData.studentName },
      { label: 'Roll Number:', value: receiptData.rollNumber },
      { label: 'Fee Type:', value: receiptData.feeType },
      { label: 'Academic Year:', value: receiptData.academicYear },
      { label: 'Semester:', value: receiptData.semester.toString() },
      { label: 'Payment Method:', value: receiptData.paymentMethod },
      { label: 'Amount Paid:', value: `₹${receiptData.amount.toLocaleString()}` },
    ];

    details.forEach((detail, index) => {
      const y = startY + (index * lineHeight);
      pdf.text(detail.label, 20, y);
      pdf.text(detail.value, 80, y);
    });

    // Footer
    const footerY = startY + (details.length * lineHeight) + 30;
    pdf.text('Thank you for your payment!', pageWidth / 2, footerY, { align: 'center' });
    pdf.text('This is a computer-generated receipt.', pageWidth / 2, footerY + 10, { align: 'center' });

    // Save the PDF
    pdf.save(`receipt-${receiptData.receiptNumber}.pdf`);
  }

  // Backup data to local storage
  static backupToLocalStorage(key: string, data: any): void {
    try {
      const backup = {
        data,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem(`backup_${key}`, JSON.stringify(backup));
    } catch (error) {
      console.error('Local storage backup failed:', error);
    }
  }

  // Restore data from local storage
  static restoreFromLocalStorage(key: string): any {
    try {
      const backupStr = localStorage.getItem(`backup_${key}`);
      if (backupStr) {
        const backup = JSON.parse(backupStr);
        return backup.data;
      }
      return null;
    } catch (error) {
      console.error('Local storage restore failed:', error);
      return null;
    }
  }

  // Generate comprehensive report
  static generateComprehensiveReport(data: {
    students: any[];
    admissions: any[];
    fees: any[];
    hostels: any[];
    examinations: any[];
  }): void {
    const report = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalStudents: data.students.length,
        totalAdmissions: data.admissions.length,
        totalFees: data.fees.length,
        totalHostels: data.hostels.length,
        totalExaminations: data.examinations.length,
      },
      data
    };

    this.exportToJSON(report, `college-erp-report-${new Date().toISOString().split('T')[0]}`);
  }
}

// Export data validation utilities
export class DataValidator {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  static validateRollNumber(rollNumber: string): boolean {
    // Example: 2023CSE001
    const rollRegex = /^\d{4}[A-Z]{2,4}\d{3}$/;
    return rollRegex.test(rollNumber);
  }

  static sanitizeInput(input: string): string {
    // Remove potential script tags and other dangerous content
    return input
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[\/\!]*?[^<>]*?>/gi, '')
      .replace(/javascript:/gi, '')
      .trim();
  }

  static validateAmount(amount: number): boolean {
    return !isNaN(amount) && amount > 0 && amount <= 10000000; // Max 1 crore
  }

  static validateDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }
}
