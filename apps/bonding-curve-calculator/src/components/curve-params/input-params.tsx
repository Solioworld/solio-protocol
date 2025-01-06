import type { InputType } from '@/types';
import { formatInputNumber, formatNumberView } from '@/utils';
import { parseBondingCurveParam } from '@solio/core';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const inputTypeList: { value: InputType; label: string }[] = [
  {
    value: 'normal',
    label: 'Normal',
  },
  {
    value: 'tvl',
    label: 'TVL',
  },
];

const InputParams = () => {
  const { control, setValue, trigger, formState } = useFormContext();
  const [type, inputType, input] = useWatch({
    name: ['type', 'inputType', 'input'],
  });
  useEffect(() => {
    if (formState.errors?.input) return;
    const finalTVL = inputType === 'tvl' ? input.finalTVL : undefined;
    try {
      const param = parseBondingCurveParam({
        type,
        param: { ...input, finalTVL },
      });
      setValue('param', param);
      trigger('param');
    } catch (error) {
      console.log(error);
    }
  }, [formState.errors, input, inputType, setValue, trigger, type]);

  return (
    <>
      <Tabs defaultValue={inputType} className="w-full" onValueChange={(value) => setValue('inputType', value)}>
        <TabsList className="w-full">
          {inputTypeList.map((item) => (
            <TabsTrigger key={item.value} value={item.value} className="w-full text-xs">
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="normal" className="space-y-4 bg-muted p-2 rounded-lg">
          {/* init price */}
          <FormField
            control={control}
            name="input.initPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
                  Initial Price ({formatNumberView(field.value)})
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
          {/* final price */}
          <FormField
            control={control}
            name="input.finalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
                  Final Price ({formatNumberView(field.value)})
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
          {/* final supply */}
          <FormField
            control={control}
            name="input.finalSupply"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
                  Final Supply ({formatNumberView(field.value)})
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
        </TabsContent>
        <TabsContent value="tvl" className="space-y-4 bg-muted p-2 rounded-lg">
          {/* init price */}
          <FormField
            control={control}
            name="input.initPrice"
            render={({ field }) => (
              <FormItem className={type === 'exponential' ? 'hidden' : ''}>
                <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
                  Initial Price ({formatNumberView(field.value)})
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
          {/* final price */}
          <FormField
            control={control}
            name="input.finalPrice"
            render={({ field }) => (
              <FormItem className={type === 'linear' ? 'hidden' : '!mt-0'}>
                <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
                  Final Price ({formatNumberView(field.value)})
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
          {/* final supply */}
          <FormField
            control={control}
            name="input.finalSupply"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
                  Final Supply ({formatNumberView(field.value)})
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
          {/* final tvl */}
          <FormField
            control={control}
            name="input.finalTVL"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground whitespace-nowrap text-xs overflow-x-auto flex">
                  Final TVL ({formatNumberView(field.value)})
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
        </TabsContent>
      </Tabs>
    </>
  );
};
export default InputParams;
