import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    buttonType: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'quit'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fontSize: {
      control: false,
    },
    onClick: { action: 'clicked' },
  },
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'initial',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    buttonType: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    buttonType: 'secondary',
  },
};

export const Quit: Story = {
  args: {
    children: 'Quit Button',
    buttonType: 'quit',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    buttonType: 'primary',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    buttonType: 'primary',
    isLoading: true,
  },
};
