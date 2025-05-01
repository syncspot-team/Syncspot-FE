import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: '입력 필드의 타입',
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      defaultValue: 'text',
    },
    placeholder: {
      description: '입력 필드의 플레이스홀더 텍스트',
      control: 'text',
    },
    disabled: {
      description: '입력 필드 비활성화 여부',
      control: 'boolean',
      defaultValue: false,
    },
    value: {
      description: '입력 필드의 값',
      control: 'text',
    },
    onChange: {
      description: '입력 값이 변경될 때 호출되는 콜백 함수',
      action: 'changed',
    },
    className: {
      description: '추가적인 CSS 클래스',
      control: 'text',
    },
    maxLength: {
      description: '입력 가능한 최대 문자 수',
      control: 'number',
    },
  },
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'initial',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: '입력해주세요',
    className: 'w-[20.375rem]',
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 입력 필드입니다. 텍스트, 이메일, 비밀번호, 비밀번호 확인 등 다양한 타입의 입력을 받을 수 있습니다.',
      },
    },
  },
};

export const MaxLength8: Story = {
  args: {
    type: 'text',
    placeholder: '최대 8자까지 가능해요',
    maxLength: 8,
    className: 'w-full',
  },
  parameters: {
    docs: {
      description: {
        story:
          '최대 8자까지 입력 가능한 필드입니다. 닉네임, 모임이름 등 짧은 텍스트 입력에 사용됩니다.',
      },
    },
  },
};

export const MaxLength100: Story = {
  args: {
    type: 'text',
    placeholder: '최대 100자까지 가능해요',
    maxLength: 100,
    className: 'w-[20.375rem]',
  },
  parameters: {
    docs: {
      description: {
        story:
          '최대 100자까지 입력 가능한 필드입니다. 모임 설명을 입력할 때 사용됩니다.',
      },
    },
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: '아이디 (이메일)',
    className: 'w-[20.375rem]',
  },
  parameters: {
    docs: {
      description: {
        story: '이메일 입력 필드입니다. 이메일 형식의 입력을 받습니다.',
      },
    },
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호 (영문 대/소문자, 숫자, 특수문자 포함)',
    className: 'w-[20.375rem]',
  },
  parameters: {
    docs: {
      description: {
        story:
          '비밀번호 입력 필드입니다. 입력된 텍스트가 마스킹되어 표시됩니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: '선택된 주소가 없습니다',
    disabled: true,
    className: 'w-[20.375rem] text-blue-dark03',
  },
  parameters: {
    docs: {
      description: {
        story:
          '비활성화된 입력 필드입니다. 사용자가 입력할 수 없는 상태를 나타냅니다.',
      },
    },
  },
};
