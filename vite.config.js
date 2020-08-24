// @ts-check
// eslint-disable-next-line
const reactPlugin = require('vite-plugin-react');
const path = require('path');

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: 'react',
  plugins: [reactPlugin],
  alias: {
    '/@components/': path.resolve(__dirname, './src/components'),
    '/@css/': path.resolve(__dirname, './src/css'),
    '/@hooks/': path.resolve(__dirname, './src/hooks'),
    '/@utilities/': path.resolve(__dirname, './src/utilities'),
    '/@api/': path.resolve(__dirname, './src/api'),
  },
};

module.exports = config;
