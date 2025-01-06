import { formatNumberView } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDebounce } from 'react-use';
import { z } from 'zod';
import CurveParams from '../curve-params';
import CurvePreview from '../curve-preview';

const min = 1e-18;
const max = 1e131;
const num = z.coerce
  .number()
  .transform((val): number => Math.abs(val))
  .refine((val) => val >= min, {
    message: `value must be at least ${formatNumberView(min)}.`,
  })
  .refine((val) => val <= max, {
    message: `value must be at most ${formatNumberView(max)}.`,
  });

const min0Num = z.coerce
  .number()
  .transform((val): number => Math.abs(val))
  .refine((val) => val >= 0, { message: `value must be at least 0.` })
  .refine((val) => val <= max, {
    message: `value must be at most ${formatNumberView(max)}.`,
  });

const createSchema = (inputType: string, initPrice: number, finalSupply: number, preSupply: number, mintSupply: number) => {
  return z.object({
    type: z.enum(['linear', 'exponential']),
    inputType: z.enum(['normal', 'tvl']),
    chartType: z.enum(['price', 'tvl', 'marketCap']),
    input: z.object({
      initPrice: num,
      finalPrice: z.coerce
        .number()
        .min(inputType === 'normal' ? initPrice : 0, {
          message: `value must be at least ${inputType === 'normal' ? formatNumberView(initPrice) : 0}.`,
        })
        .max(max, {
          message: `value must be at most ${formatNumberView(max)}.`,
        }),
      finalSupply: z.coerce
        .number()
        .min(preSupply + mintSupply, {
          message: `value must be at least ${formatNumberView(preSupply + mintSupply)}.`,
        })
        .max(max, {
          message: `value must be at most ${formatNumberView(max)}.`,
        }),
      finalTVL: num,
    }),
    param: z.object({
      a: num,
      b: num,
      k: min0Num,
      p: num,
    }),
    preSupply: z.coerce
      .number()
      .min(0, { message: `value must be at least 0.` })
      .max(finalSupply, {
        message: `value must be at most ${formatNumberView(finalSupply)}.`,
      }),
    mintSupply: z.coerce
      .number()
      .min(0, { message: `value must be at least 0.` })
      .max(finalSupply - preSupply, {
        message: `value must be at most ${formatNumberView(finalSupply - preSupply)}.`,
      }),
    interval: z.coerce.number().min(1).max(1000),
  });
};

const defaultValues = {
  type: 'exponential',
  inputType: 'normal',
  chartType: 'price',
  input: {
    initPrice: 0.1,
    finalPrice: 1,
    finalSupply: 100000,
    finalTVL: 160000,
  },
  param: {
    a: 0.001,
    b: 1000000,
    k: 0.00001,
    p: 0.001,
  },
  preSupply: 6000,
  mintSupply: 8000,
  interval: 300,
};

const Curve = () => {
  const [inputType, setInputType] = useState(defaultValues.inputType);
  const [initPrice, setInitPrice] = useState(defaultValues.input.initPrice);
  const [finalSupply, setFinalSupply] = useState(defaultValues.input.finalSupply);
  const [preSupply, setPreSupply] = useState(defaultValues.preSupply);
  const [mintSupply, setMintSupply] = useState(defaultValues.mintSupply);
  const formSchema = useMemo(
    () => createSchema(inputType, initPrice, finalSupply, preSupply, mintSupply),
    [finalSupply, initPrice, inputType, mintSupply, preSupply],
  );
  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const [_inputType, _initPrice, _finalSupply, _preSupply, _mintSupply] = form.watch([
    'inputType',
    'input.initPrice',
    'input.finalSupply',
    'preSupply',
    'mintSupply',
  ]);
  useDebounce(
    () => {
      setInputType(_inputType);
      setInitPrice(Number(_initPrice));
      setFinalSupply(Number(_finalSupply));
      setPreSupply(Number(_preSupply));
      setMintSupply(Number(_mintSupply));
      form.trigger(['input.initPrice', 'input.finalSupply', 'preSupply', 'mintSupply']);
    },
    500,
    [_inputType, _initPrice, _finalSupply, _preSupply, _mintSupply],
  );
  return (
    <main className="container mx-auto px-2 flex-1 py-5 md:pt-16 md:space-x-16 space-y-6 md:space-y-0 flex flex-col items-start justify-center md:flex-row">
      <FormProvider {...form}>
        <CurveParams />
        <CurvePreview />
      </FormProvider>
    </main>
  );
};

export default Curve;
