import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      presets: ['@babel/preset-flow'],
      babelHelpers: 'bundled',
    }),
    nodeResolve({}),
    commonjs(),
    terser({ mangle: false }),
  ],
};
