import React, { useState } from 'react';
import { Search, ZoomIn, ZoomOut, Layers, Map as MapIcon, Info } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// Mock data for blocks
const blockData = [
  { id: 'A1', name: 'Block A1', area: 24.5, status: 'productive', age: 8, variety: 'Tenera', lastHarvest: '2023-06-01' },
  { id: 'A2', name: 'Block A2', area: 22.8, status: 'productive', age: 7, variety: 'Tenera', lastHarvest: '2023-06-03' },
  { id: 'B1', name: 'Block B1', area: 26.2, status: 'productive', age: 10, variety: 'Tenera', lastHarvest: '2023-05-28' },
  { id: 'B2', name: 'Block B2', area: 23.9, status: 'productive', age: 10, variety: 'Tenera', lastHarvest: '2023-05-30' },
  { id: 'C1', name: 'Block C1', area: 25.5, status: 'replanting', age: 1, variety: 'Tenera', lastHarvest: null },
  { id: 'C2', name: 'Block C2', area: 24.7, status: 'issue', age: 6, variety: 'Tenera', lastHarvest: '2023-05-25' },
];

const FieldMapping = () => {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredBlocks = blockData.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || block.status === filter;
    return matchesSearch && matchesFilter;
  });
  
  const handleBlockClick = (blockId: string) => {
    setSelectedBlock(blockId === selectedBlock ? null : blockId);
  };
  
  const getBlockInfo = () => {
    if (!selectedBlock) return null;
    return blockData.find(block => block.id === selectedBlock);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'productive':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'replanting':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'issue':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const selectedBlockInfo = getBlockInfo();
  
  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row h-full gap-6">
        {/* Left sidebar with controls */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-4">
          <Card>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search blocks..."
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Blocks</option>
                <option value="productive">Productive</option>
                <option value="replanting">Replanting</option>
                <option value="issue">Has Issues</option>
              </select>
            </div>
            
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Map Controls</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" leftIcon={<ZoomIn size={16} />}>
                  Zoom In
                </Button>
                <Button variant="outline" size="sm" leftIcon={<ZoomOut size={16} />}>
                  Zoom Out
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                leftIcon={<Layers size={16} />} 
                className="mt-2 w-full"
              >
                Toggle Layers
              </Button>
            </div>
          </Card>
          
          <Card title="Block List" className="overflow-auto max-h-[calc(100vh-420px)]">
            <div className="space-y-2">
              {filteredBlocks.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No blocks found matching your criteria
                </p>
              ) : (
                filteredBlocks.map(block => (
                  <div
                    key={block.id}
                    className={`
                      p-3 rounded-md border cursor-pointer transition-all
                      ${selectedBlock === block.id 
                        ? 'bg-[#2D5F2D]/10 border-[#2D5F2D]/30' 
                        : 'hover:bg-gray-50 border-gray-200'}
                    `}
                    onClick={() => handleBlockClick(block.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{block.name}</span>
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full border
                        ${getStatusColor(block.status)}
                      `}>
                        {block.status.charAt(0).toUpperCase() + block.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {block.area} ha · {block.age} years
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
        
        {/* Main map area */}
        <div className="flex-1 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 min-h-[500px] relative">
          {/* Since we can't implement an actual map, this is a placeholder */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <MapIcon size={48} className="text-gray-400" />
            <p className="text-gray-600 mt-4">
              Interactive map would be displayed here
            </p>
            <p className="text-gray-500 text-sm mt-2 max-w-md text-center">
              In a full implementation, this would display an interactive map with block boundaries, 
              infrastructure, and annotation features.
            </p>
          </div>
          
          {/* Detailed block information sidebar */}
          {selectedBlockInfo && (
            <div className="absolute top-4 right-4 w-72 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-[#2D5F2D] text-white flex justify-between items-center">
                <h3 className="font-medium">{selectedBlockInfo.name}</h3>
                <button onClick={() => setSelectedBlock(null)} className="text-white hover:text-gray-200">
                  <Info size={20} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full border
                      ${getStatusColor(selectedBlockInfo.status)}
                    `}>
                      {selectedBlockInfo.status.charAt(0).toUpperCase() + selectedBlockInfo.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Area:</span>
                    <span className="text-sm font-medium">{selectedBlockInfo.area} hectares</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tree Age:</span>
                    <span className="text-sm font-medium">{selectedBlockInfo.age} years</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Variety:</span>
                    <span className="text-sm font-medium">{selectedBlockInfo.variety}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Harvest:</span>
                    <span className="text-sm font-medium">
                      {selectedBlockInfo.lastHarvest 
                        ? new Date(selectedBlockInfo.lastHarvest).toLocaleDateString() 
                        : 'N/A'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                  <Button size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View History
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FieldMapping;