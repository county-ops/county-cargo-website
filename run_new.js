process.env.NODE_ENV = 'development';
require('dotenv').config({ path: '.env.local' });

require('ts-node').register({
    compilerOptions: {
        module: 'commonjs'
    }
});
require('./src/lib/upload_new.ts');
