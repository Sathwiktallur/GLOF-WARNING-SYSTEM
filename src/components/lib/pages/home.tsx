import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { GlobeView } from '@/components/GlobeView';
import { RiskIndicator } from '@/components/RiskIndicator';
import { PreventiveMeasures } from '@/components/PreventiveMeasures';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Card, CardContent } from '@/components/ui/card';
import type { GlacialLake } from '@shared/schema';

export default function Home() {
  const { data: lakes = [] } = useQuery<GlacialLake[]>({
    queryKey: ['/api/lakes'],
  });

  const [selectedLake, setSelectedLake] = React.useState<GlacialLake | null>(null);

  const { data: measures = [] } = useQuery({
    queryKey: ['/api/lakes', selectedLake?.id, 'measures'],
    enabled: !!selectedLake,
  });

  const { data: sensorData = [] } = useQuery({
    queryKey: ['/api/lakes', selectedLake?.id, 'sensor-data'],
    enabled: !!selectedLake,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParticleBackground />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">GLOF Early Warning System</h1>
          <p className="text-muted-foreground">
            Monitor and track glacial lake outburst flood risks in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <GlobeView 
                  lakes={lakes} 
                  onSelectLake={setSelectedLake}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {selectedLake && (
              <>
                <RiskIndicator
                  riskLevel={selectedLake.riskLevel}
                  daysToFlood={selectedLake.daysToFlood}
                  temperature={sensorData[0]?.temperature || 0}
                  waterLevel={sensorData[0]?.waterLevel || 0}
                />
                <PreventiveMeasures measures={measures} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
