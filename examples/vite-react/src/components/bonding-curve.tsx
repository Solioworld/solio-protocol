import {
  BondingCurveGetBurnAmountProps,
  BondingCurveGetMintAmountProps,
  type BondingCurveProps,
  ParseExponentialParam,
  ParseLinearParam,
  bondingCurve,
  formatSafeToString,
} from '@solio/core';
import { useState } from 'react';
import { Address, parseEther, zeroAddress } from 'viem';
import { readClient } from '../constant';

export const BondingCurve = () => {
  const [address, setAddress] = useState<Address>('' as Address);
  const [type, setType] = useState<BondingCurveProps['type']>('linear');
  const [param, setParam] = useState<BondingCurveProps['param']>({} as BondingCurveProps['param']);
  const [raisingAmount, setRaisingAmount] = useState('');
  const [mixedTokenAmount, setMixedTokenAmount] = useState('');
  const [result, setResult] = useState<string>();

  const handleGetMintAmount = async () => {
    const result = await bondingCurve.read.getMintAmount(readClient, {
      address,
      type,
      param,
      raisingAmount: parseEther(raisingAmount),
    } as BondingCurveGetMintAmountProps);
    setResult(formatSafeToString(result));
  };

  const handleGetBurnAmount = async () => {
    const result = await bondingCurve.read.getBurnAmount(readClient, {
      address,
      type,
      param,
      mixedTokenAmount: parseEther(mixedTokenAmount),
    } as BondingCurveGetBurnAmountProps);
    setResult(formatSafeToString(result));
  };

  const typeOptions = [
    { value: 'linear', label: 'Linear' },
    { value: 'exponential', label: 'Exponential' },
  ];

  const getParamInput = () => {
    switch (type) {
      case 'linear':
        return (
          <div>
            <label>
              initPrice:
              <input
                type="number"
                value={(param as ParseLinearParam).initPrice}
                onChange={(e) =>
                  setParam({
                    ...(param as ParseLinearParam),
                    initPrice: Number(e.target.value),
                  })
                }
              />
            </label>
            <label>
              finalPrice:
              <input
                type="number"
                value={(param as ParseLinearParam).finalPrice}
                onChange={(e) =>
                  setParam({
                    ...param,
                    finalPrice: Number(e.target.value),
                  } as BondingCurveProps['param'])
                }
              />
            </label>
            <label>
              Final Supply:
              <input
                type="number"
                value={(param as ParseLinearParam).finalSupply}
                onChange={(e) =>
                  setParam({
                    ...param,
                    finalSupply: Number(e.target.value),
                  } as BondingCurveProps['param'])
                }
              />
            </label>
          </div>
        );
      case 'exponential':
        return (
          <div>
            <label>
              aValue:
              <input
                type="number"
                value={(param as ParseExponentialParam).aValue}
                onChange={(e) =>
                  setParam({
                    ...param,
                    aValue: Number(e.target.value),
                  } as ParseExponentialParam)
                }
              />
            </label>

            <label>
              initPrice:
              <input
                type="number"
                value={(param as ParseExponentialParam).initPrice}
                onChange={(e) =>
                  setParam({
                    ...param,
                    initPrice: Number(e.target.value),
                  } as ParseExponentialParam)
                }
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Bonding Curve Contract</h2>
      <label>
        Contract Address:
        <input
          type="text"
          placeholder={zeroAddress}
          maxLength={42}
          minLength={42}
          value={address}
          onChange={(e) => setAddress(e.target.value as Address)}
        />
      </label>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value as BondingCurveProps['type'])}>
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {getParamInput()}
      <label>
        Raising Amount:
        <input type="text" value={raisingAmount} onChange={(e) => setRaisingAmount(e.target.value)} />
        <button onClick={handleGetBurnAmount}>Get Burn Amount</button>
      </label>
      <label>
        Mixed Token Amount:
        <input type="text" value={mixedTokenAmount} onChange={(e) => setMixedTokenAmount(e.target.value)} />
        <button onClick={handleGetMintAmount}>Get Mint Amount</button>
      </label>

      <p>Result: {result}</p>
    </div>
  );
};

export default BondingCurve;
