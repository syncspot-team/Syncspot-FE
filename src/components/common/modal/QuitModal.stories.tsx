import type { Meta, StoryObj } from '@storybook/react';
import QuitModal from './QuitModal';

const meta = {
  title: 'Common/Modal/QuitModal',
  component: QuitModal,
  tags: ['autodocs'],
  argTypes: {
    onConfirm: {
      description: '탈퇴 확인 시 호출되는 함수',
      action: 'confirmed',
    },
    onClose: {
      description: '아니오 버튼으로 모달을 닫을 때 호출되는 함수',
      action: 'closed',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '회원 탈퇴 모달의 디자인입니다.',
      },
    },
  },
} satisfies Meta<typeof QuitModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onConfirm: () => {},
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '회원 탈퇴 모달의 디자인입니다.',
      },
    },
  },
};
