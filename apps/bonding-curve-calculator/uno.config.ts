import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerAttributifyJsx,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import presetAnimations from 'unocss-preset-animations';
import presetAutoprefixer from 'unocss-preset-autoprefixer';
import { presetShadcn } from 'unocss-preset-shadcn';

export default defineConfig({
  // rules: [[/^p-header$/, () => ({ padding: `var(--h-header)` })]],
  presets: [
    presetUno(),
    presetAttributify(),
    presetAnimations(),
    presetTypography(),
    presetShadcn({
      color: {
        name: 'custom',
        base: 'violet',
      },
      darkSelector: '.dark',
      radius: 0.5,
    }),
    presetAutoprefixer(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup(), transformerAttributifyJsx()],
  content: { pipeline: { include: [/\.(tsx|mdx?|html)($|\?)/] } },
});
