import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  startDate: string;
  endDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  blockId: string;
}

const TaskScheduling = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [filter, setFilter] = useState('all');
  
  // Mock data for tasks
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Fertilizer Application - Block A12',
      description: 'Apply NPK fertilizer according to schedule',
      assignedTo: ['Team A', 'John Doe'],
      startDate: '2024-03-15',
      endDate: '2024-03-16',
      status: 'pending',
      priority: 'high',
      blockId: 'A12'
    },
    {
      id: '2',
      title: 'Pest Control - Block B5',
      description: 'Inspect and treat for rhinoceros beetle infestation',
      assignedTo: ['Pest Control Unit'],
      startDate: '2024-03-16',
      endDate: '2024-03-16',
      status: 'in-progress',
      priority: 'medium',
      blockId: 'B5'
    },
    {
      id: '3',
      title: 'Harvesting - Blocks C1-C4',
      description: 'Harvest ripe fruit bunches',
      assignedTo: ['Harvest Team B'],
      startDate: '2024-03-14',
      endDate: '2024-03-14',
      status: 'completed',
      priority: 'high',
      blockId: 'C1-C4'
    }
  ];

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Task Scheduling</h1>
        <Button leftIcon={<Calendar size={16} />}>
          Create New Task
        </Button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 rounded-md ${
                view === 'list' 
                  ? 'bg-[#2D5F2D] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1.5 rounded-md ${
                view === 'calendar' 
                  ? 'bg-[#2D5F2D] text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Calendar View
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </Card>

      {view === 'list' ? (
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <h3 className="text-lg font-medium">{task.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(task.status)}`}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                    <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600">{task.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{task.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{task.assignedTo.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  {task.status !== 'completed' && (
                    <Button 
                      variant="success" 
                      size="sm"
                      leftIcon={<CheckCircle size={16} />}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="h-[600px] flex items-center justify-center">
            <div className="text-center">
              <Calendar size={48} className="mx-auto text-gray-400" />
              <p className="mt-4 text-gray-600">
                Calendar view will be implemented in the next phase
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TaskScheduling;