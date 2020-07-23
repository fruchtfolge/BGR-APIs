import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  // browser-friendly (minified) UMD build
  {
    input: 'index.js',
    external: [
      '@turf/turf',
      'node-fetch'
    ],
    output: {
      name: 'bgr',
      file: pkg.browser,
      format: 'umd',
      globals: {
        '@turf/turf': 'turf',
        'node-fetch': 'fetch'
      }
    },
    plugins: [
      resolve(),
      // commonjs(),
      terser()
    ]
  },
  {
    input: 'index.js',
    external: [
      '@turf/turf',
      'node-fetch'
    ],
    output: {
      name: 'bgr',
      file: pkg.amd,
      format: 'amd',
      globals: {
        '@turf/turf': 'turf',
        'node-fetch': 'fetch'
      }
    },
    plugins: [
      resolve(),
      // commonjs(),
      terser()
    ]
  },
  // node js and module version
  {
    input: 'index.js',
    external: [
      'node-fetch',
      'dom-parser',
      '@turf/turf'
    ],
    output: [{
      file: pkg.main,
      format: 'cjs',
      exports: 'default'
    },
    {
      file: pkg.module,
      format: 'es'
    }
    ]
  }
]