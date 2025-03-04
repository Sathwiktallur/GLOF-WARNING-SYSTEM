import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Clock } from 'lucide-react';
import type { PreventiveMeasure } from '@shared/schema';

interface PreventiveMeasuresProps {
  measures: PreventiveMeasure[];
}

export function PreventiveMeasures({ measures }: PreventiveMeasuresProps) {
  const priorityColor = {
    immediate: 'text-red-500',
    short_term: 'text-yellow-500',
    long_term: 'text-green-500'
  };

  return (
    <Card className="bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          Preventive Measures
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {measures.map((measure, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <Clock className={`h-5 w-5 mt-1 ${priorityColor[measure.priority]}`} />
              <div>
                <div className={`text-sm font-medium ${priorityColor[measure.priority]}`}>
                  {measure.priority.replace('_', ' ').toUpperCase()}
                </div>
                <p className="text-sm mt-1">{measure.measure}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
