const path = require('path');

module.exports = {
    entry: './dist/out-tsc/script.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
