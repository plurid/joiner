// #region imports
    // #region libraries
    import resolve from '@rollup/plugin-node-resolve';
    import external from 'rollup-plugin-peer-deps-external';
    import commonjs from '@rollup/plugin-commonjs';
    import sourceMaps from 'rollup-plugin-sourcemaps';
    import typescript from 'rollup-plugin-typescript2';
    // #endregion libraries
// #endregion imports



// #region module
const pkg = require('../package.json');

const globals = {
    'commander': 'program',
};

const build =  {
    input: `source/index.ts`,
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            globals,
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            globals,
            sourcemap: true,
        },
    ],
    external: [
        'child_process',
        'path',
        'fs',
        'http',
    ],
    watch: {
        include: 'source/**',
    },
    plugins: [
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        external({
            includeDependencies: true,
        }),
        resolve({
            preferBuiltins: true,
        }),
        commonjs(),
        sourceMaps(),
    ],
};
// #endregion module



// #region exports
export default build;
// #endregion exports
