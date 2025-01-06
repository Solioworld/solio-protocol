import Curve from './components/curve';
import SwitchTheme from './components/switch-theme';

const App = () => {
  return (
    <>
      <header className="sticky top-0 z-10 w-full border-b backdrop-blur h-14 px-2 md:h-18">
        <div className="container mx-auto h-full flex items-center justify-between">
          <h1 className="font-bold text-xl md:text-2xl">Bonding Curve Calculator</h1>
          <SwitchTheme />
        </div>
      </header>
      <Curve />
      <footer className="container mx-auto text-center text-sm h-10 leading-10 text-secondary-foreground">
        @{new Date().getFullYear()} Bonding labs
      </footer>
    </>
  );
};

export default App;
