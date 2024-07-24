import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';


export default {
	input: 'dist/index.js',
	output: {
    dir: 'bundle',
		format: 'es'
	},
  external: [
    'path', 'fs', 'vm', 'punycode', 'buffer', 'string_decoder',
    'events', 'util', 'os', 'crypto', 'http', 'child_process',
    'https', 'net', 'tls', 'tty', 'url', 'assert', 'stream', 'zlib'
  ],
  context: 'global',
  plugins: [
    commonjs(),
    resolve(),
    json()
  ]
};
