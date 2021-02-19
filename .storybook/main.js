module.exports = {
  stories: [
    '../src/**/*.stories.@(ts|tsx|js|jsx)',
    '../src/**/**/*.stories.@(ts|tsx|js|jsx)',
    '../src/**/**/**/*.stories.@(ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
    '@storybook/preset-create-react-app'
  ]
};
