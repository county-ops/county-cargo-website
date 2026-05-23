
process.env.NODE_ENV = 'development';
require('dotenv').config({ path: '.env.local' });

require('ts-node').register({
    compilerOptions: {
        module: 'commonjs',
        // Allow importing JSON files
        resolveJsonModule: true,
        esModuleInterop: true,
    }
});

// We need to set the base URL to allow for absolute path imports
const tsConfigPaths = require('tsconfig-paths');
const tsConfig = require('./tsconfig.json');

tsConfigPaths.register({
    baseUrl: tsConfig.compilerOptions.baseUrl,
    paths: tsConfig.compilerOptions.paths,
});


require('./src/lib/temp_upload.ts');
