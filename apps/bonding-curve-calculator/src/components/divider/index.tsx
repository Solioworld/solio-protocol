import { cn } from '@/utils';

type CurveParamsProps = {
  className?: string;
  children?: React.ReactNode;
};
const Divider = ({ className, children }: CurveParamsProps) => {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t" />
      </div>
      <div className="relative flex items-center justify-center">
        <div className={cn('bg-background text-sm text-muted-foreground', className)}>{children}</div>
      </div>
    </div>
  );
};

export default Divider;
