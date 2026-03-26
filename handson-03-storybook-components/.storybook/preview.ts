import type { Preview } from '@storybook/angular';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F8FAFC' },
        { name: 'dark', value: '#1E293B' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
  },
};

export default preview;
