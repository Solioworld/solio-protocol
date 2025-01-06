// curve
export type BondingCurveType = 'linear' | 'exponential';

export type ParseExponentialParam =
  | {
      initPrice: number;
      finalPrice: number;
      finalSupply: number;
      finalTVL?: never;
      aValue?: never;
    }
  | {
      initPrice: number;
      aValue: number; // A≈ab
      finalPrice?: never;
      finalSupply?: never;
      finalTVL?: never;
    }
  | {
      finalPrice: number;
      finalSupply: number;
      finalTVL: number;
      initPrice?: never;
      aValue?: never;
    };

export type ParseLinearParam = {
  initPrice: number;
  finalSupply: number;
} & (
  | {
      finalPrice: number;
      finalTVL?: never;
    }
  | {
      finalPrice?: never;
      finalTVL: number;
    }
);

export type ParseBondingCurveParam = ParseExponentialParam | ParseLinearParam;

export type ParseBondingCurveProps =
  | {
      type: BondingCurveType;
      param: ParseBondingCurveParam;
    }
  | {
      type: 'exponential';
      param: ParseExponentialParam;
    }
  | {
      type: 'linear';
      param: ParseLinearParam;
    };

export type EncodeExponentialParam = {
  a: number;
  b: number;
};

export type EncodeLinearParam = {
  k: number;
  p: number;
};

export type EncodeBondingCurveParam = EncodeExponentialParam | EncodeLinearParam;

export type EncodeBondingCurveProps =
  | {
      type: BondingCurveType;
      param: EncodeBondingCurveParam;
    }
  | {
      type: 'linear';
      param: EncodeLinearParam;
    }
  | {
      type: 'exponential';
      param: EncodeExponentialParam;
    };

export type FormatExponentialParam = EncodeExponentialParam & { finalSupply?: number };
export type FormatLinearParam = EncodeLinearParam & { finalSupply: number };
export type FormatBondingCurveParam = FormatExponentialParam | FormatLinearParam;

export type FormatBondingCurveProps =
  | {
      type: BondingCurveType;
      param: FormatBondingCurveParam;
    }
  | {
      type: 'exponential';
      param: FormatExponentialParam;
    }
  | {
      type: 'linear';
      param: FormatLinearParam;
    };

export type BondingCurveProps = EncodeBondingCurveProps | ParseBondingCurveProps;

export type ComputeExponentialProps = EncodeExponentialParam & {
  supply: number;
};

export type ComputeLinearProps = EncodeLinearParam & {
  supply: number;
};

export type ComputeBondingCurveProps = {
  type: BondingCurveType;
  param: EncodeBondingCurveParam;
  supply: number;
};

export type GenerateExponentialChartProps = ComputeExponentialProps & {
  start?: number;
  count?: number;
  end?: number;
};

export type BondingCurveChartItem = { supply: number; price: number; tvl: number; marketCap: number };
export type BondingCurveChart = BondingCurveChartItem[];

export type GenerateLinearChartProps = ComputeLinearProps & {
  count?: number;
  start?: number;
  end?: number;
};

export type GenerateBondingCurveChartProps = {
  type: BondingCurveType;
  param: EncodeBondingCurveParam;
  supply: number;
  start?: number;
  end?: number;
  count?: number;
};
