import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default [
	{
		input: './packages/index.ts',
		output: [
			{
				dir: 'lib',
				format: 'cjs',
				entryFileNames: 'index.cjs.js',
				sourcemap: false
			},
			{
				dir: 'lib',
				format: 'esm',
				entryFileNames: 'index.esm.js',
				sourcemap: false
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
