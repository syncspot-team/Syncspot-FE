import type { Meta, StoryObj } from '@storybook/react';
import KakaoLocationPicker from './KakaoLocationPicker';

const meta = {
  title: 'Common/KakaoLocationPicker',
  component: KakaoLocationPicker,
  tags: ['autodocs'],
  argTypes: {
    InputClassName: {
      description: '입력 필드에 적용할 추가 스타일 클래스',
      control: 'text',
    },
    defaultAddress: {
      description: '기본으로 표시될 주소',
      control: 'text',
    },
    usePortal: {
      description: '주소 자동완성 목록을 Portal로 렌더링할지 여부',
      control: 'boolean',
      defaultValue: true,
    },
    onSelect: {
      description: '장소가 선택되었을 때 호출되는 콜백 함수',
      action: 'selected',
    },
  },
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'initial',
    },
  },
} satisfies Meta<typeof KakaoLocationPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultAddress: '',
    usePortal: true,
    InputClassName:
      'w-[20.375rem] bg-white-default focus:ring-1 focus:ring-gray-normal',
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 카카오 장소 검색 컴포넌트입니다. 장소를 검색하고 선택할 수 있습니다. 내 주소를 설정할 수 있습니다.',
      },
    },
    backgrounds: {
      default: 'gray',
      values: [
        {
          name: 'gray',
          value: '#F3F4F6',
        },
      ],
    },
  },
};

export const DefaultAddress: Story = {
  args: {
    defaultAddress: '서울특별시 강남구 테헤란로 427',
    usePortal: true,
    InputClassName:
      'w-[20.375rem] focus:ring-1 focus:ring-gray-normal bg-white-default ',
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 주소가 설정된 카카오 장소 검색 컴포넌트입니다. 초기 상태에서 주소가 표시됩니다. 수정이 가능합니다.',
      },
    },
    backgrounds: {
      default: 'gray',
      values: [
        {
          name: 'gray',
          value: '#F3F4F6',
        },
      ],
    },
  },
};

export const WithoutPortal: Story = {
  args: {
    defaultAddress: '',
    usePortal: false,
    InputClassName:
      'w-[20.375rem] focus:ring-1 focus:ring-gray-normal bg-white-default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Portal을 사용하지 않는 카카오 장소 검색 컴포넌트입니다. 주소 자동완성 목록이 컴포넌트 내부에 absolute로 렌더링됩니다.',
      },
    },
    backgrounds: {
      default: 'gray',
      values: [
        {
          name: 'gray',
          value: '#F3F4F6',
        },
      ],
    },
  },
};
