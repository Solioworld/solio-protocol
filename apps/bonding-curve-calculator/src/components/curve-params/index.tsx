import { cn } from '@/utils';
import Divider from '../divider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import ComputingParams from './computing-params';
import Type from './curve-type';
import InputParams from './input-params';

type CurveParamsProps = {
  className?: string;
};

const CurveParams = ({ className }: CurveParamsProps) => {
  return (
    <Card className={cn('w-full md:w-100', className)}>
      <CardHeader>
        <CardTitle className="text-xl">Params</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <Type />
        <Divider>input</Divider>
        <InputParams />
        <Divider>or</Divider>
        <ComputingParams />
      </CardContent>
    </Card>
  );
};
export default CurveParams;
