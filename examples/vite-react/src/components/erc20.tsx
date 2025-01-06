import { erc20, formatSafeToString } from '@solio/core';
import { useState } from 'react';
import { Address, parseEther } from 'viem';
import { readClient, writeClient } from '../constant';

export const Erc20 = () => {
  const [account, setAccount] = useState<Address>('' as Address);
  const [address, setAddress] = useState<Address>('' as Address);
  const [amount, setAmount] = useState('');
  const [spender, setSpender] = useState<Address>('' as Address);
  const [result, setResult] = useState('');

  const handleGetBalanceOf = async () => {
    const result = await erc20.read.getBalanceOf(readClient, {
      account,
    });
    setResult(formatSafeToString(result));
  };

  const handleGetAllowance = async () => {
    const result = await erc20.read.getAllowance(readClient, {
      account,
      spender,
      address,
    });
    setResult(formatSafeToString(result));
  };

  const handleCheckAndApprove = async () => {
    const result = await erc20.write.checkAndApprove(writeClient, {
      account,
      spender,
      address,
      amount: parseEther(amount),
    });
    setResult(formatSafeToString(result));
  };

  const handleApprove = async () => {
    const result = await erc20.write.approve(writeClient, {
      account,
      spender,
      address,
      amount: parseEther(amount),
    });
    setResult(formatSafeToString(result));
  };

  return (
    <div>
      <h2>ERC20 Contract</h2>
      <form>
        <label>
          Account:
          <input type="text" value={account} onChange={(e) => setAccount(e.target.value as Address)} />
        </label>

        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value as Address)} />
        </label>

        <label>
          Amount:
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>

        <label>
          Spender:
          <input type="text" value={spender} onChange={(e) => setSpender(e.target.value as Address)} />
        </label>
        <button onClick={handleGetBalanceOf}>Get Balance Of</button>
        <button onClick={handleGetAllowance}>Get Allowance</button>
        <button onClick={handleCheckAndApprove}>Check And Approve</button>
        <button onClick={handleApprove}>Approve</button>
      </form>
      <div>
        <p>Result: {result}</p>
      </div>
    </div>
  );
};

export default Erc20;
