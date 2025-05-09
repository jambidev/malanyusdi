import React, { useState } from 'react';
import { Plane as Plant, Droplet, Bug, Users, BarChart } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import HarvestChart from '../components/charts/HarvestChart';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

// Mock data for the dashboard
const harvestData = [
  { month: 'Jan', production: 458, target: 400 },
  { month: 'Feb', production: 420, target: 420 },
  { month: 'Mar', production: 435, target: 440 },
  { month: 'Apr', production: 450, target: 460 },
  { month: 'May', production: 480, target: 480 },
  { month: 'Jun', production: 520, target: 500 }
];

const recentActivities = [
  {
    id: '1',
    title: 'Block A12 Harvesting',
    description: 'Completed harvesting of Block A12 with 10.5 tons yield',
    status: 'completed' as const,
    timestamp: 'Today, 14:25',
    user: {
      name: 'Abdul Rahman',
      role: 'Supervisor',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  },
  {
    id: '2',
    title: 'Fertilizer Application',
    description: 'In progress - NPK application in Blocks B4 through B8',
    status: 'in-progress' as const,
    timestamp: 'Today, 11:30',
    user: {
      name: 'Siti Nurhayati',
      role: 'Field Assistant'
    }
  },
  {
    id: '3',
    title: 'Pest Detection',
    description: 'Rhinoceros beetle infestation detected in Block C2',
    status: 'issue' as const,
    timestamp: 'Yesterday, 16:42',
    user: {
      name: 'Budi Santoso',
      role: 'Pest Control Officer',
      avatar: 'https://i.pravatar.cc/150?img=4'
    }
  },
  {
    id: '4',
    title: 'Road Maintenance',
    description: 'Scheduled road repair for access to Blocks D1-D5',
    status: 'scheduled' as const,
    timestamp: '2 days ago',
    user: {
      name: 'Agus Priyanto',
      role: 'Infrastructure Manager'
    }
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [period, setPeriod] = useState('month');
  
  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your plantation today
          </p>
        </div>
        
        <div className="hidden md:flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPeriod('week')}>
            Week
          </Button>
          <Button 
            variant={period === 'month' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setPeriod('month')}
          >
            Month
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPeriod('year')}>
            Year
          </Button>
        </div>
      </div>
      
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Harvest (tons)"
          value="2,380"
          change={{ value: 12.5, isPositive: true }}
          icon={Plant}
          color="bg-green-500"
        />
        <StatCard
          title="Fertilizer Usage"
          value="345 tons"
          change={{ value: 2.1, isPositive: false }}
          icon={Droplet}
          color="bg-blue-500"
        />
        <StatCard
          title="Pest Incidents"
          value="13"
          change={{ value: 8.4, isPositive: false }}
          icon={Bug}
          color="bg-red-500"
        />
        <StatCard
          title="Workforce"
          value="248"
          change={{ value: 0, isPositive: true }}
          icon={Users}
          color="bg-purple-500"
        />
      </div>
      
      {/* Charts and activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HarvestChart data={harvestData} />
        </div>
        <div>
          <ActivityTimeline activities={recentActivities} />
        </div>
      </div>
      
      {/* Plantation overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Field Status Overview">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Area</span>
              <span className="text-sm">1,250 Hectares</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Productive Area</span>
              <span className="text-sm">1,120 Hectares</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Non-Productive Area</span>
              <span className="text-sm">130 Hectares</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Average Age of Trees</span>
              <span className="text-sm">8.5 Years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Blocks</span>
              <span className="text-sm">42 Blocks</span>
            </div>
            <Button leftIcon={<BarChart size={16} />} className="mt-2 w-full">
              View Detailed Report
            </Button>
          </div>
        </Card>
        
        <Card title="Upcoming Tasks">
          <div className="space-y-3">
            {[
              { date: 'Tomorrow', task: 'Fertilizer application in Block B10', team: 'Field Team A' },
              { date: 'Jun 15', task: 'Harvesting in Blocks A5-A8', team: 'Harvest Team C' },
              { date: 'Jun 17', task: 'Pest control treatment in Block C2', team: 'Pest Control Unit' },
              { date: 'Jun 18', task: 'Road maintenance in Sector D', team: 'Infrastructure Crew' }
            ].map((item, index) => (
              <div key={index} className="p-3 rounded-md bg-gray-50">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.date}</span>
                  <span className="text-xs text-gray-500">{item.team}</span>
                </div>
                <p className="text-sm mt-1">{item.task}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">
              View All Tasks
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;