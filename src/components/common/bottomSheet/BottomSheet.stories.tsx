import type { Meta, StoryObj } from '@storybook/react';
import BottomSheet from './BottomSheet';

const meta = {
  title: 'Common/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: '바텀시트 내부에 표시될 내용',
      control: 'text',
    },
    minHeight: {
      description: '바텀시트의 최소 높이 (vh 단위)',
      control: { type: 'range', min: 10, max: 100, step: 5 },
      defaultValue: 30,
    },
    maxHeight: {
      description: '바텀시트의 최대 높이 (vh 단위)',
      control: { type: 'range', min: 10, max: 100, step: 5 },
      defaultValue: 90,
    },
    initialHeight: {
      description: '바텀시트의 초기 높이 (vh 단위)',
      control: { type: 'range', min: 10, max: 100, step: 5 },
      defaultValue: 50,
    },
    headerHeight: {
      description: '바텀시트 헤더의 높이 (px 단위)',
      control: { type: 'number', min: 20, max: 100, step: 1 },
      defaultValue: 32,
    },
    isTime: {
      description: '시간 선택기 스타일 적용 여부',
      control: 'boolean',
      defaultValue: false,
    },
    onHeightChange: {
      description: '바텀시트 높이가 변경될 때 호출되는 콜백 함수',
      action: 'height changed',
    },
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4">
        <h2 className="mb-4 text-lg font-bold">Bottom Sheet Content</h2>
        <p>This is a sample content for the bottom sheet.</p>
        <div className="space-y-4">
          <div className="h-20 rounded-lg bg-gray-light" />
          <div className="h-20 rounded-lg bg-gray-light" />
          <div className="h-20 rounded-lg bg-gray-light" />
        </div>
      </div>
    ),
    minHeight: 30,
    maxHeight: 90,
    initialHeight: 50,
    headerHeight: 32,
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 바텀시트 컴포넌트입니다. 사용자 정의 콘텐츠를 표시할 수 있으며, 드래그하여 높이를 조절할 수 있습니다.',
      },
    },
  },
};

export const TimePicker: Story = {
  args: {
    children: (
      <div className="p-4">
        <h2 className="mb-4 text-lg font-bold">Time Picker</h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full h-12 rounded-lg bg-white-default" />
          <div className="w-full h-12 rounded-lg bg-white-default" />
          <div className="w-full h-12 rounded-lg bg-white-default" />
        </div>
      </div>
    ),
    minHeight: 30,
    maxHeight: 90,
    initialHeight: 50,
    headerHeight: 32,
    isTime: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '시간 캘린더 선택용 바텀시트 컴포넌트입니다. 회색 배경으로 캘린더, 날짜별 투표인원이 표시됩니다.',
      },
    },
  },
};
