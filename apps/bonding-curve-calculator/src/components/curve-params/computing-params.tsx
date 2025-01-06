import { formatInputNumber, formatNumberView } from '@/utils';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

const ComputingParams = () => {
  const { control } = useFormContext();
  const [type] = useWatch({ name: ['type'] });
  return (
    <>
      {/* a */}
      <FormField
        control={control}
        name="param.a"
        render={({ field }) => (
          <FormItem className={type === 'linear' ? 'hidden' : ''}>
            <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
              a ({formatNumberView(field.value)})
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
      {/* b */}
      <FormField
        control={control}
        name="param.b"
        render={({ field }) => (
          <FormItem className={type === 'linear' ? 'hidden' : ''}>
            <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
              b ({formatNumberView(field.value)})
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
      {/* k */}
      <FormField
        control={control}
        name="param.k"
        render={({ field }) => (
          <FormItem className={type === 'exponential' ? 'hidden' : ''}>
            <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
              k ({formatNumberView(field.value)})
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
      {/* p */}
      <FormField
        control={control}
        name="param.p"
        render={({ field }) => (
          <FormItem className={type === 'exponential' ? 'hidden' : ''}>
            <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
              p ({formatNumberView(field.value)})
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
    </>
  );
};
export default ComputingParams;
