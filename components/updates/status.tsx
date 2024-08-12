'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IconCircleFilled } from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const Status = () => {
  const [status, setStatus] = useState<{
    indicator: 'none' | 'minor' | 'major' | 'critical' | null;
    description: string;
  }>({ indicator: null, description: '' });

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await fetch('https://ydphyln26s8h.statuspage.io/api/v2/status.json');
        if (!response.ok) {
          throw new Error(`Statuspage API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching status:', error);
        setStatus({ indicator: null, description: 'No status available' });
      }
    };

    fetchStatusData();
    const intervalId = setInterval(fetchStatusData, 300000); // 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  const formattedDescription = status.description
    ? status.description.charAt(0).toUpperCase() + status.description.slice(1).toLowerCase()
    : '';

  // Hex color map
  const statusColorMap = {
    none: '#0000FF',    // Blue
    minor: '#FBBF24',   // Yellow
    major: '#FF6F00',   // Orange
    maintenance: '#3CDADD', // Almost Cyan
    critical: '#E50914', // Red
    error: '#2B2B2B',   // Gray
  };

  const fillColor = status.indicator && statusColorMap[status.indicator] 
    ? statusColorMap[status.indicator] 
    : statusColorMap['error'];

  const statusTooltipMap = {
    none: 'All systems operational',
    minor: 'Minor issues detected',
    major: 'Major issues detected',
    maintenance: 'Service under maintenance',
    critical: 'Critical issues detected',
    error: 'No status available',
  };

  const tooltipText = status.indicator && statusTooltipMap[status.indicator] 
    ? statusTooltipMap[status.indicator] 
    : statusTooltipMap['error'];

  return (
    <TooltipProvider>
      <div className="flex items-center justify-center w-full">
        <Link href="https://creptstudio.statuspage.io" target="_blank">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="px-4 rounded-md shadow-sm flex items-center font-semibold"
                variant="ghost"
                disabled={false}
                style={{ color: fillColor }}
              >
                <div className="flex items-center">
                  <IconCircleFilled
                    className={`mr-2 h-3 w-3 ${['critical', 'major', 'maintenance'].includes(status.indicator || '') ? 'animate-glow' : ''}`}
                    style={{ fill: fillColor }}
                  />
                  <span style={{ color: fillColor }}>{formattedDescription}</span>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </Link>
      </div>
    </TooltipProvider>
  );
};
