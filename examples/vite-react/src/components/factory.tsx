import { MixedTokenParam, factory } from '@solio/core';
import { useState } from 'react';
import { Address, type WriteContractErrorType, formatUnits, zeroAddress } from 'viem';
import { readClient, writeClient } from '../constant';

export const Factory = () => {
  const [address, setAddress] = useState<Address>('' as Address);
  const [mixedTokenIndex, setMixedTokenIndex] = useState('');
  const [mixedToken, setMixedToken] = useState({
    type: '',
    bondingCurve: {
      type: '',
      param: {
        initPrice: 0,
        finalPrice: 0,
        finalSupply: 0,
      },
    },
    name: '',
    symbol: '',
    metadataUrl: '',
    raisingAddress: '',
    mintTaxRate: 0,
    burnTaxRate: 0,
    fastMintAmount: BigInt(0),
  });

  const handleReadGetRoute = async () => {
    const result = await factory.read.getRouter(readClient, { address });
    console.log(result);
  };

  const handleReadGetMixedTokenWithIndex = async () => {
    const result = await factory.read.getMixedTokenWithIndex(readClient, {
      address,
      mixedTokenIndex: BigInt(mixedTokenIndex),
    });
    console.log(result);
  };

  const handleWriteLaunchMixedToken = async () => {
    try {
      const result = await factory.write.launchMixedToken(writeClient, {
        address,
        mixedToken: mixedToken as MixedTokenParam,
      });
      console.log(result);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log(err.name);
    }
  };

  return (
    <div>
      <h2>Factory Contract</h2>

      <label>
        Address:
        <input
          type="text"
          value={address}
          placeholder={zeroAddress}
          maxLength={42}
          minLength={42}
          onChange={(e) => setAddress(e.target.value as Address)}
        />
      </label>

      <label>
        Mixed Token Index:
        <input type="text" value={mixedTokenIndex} onChange={(e) => setMixedTokenIndex(e.target.value)} />
      </label>

      <label>
        Mixed Token:
        <input type="text" value={mixedToken.type} onChange={(e) => setMixedToken({ ...mixedToken, type: e.target.value })} />
      </label>
      <label>
        Bonding Curve Type:
        <input
          type="text"
          value={mixedToken.bondingCurve.type}
          onChange={(e) =>
            setMixedToken({
              ...mixedToken,
              bondingCurve: {
                ...mixedToken.bondingCurve,
                type: e.target.value,
              },
            })
          }
        />
      </label>
      <label>
        Init Price:
        <input
          type="number"
          value={mixedToken.bondingCurve.param.initPrice}
          onChange={(e) =>
            setMixedToken({
              ...mixedToken,
              bondingCurve: {
                ...mixedToken.bondingCurve,
                param: {
                  ...mixedToken.bondingCurve.param,
                  initPrice: parseInt(e.target.value),
                },
              },
            })
          }
        />
      </label>
      <label>
        Final Price:
        <input
          type="number"
          value={mixedToken.bondingCurve.param.finalPrice}
          onChange={(e) =>
            setMixedToken({
              ...mixedToken,
              bondingCurve: {
                ...mixedToken.bondingCurve,
                param: {
                  ...mixedToken.bondingCurve.param,
                  finalPrice: parseInt(e.target.value),
                },
              },
            })
          }
        />
      </label>
      <label>
        Supply:
        <input
          type="number"
          value={mixedToken.bondingCurve.param.finalSupply}
          onChange={(e) =>
            setMixedToken({
              ...mixedToken,
              bondingCurve: {
                ...mixedToken.bondingCurve,
                param: {
                  ...mixedToken.bondingCurve.param,
                  finalSupply: parseInt(e.target.value),
                },
              },
            })
          }
        />
      </label>
      <label>
        Name:
        <input type="text" value={mixedToken.name} onChange={(e) => setMixedToken({ ...mixedToken, name: e.target.value })} />
      </label>
      <label>
        Symbol:
        <input
          type="text"
          value={mixedToken.symbol}
          onChange={(e) => setMixedToken({ ...mixedToken, symbol: e.target.value })}
        />
      </label>
      <label>
        Metadata URL:
        <input
          type="text"
          value={mixedToken.metadataUrl}
          onChange={(e) => setMixedToken({ ...mixedToken, metadataUrl: e.target.value })}
        />
      </label>
      <label>
        Raising Address:
        <input
          type="text"
          value={mixedToken.raisingAddress}
          onChange={(e) => setMixedToken({ ...mixedToken, raisingAddress: e.target.value })}
        />
      </label>
      <label>
        Mint Tax Rate:
        <input
          type="number"
          value={mixedToken.mintTaxRate}
          onChange={(e) =>
            setMixedToken({
              ...mixedToken,
              mintTaxRate: parseInt(e.target.value),
            })
          }
        />
      </label>
      <label>
        Burn Tax Rate:
        <input
          type="number"
          value={mixedToken.burnTaxRate}
          onChange={(e) =>
            setMixedToken({
              ...mixedToken,
              burnTaxRate: parseInt(e.target.value),
            })
          }
        />
      </label>
      <label>
        Fast Mint Amount:
        <input
          type="number"
          value={formatUnits(mixedToken.fastMintAmount, 18)}
          onChange={(e) =>
            setMixedToken({
              ...mixedToken,
              fastMintAmount: BigInt(e.target.value),
            })
          }
        />
      </label>

      <div>
        <button onClick={handleReadGetRoute}>Get Route</button>
        <button onClick={handleReadGetMixedTokenWithIndex}>Get Mixed Token With Index</button>
        <button onClick={handleWriteLaunchMixedToken}>Launch Mixed Token</button>
      </div>
    </div>
  );
};

export default Factory;
