import { formatInputNumber, formatNumberView } from '@/utils';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';

const ChartParams = () => {
  const { control, setValue } = useFormContext();
  return (
    <div className="space-y-5">
      {/* preSupply */}
      <FormField
        control={control}
        name="preSupply"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
              Pre Mint Supply ({formatNumberView(field.value)})
            </FormLabel>
            <FormControl>
              <Input
                placeholder="0.01"
                {...field}
                value={formatInputNumber(field.value)}
                onChange={(e) => field.onChange(formatInputNumber(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* mintSupply */}
      <FormField
        control={control}
        name="mintSupply"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
              Mint Supply ({formatNumberView(field.value)})
            </FormLabel>
            <FormControl>
              <Input
                placeholder="0.01"
                {...field}
                value={formatInputNumber(field.value)}
                onChange={(e) => field.onChange(formatInputNumber(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* interval */}
      <FormField
        control={control}
        name="interval"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
              Supply Tick Interval ({formatNumberView(field.value)})
            </FormLabel>
            <FormControl>
              <Slider
                min={1}
                max={1000}
                step={1}
                {...field}
                value={[field.value]}
                onValueChange={([value]) => setValue('interval', value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ChartParams;
