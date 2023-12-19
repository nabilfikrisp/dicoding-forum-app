import MyButton from '@/components/MyButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button',
  component: MyButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    isLoading: { control: 'boolean' },
  },
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Danger: Story = {
  args: {
    children: 'Button',
    variant: 'destructive',
  },
};

export const ButtonAsLink: Story = {
  args: {
    children: 'Button',
    variant: 'link',
  },
};

export const LoadingState: Story = {
  args: {
    isLoading: true,
    children: 'Button',
    variant: 'default',
  },
};

export const CustomLoadingText: Story = {
  args: {
    isLoadingText: 'This is custom...',
    isLoading: true,
    children: 'Button',
    variant: 'default',
  },
};
