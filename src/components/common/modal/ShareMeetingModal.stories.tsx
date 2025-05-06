import type { Meta, StoryObj } from '@storybook/react';
import ShareMeetingModal from './ShareMeetingModal';
import { useEffect } from 'react';

const TEST_STORAGE_KEY = 'storybookSelectedRoomId';

const meta = {
  title: 'Common/Modal/ShareMeetingModal',
  component: ShareMeetingModal,
  tags: ['autodocs'],
  argTypes: {
    onClose: {
      description: '모달을 닫을 때 호출되는 함수',
      action: 'closed',
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        // 테스트용 localStorage 설정
        localStorage.setItem(TEST_STORAGE_KEY, 'testRoomId');
        return () => {
          localStorage.removeItem(TEST_STORAGE_KEY);
        };
      }, []);

      return <Story />;
    },
  ],
} satisfies Meta<typeof ShareMeetingModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          '모임 공유 모달의 기본 디자인입니다. 카카오톡 공유, 이메일 공유, URL 복사 기능이 포함되어 있습니다.',
      },
    },
  },
};
