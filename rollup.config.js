const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const postcss = require('rollup-plugin-postcss');

module.exports = [
	{
		input: './packages/index.ts',
		output: [
			{
				dir: 'lib',
				format: 'cjs',
				entryFileNames: '[name].cjs.js',
				sourcemap: false
			},
			{
				dir: 'lib',
				format: 'esm',
				entryFileNames: '[name].esm.js',
				sourcemap: false
			},
			{
				dir: 'lib',
				format: 'umd',
				entryFileNames: '[name].umd.js',
				name: '$S',
				sourcemap: false,
				plugins: [terser()]
			}
		],
		plugins: [
			postcss({
				minimize: true,
				extensions: ['.css'],
				extract: true
			}),
			resolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				compilerOptions: {
					incremental: false
				}
			})
		]
	}
];
