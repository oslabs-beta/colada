import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import ts from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  external: [
    '@vue/devtools-api',
    'lodash',
    'lodash/debounce',
    'lodash/clonedeep',
    'lodash/isempty',
  ],
  plugins: [
    resolve(),
    commonjs(),
    ts({
      check: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationMap: true,
        },
        exclude: ['__tests__'],
      },
    }),
  ],
  output: {
    file: 'dist/colada-plugin.esm.js',
    format: 'es',
  },
};
