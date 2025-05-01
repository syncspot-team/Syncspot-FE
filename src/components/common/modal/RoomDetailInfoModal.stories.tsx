import type { Meta, StoryObj } from '@storybook/react';
import RoomDetailInfoModal from './RoomDetailInfoModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const mockRoomDetailInfo = {
  '1': {
    data: {
      name: '테스트 방',
      memo: '',
      memberCount: 2,
      emails: ['test1@example.com', 'test2@example.com'],
    },
  },
  '2': {
    data: {
      name: '긴 메모가 있는 방',
      memo: '이 메모를 통해 방의 목적이나 특별한 규칙 등을 알 수 있습니다.',
      memberCount: 5,
      emails: ['user1@example.com', 'user2@example.com'],
    },
  },
  '3': {
    data: {
      name: '많은 모임 참여 인원이 있는 방',
      memo: '많은 모임 참여 인원을 표시하고 있습니다.',
      memberCount: 10,
      emails: Array.from(
        { length: 10 },
        (_, i) => `member${i + 1}@example.com`,
      ),
    },
  },
};

const meta = {
  title: 'Common/Modal/RoomDetailInfoModal',
  component: RoomDetailInfoModal,
  tags: ['autodocs'],
  argTypes: {
    room: {
      description: '방 정보',
      control: 'object',
    },
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
      queryClient.setQueryData(
        ['roomDetailInfo', '1'],
        mockRoomDetailInfo['1'],
      );
      queryClient.setQueryData(
        ['roomDetailInfo', '2'],
        mockRoomDetailInfo['2'],
      );
      queryClient.setQueryData(
        ['roomDetailInfo', '3'],
        mockRoomDetailInfo['3'],
      );

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof RoomDetailInfoModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    room: {
      roomId: '1',
      roomName: '테스트 방',
    },
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '방 상세 정보 모달의 기본 디자인입니다.',
      },
    },
  },
};

export const LongMemo: Story = {
  args: {
    room: {
      roomId: '2',
      roomName: '긴 메모가 있는 방',
    },
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '긴 메모가 있는 방 상세 정보 모달입니다.',
      },
    },
  },
};

export const ManyMembers: Story = {
  args: {
    room: {
      roomId: '3',
      roomName: '많은 모임 참여 인원이 있는 방',
    },
    onClose: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '많은 모임 참여 인원이 있는 방 상세 정보 모달입니다.',
      },
    },
  },
};
