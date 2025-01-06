export const bondingCurveAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'BondingCurveType',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'daoTokenAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'daoTokenCurrentSupply',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'parameters', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'calculateBurnAmountFromBondingCurve',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: 'nativeTokenAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nativeTokenAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'daoTokenCurrentSupply',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'parameters', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'calculateMintAmountFromBondingCurve',
    outputs: [
      { name: 'daoTokenAmount', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'daoTokenCurrentSupply',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'parameters', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'price',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
] as const;
