import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, AlertCircle, Filter, Download, BarChart2 } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import HarvestChart from '../components/charts/HarvestChart';

interface HarvestRecord {
  id: string;
  blockId: string;
  date: string;
  quantity: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  supervisor: string;
  team: string;
  notes?: string;
}

const HarvestManagement = () => {
  const [dateRange, setDateRange] = useState('week');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock data for harvest records
  const harvestRecords: HarvestRecord[] = [
    {
      id: '1',
      blockId: 'A12',
      date: '2024-03-15',
      quantity: 2.5,
      quality: 'excellent',
      supervisor: 'Abdul Rahman',
      team: 'Harvest Team A',
      notes: 'Completed ahead of schedule'
    },
    {
      id: '2',
      blockId: 'B08',
      date: '2024-03-15',
      quantity: 1.8,
      quality: 'good',
      supervisor: 'Siti Aminah',
      team: 'Harvest Team B'
    },
    {
      id: '3',
      blockId: 'C15',
      date: '2024-03-14',
      quantity: 2.2,
      quality: 'fair',
      supervisor: 'Ahmad Yusuf',
      team: 'Harvest Team C',
      notes: 'Some unripe bunches found'
    }
  ];

  // Mock data for harvest chart
  const harvestChartData = [
    { month: 'Jan', production: 458, target: 400 },
    { month: 'Feb', production: 420, target: 420 },
    { month: 'Mar', production: 435, target: 440 },
    { month: 'Apr', production: 450, target: 460 },
    { month: 'May', production: 480, target: 480 },
    { month: 'Jun', production: 520, target: 500 }
  ];

  const getQualityColor = (quality: HarvestRecord['quality']) => {
    switch (quality) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'good':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'poor':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Harvest Management</h1>
          <p className="text-gray-500 mt-1">
            Monitor and manage harvest operations across all blocks
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<Download size={16} />}
          >
            Export Data
          </Button>
          <Button
            leftIcon={<Calendar size={16} />}
          >
            Record Harvest
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Harvest</p>
              <p className="mt-2 text-2xl font-semibold">6.5 tons</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <BarChart2 className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600">
            +12% from yesterday
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Average</p>
              <p className="mt-2 text-2xl font-semibold">5.8 tons</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <BarChart2 className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-2 text-sm text-blue-600">
            On target
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Quality Rate</p>
              <p className="mt-2 text-2xl font-semibold">92%</p>
            </div>
            <div className="p-3 rounded-full bg-amber-100">
              <CheckCircle className="text-amber-600" size={24} />
            </div>
          </div>
          <div className="mt-2 text-sm text-amber-600">
            +2% this week
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Teams</p>
              <p className="mt-2 text-2xl font-semibold">4</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-2 text-sm text-purple-600">
            All teams deployed
          </div>
        </Card>
      </div>

      {/* Harvest Chart */}
      <HarvestChart data={harvestChartData} title="Harvest Trends" />

      {/* Recent Harvests */}
      <Card title="Recent Harvests">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={dateRange === 'week' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDateRange('week')}
            >
              Week
            </Button>
            <Button
              variant={dateRange === 'month' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDateRange('month')}
            >
              Month
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
            >
              <option value="all">All Quality Levels</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Filter size={16} />}
            >
              More Filters
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {harvestRecords.map((record) => (
            <div
              key={record.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium">Block {record.blockId}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getQualityColor(record.quality)}`}>
                      {record.quality.charAt(0).toUpperCase() + record.quality.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">{record.quantity} tons harvested</p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>

              <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {record.date}
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  {record.team}
                </div>
              </div>

              {record.notes && (
                <p className="mt-2 text-sm text-gray-600">
                  Note: {record.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HarvestManagement;