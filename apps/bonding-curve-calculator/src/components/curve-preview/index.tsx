import { cn } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

import ChartParams from './chart-params';
import CurveChart from './curve-chart';

type CurvePreviewProps = {
  className?: string;
};

const CurvePreview = ({ className }: CurvePreviewProps) => {
  return (
    <Card className={cn('w-full md:w-160', className)}>
      <CardHeader>
        <CardTitle className="text-xl">Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ChartParams />
        <CurveChart />
      </CardContent>
    </Card>
  );
};

export default CurvePreview;
