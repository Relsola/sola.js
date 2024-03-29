import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

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
