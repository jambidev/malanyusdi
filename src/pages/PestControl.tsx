import React from 'react';
import Card from '../components/common/Card';

const PestControl = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pest Control Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Active Treatments">
          <p className="text-gray-600">No active pest control treatments</p>
        </Card>
        
        <Card title="Scheduled Treatments">
          <p className="text-gray-600">No scheduled treatments</p>
        </Card>
        
        <Card title="Treatment History">
          <p className="text-gray-600">No treatment history available</p>
        </Card>
      </div>
    </div>
  );
};

export default PestControl;