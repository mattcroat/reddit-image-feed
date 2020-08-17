// @ts-check
const preactRefresh = require('@prefresh/vite');
const path = require('path');

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: 'preact',
  plugins: [preactRefresh()],
  alias: {
    '/@components/': path.resolve(__dirname, './src/components'),
    '/@css/': path.resolve(__dirname, './src/css'),
    '/@hooks/': path.resolve(__dirname, './src/hooks'),
    '/@utility/': path.resolve(__dirname, './src/utility'),
  },
};

module.exports = config;
