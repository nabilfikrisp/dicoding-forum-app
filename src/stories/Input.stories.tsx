import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      options: ['text', 'email', 'password', 'file', 'checkbox'],
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Default input',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Email input',
    defaultValue: 'email@gmail.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
    defaultValue: '1233456',
  },
};
