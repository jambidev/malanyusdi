import React from 'react';

const FertilizerManagement: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Fertilizer Management</h1>
      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Fertilizer Schedule</h2>
          <p className="text-gray-600">Manage your fertilizer applications and schedules here.</p>
        </div>
      </div>
    </div>
  );
};

export default FertilizerManagement;