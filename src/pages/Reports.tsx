import React, { useState } from 'react';
import { FileText, Download, Filter, Calendar } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

interface Report {
  id: string;
  title: string;
  description: string;
  type: 'harvest' | 'financial' | 'workforce' | 'maintenance';
  date: string;
  size: string;
  format: 'PDF' | 'XLSX' | 'CSV';
}

const Reports = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('month');
  
  // Mock data for reports
  const reports: Report[] = [
    {
      id: '1',
      title: 'Monthly Harvest Report',
      description: 'Detailed harvest data including yield per block, quality metrics, and comparison with targets',
      type: 'harvest',
      date: '2024-03-01',
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      id: '2',
      title: 'Financial Statement Q1',
      description: 'Quarterly financial report including revenue, expenses, and profit analysis',
      type: 'financial',
      date: '2024-03-15',
      size: '1.8 MB',
      format: 'XLSX'
    },
    {
      id: '3',
      title: 'Workforce Attendance Log',
      description: 'Monthly attendance and productivity report for all workers',
      type: 'workforce',
      date: '2024-03-10',
      size: '956 KB',
      format: 'CSV'
    },
    {
      id: '4',
      title: 'Equipment Maintenance Log',
      description: 'Monthly maintenance records and upcoming maintenance schedule',
      type: 'maintenance',
      date: '2024-03-05',
      size: '1.2 MB',
      format: 'PDF'
    }
  ];

  const getTypeColor = (type: Report['type']) => {
    switch (type) {
      case 'harvest':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'financial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'workforce':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredReports = reports.filter(report => 
    selectedType === 'all' || report.type === selectedType
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <Button leftIcon={<FileText size={16} />}>
          Generate New Report
        </Button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
              >
                <option value="all">All Reports</option>
                <option value="harvest">Harvest</option>
                <option value="financial">Financial</option>
                <option value="workforce">Workforce</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <h3 className="text-lg font-medium">{report.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getTypeColor(report.type)}`}>
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                  </span>
                </div>
                
                <p className="text-gray-600">{report.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{new Date(report.date).toLocaleDateString()}</span>
                  <span>{report.size}</span>
                  <span>{report.format}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  leftIcon={<Download size={16} />}
                >
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <FileText size={48} className="mx-auto text-gray-400" />
            <p className="mt-4 text-gray-600">No reports found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;