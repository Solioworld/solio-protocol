import { formatSafeToString, mixedToken } from '@solio/core';
import { useState } from 'react';
import { Address, type WriteContractErrorType, parseEther } from 'viem';
import { readClient, writeClient } from '../constant';

export const MixedToken = () => {
  const [address, setAddress] = useState<Address>('' as Address);
  const [raisingAddress, setRaisingAddress] = useState<Address>('' as Address);
  const [raisingAmount, setRaisingAmount] = useState('');
  const [minMixedTokenAmount, setMinMixedTokenAmount] = useState('');
  const [result, setResult] = useState('');

  const getRaisingToken = async () => {
    try {
      const result = await mixedToken.read.getRaisingToken(readClient, {
        address,
      });
      setResult(formatSafeToString(result));
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('getRaisingToken error', err.name);
    }
  };

  const getAdmin = async () => {
    try {
      const result = await mixedToken.read.getAdmin(readClient, {
        address,
      });
      setResult(formatSafeToString(result));
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('getAdmin error', err.name);
    }
  };

  const getMetadata = async () => {
    try {
      const result = await mixedToken.read.getMetadata(readClient, {
        address,
      });
      setResult(formatSafeToString(result));
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('getMetadata error', err.name);
    }
  };

  const getTaxRate = async () => {
    try {
      const result = await mixedToken.read.getTaxRate(readClient, {
        address,
      });
      setResult(`Mint Tax: ${result.mintTax}, Burn Tax: ${result.burnTax}`);
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('getTaxRate error', err.name);
    }
  };

  const getTreasury = async () => {
    try {
      const result = await mixedToken.read.getTreasury(readClient, {
        address,
      });
      setResult(formatSafeToString(result));
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('getTreasury error', err.name);
    }
  };

  const getEstimateMint = async () => {
    try {
      const result = await mixedToken.read.getEstimateMint(readClient, {
        address,
        raisingAmount: parseEther(raisingAmount),
      });
      setResult(formatSafeToString(result.mixedTokenAmount));
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('getEstimateMint error', err.name);
    }
  };

  const getEstimateBurn = async () => {
    try {
      const result = await mixedToken.read.getEstimateBurn(readClient, {
        address,
        mixedTokenAmount: parseEther(minMixedTokenAmount),
      });
      setResult(formatSafeToString(result.raisingAmount));
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('getEstimateBurn error', err.name);
    }
  };

  const getEstimateMintNeed = async () => {
    try {
      const result = await mixedToken.read.getEstimateMintNeed(readClient, {
        address,
        mixedTokenAmount: parseEther(minMixedTokenAmount),
      });
      setResult(formatSafeToString(result.raisingAmount));
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('getEstimateMintNeed error', err.name);
    }
  };

  const mint = async () => {
    try {
      const result = await mixedToken.write.mint(writeClient, {
        address,
        raisingAmount: parseEther(raisingAmount),
        minMixedTokenAmount: parseEther(minMixedTokenAmount),
        raisingAddress,
      });
      setResult(formatSafeToString(result));
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('mint error', err.name);
    }
  };

  const burn = async () => {
    try {
      const result = await mixedToken.write.burn(writeClient, {
        address,
        minMixedTokenAmount: parseEther(minMixedTokenAmount),
        raisingAmount: parseEther(raisingAmount),
      });
      setResult(formatSafeToString(result));
    } catch (error: unknown) {
      const err = error as WriteContractErrorType;
      console.log('burn error', err.name);
    }
  };

  return (
    <div>
      <h2>Mixed Token Contract</h2>
      <input
        type="text"
        value={address}
        maxLength={42}
        minLength={42}
        onChange={(e) => setAddress(e.target.value as Address)}
        placeholder="Address"
      />
      <input
        type="text"
        value={raisingAddress}
        onChange={(e) => setRaisingAddress(e.target.value as Address)}
        placeholder="Raising Address"
      />
      <input
        type="text"
        value={raisingAmount}
        onChange={(e) => setRaisingAmount(e.target.value)}
        placeholder="Raising Amount"
      />
      <input
        type="text"
        value={minMixedTokenAmount}
        onChange={(e) => setMinMixedTokenAmount(e.target.value)}
        placeholder="Min Mixed Token Amount"
      />
      <button onClick={getRaisingToken}>Get Raising Token</button>
      <button onClick={getAdmin}>Get Admin</button>
      <button onClick={getMetadata}>Get Metadata</button>
      <button onClick={getTaxRate}>Get Tax Rate</button>
      <button onClick={getTreasury}>Get Treasury</button>
      <button onClick={getEstimateMint}>Get Estimate Mint</button>
      <button onClick={getEstimateBurn}>Get Estimate Burn</button>
      <button onClick={getEstimateMintNeed}>Get Estimate Mint Need</button>
      <button onClick={mint}>Mint</button>
      <button onClick={burn}>Burn</button>
      <p>Result: {result}</p>
    </div>
  );
};

export default MixedToken;
