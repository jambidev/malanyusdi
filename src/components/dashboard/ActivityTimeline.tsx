import React from 'react';
import { CheckCircle as CircleCheck, CircleDashed, AlertCircle as CircleAlert, Calendar } from 'lucide-react';

type ActivityStatus = 'completed' | 'in-progress' | 'scheduled' | 'issue';

interface Activity {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  timestamp: string;
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
}

interface ActivityTimelineProps {
  activities: Activity[];
}

const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
  const getStatusIcon = (status: ActivityStatus) => {
    switch (status) {
      case 'completed':
        return <CircleCheck size={20} className="text-green-500" />;
      case 'in-progress':
        return <CircleDashed size={20} className="text-blue-500" />;
      case 'scheduled':
        return <Calendar size={20} className="text-amber-500" />;
      case 'issue':
        return <CircleAlert size={20} className="text-red-500" />;
      default:
        return <CircleDashed size={20} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: ActivityStatus) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'in-progress':
        return 'border-blue-200 bg-blue-50';
      case 'scheduled':
        return 'border-amber-200 bg-amber-50';
      case 'issue':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Recent Activities</h3>
      </div>
      
      <div className="p-4 max-h-[400px] overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative pb-4">
            {index !== activities.length - 1 && (
              <div className="absolute left-3.5 top-10 bottom-0 w-0.5 bg-gray-200"></div>
            )}
            
            <div className="relative flex items-start space-x-3">
              <div className="flex-shrink-0">{getStatusIcon(activity.status)}</div>
              
              <div className={`flex-1 p-3 rounded-lg border ${getStatusColor(activity.status)}`}>
                <div className="flex justify-between mb-1">
                  <h4 className="text-sm font-medium">{activity.title}</h4>
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
                
                <div className="mt-2 flex items-center">
                  {activity.user.avatar ? (
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {activity.user.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="ml-1.5 text-xs text-gray-500">
                    {activity.user.name} ({activity.user.role})
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;