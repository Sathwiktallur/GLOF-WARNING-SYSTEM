import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, ThermometerSun, Droplets } from 'lucide-react';

interface RiskIndicatorProps {
  riskLevel: 'low' | 'medium' | 'high';
  daysToFlood?: number;
  temperature: number;
  waterLevel: number;
}

export function RiskIndicator({ riskLevel, daysToFlood, temperature, waterLevel }: RiskIndicatorProps) {
  const riskColor = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  }[riskLevel];

  return (
    <Card className="bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className={`h-5 w-5 ${riskLevel === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Risk Level</span>
            <span className={`px-2 py-1 rounded-full text-sm ${riskColor}`}>
              {riskLevel.toUpperCase()}
            </span>
          </div>

          {daysToFlood && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Estimated Days Until Flood</span>
                <span>{daysToFlood} days</span>
              </div>
              <Progress value={(100 - (daysToFlood / 365) * 100)} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <ThermometerSun className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{temperature}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{waterLevel}m</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
