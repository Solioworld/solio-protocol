import { cn, formatNumberView } from '@/utils';

import type { ChartType } from '@/types';
import { DialogDescription } from '@radix-ui/react-dialog';
import {
  type BondingCurveChart,
  type BondingCurveChartItem,
  computeBondingCurvePrice,
  computeBondingCurveTvl,
  generateBondingCurveChart,
} from '@solio/core';
import { Chart, type ChartDataset } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { CircleMinus, CirclePlus, ListRestart, Maximize2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { FormControl, FormItem, FormLabel } from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
Chart.register(zoomPlugin);

const chartTypeList: { value: ChartType; label: string }[] = [
  {
    value: 'price',
    label: 'Price',
  },
  {
    value: 'tvl',
    label: 'TVL',
  },
  {
    value: 'marketCap',
    label: 'MarketCap',
  },
];

type CurveChartProps = {
  className?: string;
};
const CurveChart = ({ className }: CurveChartProps) => {
  const { setValue } = useFormContext();
  const [type, chartType, finalSupply, param, preSupply, mintSupply, interval] = useWatch({
    name: ['type', 'chartType', 'input.finalSupply', 'param', 'preSupply', 'mintSupply', 'interval'],
  });
  const fullCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>();
  const [zoomLevel, setZoomLevel] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const maxTvl = useMemo(
    () => computeBondingCurveTvl({ type, param, supply: Number(finalSupply) }),
    [finalSupply, param, type],
  );
  const maxMarketCap = useMemo(() => {
    const price = computeBondingCurvePrice({
      type,
      param,
      supply: Number(finalSupply),
    });
    return price && finalSupply ? finalSupply * price : 0;
  }, [finalSupply, param, type]);

  const datasets: ChartDataset<'line', BondingCurveChart>[] = useMemo(() => {
    const data = [];
    if (Number(preSupply) > 0) {
      data.push({
        label: 'PreMint',
        data: generateBondingCurveChart({
          type,
          param,
          supply: Number(finalSupply),
          end: Number(preSupply),
          count: interval,
        }),
        stepped: false,
        // borderColor: "rgb(255, 99, 132)",
        // backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192,0.4)',
      } as ChartDataset<'line', BondingCurveChart>);
    }
    if (Number(mintSupply) > 0) {
      data.push({
        label: 'Mint',
        data: generateBondingCurveChart({
          type,
          param,
          supply: Number(finalSupply),
          start: Number(preSupply),
          end: Number(preSupply) + Number(mintSupply),
          count: interval,
        }),
        stepped: false,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.4)',
      });
    }
    data.push({
      label: 'UnMint',
      data: generateBondingCurveChart({
        type,
        param,
        supply: Number(finalSupply),
        start: Number(mintSupply) + Number(preSupply),
        count: interval,
      }),
      borderDash: [5, 5],
      stepped: Number(preSupply) <= 0 && Number(mintSupply) <= 0,
      borderColor: 'rgb(220, 220,220)',
      backgroundColor: 'rgba(220, 220, 220, 0.4)',
    });
    return data;
  }, [type, finalSupply, param, preSupply, mintSupply, interval]);
  useEffect(() => {
    const canvas = fullScreen ? fullCanvasRef.current : canvasRef.current;
    if (!canvas) return;
    chartRef.current = new Chart<'line', BondingCurveChart>(canvas, {
      type: 'line',
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: !fullScreen,
        interaction: {
          mode: 'nearest',
          intersect: false,
        },
        datasets: {
          line: {
            fill: true,
            spanGaps: true,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 7,
          },
        },
        parsing: {
          xAxisKey: 'supply',
          yAxisKey: chartType,
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Supply',
              align: 'end',
            },
            grid: {
              display: true,
              drawTicks: false,
            },
            ticks: {
              autoSkip: true,
              callback(tickValue) {
                return formatNumberView(tickValue);
              },
            },
          },
          y: {
            type: 'linear',
            beginAtZero: true,
            min: 0,
            title: {
              display: true,
              text: chartTypeList.find((x) => x.value === chartType)?.label,
              align: 'end',
            },
            grid: {
              display: true,
              drawTicks: false,
            },
            ticks: {
              autoSkip: true,
              callback(tickValue) {
                return formatNumberView(tickValue);
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'chartArea',
            labels: {
              font: { size: fullScreen ? 12 : 10 },
              boxHeight: 2,
              pointStyleWidth: 2,
              usePointStyle: true,
            },
          },
          tooltip: {
            callbacks: {
              title: () => '',
              label: () => '',
              footer: (tooltipItems) => {
                const item = tooltipItems[0].raw as BondingCurveChartItem;
                return `Price: ${formatNumberView(item.price)}\nSupply: ${formatNumberView(
                  item.supply,
                )}\nTVL: ${formatNumberView(item.tvl)}\nMarketCap: ${formatNumberView(item.marketCap)}`;
              },
            },
          },
          zoom: {
            limits: {
              x: { min: 0 },
              y: { min: 0 },
            },
            pan: {
              enabled: true,
              mode: 'xy',
            },
            zoom: {
              drag: {
                enabled: true,
              },
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
      },
    }) as unknown as Chart;
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [chartType, datasets, fullScreen, maxTvl]);

  useEffect(() => {
    setZoomLevel(chartRef.current?.getZoomLevel() || 0);
  }, []);
  return (
    <div className={cn('flex flex-col space-y-2', className)}>
      <div className="flex space-x-2 overflow-auto md:whitespace-nowrap text-muted-foreground text-xs md:text-sm">
        <div>MaxTvl: {formatNumberView(maxTvl)}</div>
        <div>MaxMarketCap: {formatNumberView(maxMarketCap)}</div>
      </div>
      <div className="flex items-center justify-end space-x-2 text-muted-foreground text-sm">
        {/* chart type */}
        <RadioGroup onValueChange={(v) => setValue('chartType', v)} defaultValue={chartType} className="flex space-x-1">
          {chartTypeList.map((item) => (
            <FormItem key={item.value} className="flex items-center space-x-1 space-y-0">
              <FormControl>
                <RadioGroupItem value={item.value} />
              </FormControl>
              <FormLabel className="font-normal text-xs">{item.label}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
        {/* reset */}
        <Button
          variant="ghost"
          size="icon"
          className="size-4 hover:text-foreground"
          onClick={() => chartRef.current?.resetZoom()}>
          <ListRestart />
        </Button>
        {/* - */}
        <Button
          variant="ghost"
          size="icon"
          className="size-4 hover:text-foreground"
          disabled={zoomLevel <= 0.1}
          onClick={() => chartRef.current?.zoom(zoomLevel - 0.1)}>
          <CircleMinus />
        </Button>
        {/* + */}
        <Button
          variant="ghost"
          size="icon"
          className="size-4 hover:text-foreground"
          onClick={() => chartRef.current?.zoom(zoomLevel + 0.1)}>
          <CirclePlus />
        </Button>
        <Dialog onOpenChange={setFullScreen}>
          <DialogTrigger asChild>
            {/* full screen */}
            <Button variant="ghost" size="icon" className="size-4 hover:text-foreground">
              <Maximize2 className="!size-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="size-full max-w-full !rounded-none flex flex-col pb-20">
            <DialogTitle className="flex items-center justify-center space-x-2 font-normal text-muted-foreground">
              <div>MaxTvl: {formatNumberView(maxTvl)}</div>
              <div>MaxMarketCap: {formatNumberView(maxMarketCap)}</div>
            </DialogTitle>
            <DialogDescription className="flex items-center justify-center space-x-2 font-normal text-muted-foreground">
              {/* chart type */}
              <RadioGroup onValueChange={(v) => setValue('chartType', v)} defaultValue={chartType} className="flex space-x-1">
                {chartTypeList.map((item) => (
                  <FormItem key={item.value} className="flex items-center space-x-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={item.value} />
                    </FormControl>
                    <FormLabel className="font-normal text-xs">{item.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
              {/* reset */}
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-foreground"
                onClick={() => chartRef.current?.resetZoom()}>
                <ListRestart />
              </Button>
              {/* - */}
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-foreground"
                disabled={zoomLevel <= 0.1}
                onClick={() => chartRef.current?.zoom(zoomLevel - 0.1)}>
                <CircleMinus />
              </Button>
              {/* + */}
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-foreground"
                onClick={() => chartRef.current?.zoom(zoomLevel + 0.1)}>
                <CirclePlus />
              </Button>
            </DialogDescription>
            <canvas ref={fullCanvasRef} className="flex-1 mx-auto" />
          </DialogContent>
        </Dialog>
      </div>
      <canvas ref={canvasRef} className="flex-1" />
    </div>
  );
};

export default CurveChart;
