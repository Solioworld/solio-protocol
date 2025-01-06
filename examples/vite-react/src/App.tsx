// import viteLogo from '/vite.svg';
// import reactLogo from './assets/react.svg';
import './App.css';
import BondingCurve from './components/bonding-curve';
import Erc20 from './components/erc20';
import Factory from './components/factory';
import MixedToken from './components/mixed-token';
import Router from './components/router';

function App() {
  return (
    <>
      <h1>Vite + React + Matcha css</h1>
      <div>
        <a href="#bonding-curve">Bonding-Curve</a> * <a href="#erc20">Erc20</a> * <a href="#factory">Factory</a> *{' '}
        <a href="#mixed-token">Mixed Token</a> * <a href="#router">Router</a>
      </div>
      {/* bonding-curve */}
      <div id="bonding-curve">
        <BondingCurve />
      </div>
      {/* erc20 */}
      <div id="erc20">
        <Erc20 />
      </div>
      {/* factory */}
      <div id="factory">
        <Factory />
      </div>
      {/* mixed-token */}
      <div id="mixed-token">
        <MixedToken />
      </div>
      {/* router */}
      <div id="router">
        <Router />
      </div>
    </>
  );
}

export default App;
