import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],

  framework: {
    name: '@storybook/angular',
    options: {
      builder: {
        useBrowserTarget: 'finui-design-system:build',
      },
    },
  },

  docs: {
    autodocs: true
  }
};

export default config;
