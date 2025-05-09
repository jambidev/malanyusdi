import React from 'react';

interface HarvestData {
  month: string;
  production: number;
  target: number;
}

interface HarvestChartProps {
  data: HarvestData[];
  title?: string;
}

const HarvestChart = ({ data, title = 'Harvest Production' }: HarvestChartProps) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.production, d.target))) * 1.1;
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      
      <div className="p-4">
        {/* Since we can't use actual chart libraries, this is a simplified custom chart */}
        <div className="w-full h-[250px] mt-2">
          <div className="flex h-full">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between text-xs text-gray-500 pr-2">
              <span>{Math.round(maxValue)}</span>
              <span>{Math.round(maxValue * 0.75)}</span>
              <span>{Math.round(maxValue * 0.5)}</span>
              <span>{Math.round(maxValue * 0.25)}</span>
              <span>0</span>
            </div>
            
            {/* Chart content */}
            <div className="flex-1 flex items-end space-x-1">
              {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  {/* Production bar */}
                  <div 
                    className="w-full bg-[#4A7C59] rounded-t-sm transition-all duration-500 ease-in-out"
                    style={{ 
                      height: `${(d.production / maxValue) * 100}%`,
                      maxWidth: '80%'
                    }}
                  ></div>
                  
                  {/* Target indicator */}
                  <div className="relative w-full" style={{ height: '1px' }}>
                    <div 
                      className="absolute w-full h-1 bg-red-500"
                      style={{ 
                        bottom: `${(d.target / maxValue) * 100}%`,
                        maxWidth: '80%'
                      }}
                    ></div>
                  </div>
                  
                  {/* X-axis label */}
                  <div className="mt-2 text-xs text-gray-500">{d.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex justify-center mt-4 space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#4A7C59] rounded-sm mr-2"></div>
            <span className="text-xs text-gray-600">Actual Production</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-sm mr-2"></div>
            <span className="text-xs text-gray-600">Target</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestChart;