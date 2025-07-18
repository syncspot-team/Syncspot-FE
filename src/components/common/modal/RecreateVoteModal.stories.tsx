import type { Meta, StoryObj } from '@storybook/react';
import RecreateVoteModal from './RecreateVoteModal';

const meta = {
  title: 'Common/Modal/RecreateVoteModal',
  component: RecreateVoteModal,
  tags: ['autodocs'],
  argTypes: {
    onConfirm: {
      description: '새 투표 생성 확인 시 호출되는 함수',
      action: 'confirmed',
    },
    onClose: {
      description: '아니오 버튼으로 모달을 닫을 때 호출되는 함수',
      action: 'closed',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RecreateVoteModal>;

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
        story:
          '기존의 데이터를 삭제하고 새로운 투표를 생성을 재확인하는 모달의 디자인입니다.',
      },
    },
  },
};
