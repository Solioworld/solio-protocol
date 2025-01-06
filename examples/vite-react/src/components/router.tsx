import { router } from '@solio/core';
import { useState } from 'react';
import { Address, parseEther } from 'viem';
import { readClient, writeClient } from '../constant';

const Router = () => {
  const [factoryAddress, setFactoryAddress] = useState<Address>('' as Address);
  const [receiveAmount, setReceiveAmount] = useState('');
  const [raisingAmount, setRaisingAmount] = useState('');
  const [result, setResult] = useState('');

  const [mixedTokenIndex, setMixedTokenIndex] = useState('');
  const [minMixedTokenAmount, setMinMixedTokenAmount] = useState('');
  const [routerAddress, setRouterAddress] = useState<Address>('' as Address);
  const [raisingToken, setRaisingToken] = useState<Address>('' as Address);
  const [payAddress, setPayAddress] = useState<Address>('' as Address);
  const [payIndex, setPayIndex] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [receiveAddress, setReceiveAddress] = useState<Address>('' as Address);
  const [receiveIndex, setReceiveIndex] = useState('');
  const [minReceiveAmount, setMinReceiveAmount] = useState('');

  const handleGetFactory = async () => {
    const result = await router.read.getFactory(readClient, {
      address: routerAddress,
    });
    setFactoryAddress(result.toLowerCase() as Address);
  };

  const handleGetAmountOut = async () => {
    const result = await router.read.getAmountOut(readClient, {
      address: routerAddress,
      payAddress,
      receiveAddress,
      payAmount: parseEther(payAmount),
    });
    setReceiveAmount(result.receiveAmount.toString());
    setRaisingAmount(result.raisingAmount.toString());
  };

  const handleMint = async () => {
    const result = await router.write.mint(writeClient, {
      address: routerAddress,
      raisingToken,
      raisingAmount: parseEther(raisingAmount),
      mixedTokenIndex: BigInt(mixedTokenIndex),
      minMixedTokenAmount: parseEther(minMixedTokenAmount),
    });
    setResult(result);
  };

  const handleSwap = async () => {
    const result = await router.write.swap(writeClient, {
      address: routerAddress,
      raisingToken,
      payAddress,
      payIndex: BigInt(payIndex),
      payAmount: parseEther(payAmount),
      receiveAddress,
      receiveIndex: BigInt(receiveIndex),
      minReceiveAmount: parseEther(minReceiveAmount),
    });
    setResult(result);
  };

  return (
    <div>
      <h2>Router Contract</h2>
      <input
        type="text"
        value={routerAddress}
        onChange={(e) => setRouterAddress(e.target.value as Address)}
        placeholder="Router Address"
      />
      <input
        type="text"
        value={raisingToken}
        onChange={(e) => setRaisingToken(e.target.value as Address)}
        placeholder="Raising Token"
      />
      <input
        type="text"
        value={raisingToken}
        onChange={(e) => setMixedTokenIndex(e.target.value as Address)}
        placeholder="Mixed Token Index"
      />
      <input
        type="text"
        value={raisingToken}
        onChange={(e) => setMinMixedTokenAmount(e.target.value as Address)}
        placeholder="Min Mixed Token Amount"
      />
      <input
        type="text"
        value={payAddress}
        onChange={(e) => setPayAddress(e.target.value as Address)}
        placeholder="Pay Address"
      />
      <input type="text" value={payIndex} onChange={(e) => setPayIndex(e.target.value)} placeholder="Pay Index" />
      <input type="text" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} placeholder="Pay Amount" />
      <input
        type="text"
        value={receiveAddress}
        onChange={(e) => setReceiveAddress(e.target.value as Address)}
        placeholder="Receive Address"
      />
      <input type="text" value={receiveIndex} onChange={(e) => setReceiveIndex(e.target.value)} placeholder="Receive Index" />
      <input
        type="text"
        value={minReceiveAmount}
        onChange={(e) => setMinReceiveAmount(e.target.value)}
        placeholder="Min Receive Amount"
      />
      <button onClick={handleGetFactory}>Get Factory</button>
      <button onClick={handleGetAmountOut}>Get Amount Out</button>
      <button onClick={handleMint}>Mint</button>
      <button onClick={handleSwap}>Swap</button>
      <p>Factory Address: {factoryAddress}</p>
      <p>Receive Amount: {receiveAmount}</p>
      <p>Raising Amount: {raisingAmount}</p>
      <p>Result: {result}</p>
    </div>
  );
};

export default Router;
