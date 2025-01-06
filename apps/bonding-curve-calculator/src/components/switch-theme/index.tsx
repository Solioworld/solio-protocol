import useTheme from '@/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';

const SwitchTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}>
      {theme == 'dark' && <Sun className="size-3 cursor-pointer" />}
      {theme == 'light' && <Moon className="size-3 cursor-pointer" />}
    </Button>
  );
};

export default SwitchTheme;
