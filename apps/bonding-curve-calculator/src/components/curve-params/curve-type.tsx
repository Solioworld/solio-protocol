import type { BondingCurveType } from '@solio/core';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const curveTypeList: { value: BondingCurveType; label: string }[] = [
  {
    value: 'exponential',
    label: 'Exponential',
  },
  {
    value: 'linear',
    label: 'Linear',
  },
];

const CurveType = () => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem className="flex space-x-2 items-center space-y-0">
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-2">
              {curveTypeList.map((item) => (
                <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={item.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CurveType;
