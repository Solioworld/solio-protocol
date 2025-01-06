# @solio/react-sdk

- bonding react sdk

## Installation

```bash
pnpm add @solio/react-sdk
```

## Usage

- a simple example of using the `useVisible` hook

```tsx
import { useVisible } from '@solio/react-sdk';

const MyComponent = () => {
  const isVisible = useVisible();
  return (
    <div>
      {isVisible ? 'Visible' : 'Not visible'}
    </div>
  );
};
```

## developers

```bash
pnpm install
pnpm dev
```
