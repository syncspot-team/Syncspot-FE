import type { Meta, StoryObj } from '@storybook/react';
import CustomToast from './customToast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_TYPE } from '@src/types/toastType';

const meta = {
  title: 'Common/CustomToast',
  component: CustomToast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: '토스트의 타입',
      control: 'select',
      options: Object.values(TOAST_TYPE),
    },
    status: {
      description: '토스트의 상태 (선택적)',
      control: 'text',
    },
    message: {
      description: '토스트에 표시할 메시지',
      control: 'text',
    },
  },
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'initial',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <ToastContainer position="top-center" />
      </div>
    ),
  ],
} satisfies Meta<typeof CustomToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: TOAST_TYPE.SUCCESS,
    message: '성공적으로 처리되었습니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '성공 메시지를 표시하는 토스트입니다.',
      },
    },
  },
};

export const ErrorAuthentication: Story = {
  args: {
    type: TOAST_TYPE.ERROR,
    status: '401',
    message: '인증에 실패하였습니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '사용자 인증 실패 시 표시되는 에러 토스트입니다.',
      },
    },
  },
};

export const ErrorAuthorization: Story = {
  args: {
    type: TOAST_TYPE.ERROR,
    status: '403',
    message: '해당 방의 회원이 아닙니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '접근 권한이 없을 때 표시되는 에러 토스트입니다.',
      },
    },
  },
};

export const ErrorResource: Story = {
  args: {
    type: TOAST_TYPE.ERROR,
    status: '404',
    message: '존재하지 않는 방입니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '요청한 리소스를 찾을 수 없을 때 표시되는 에러 토스트입니다.',
      },
    },
  },
};

export const ErrorNetwork: Story = {
  args: {
    type: TOAST_TYPE.ERROR,
    status: '500',
    message:
      '서버가 응답하지 않습니다. 프로그램을 재시작하거나 관리자에게 연락하세요.',
  },
  parameters: {
    docs: {
      description: {
        story: '네트워크 연결 문제가 발생했을 때 표시되는 에러 토스트입니다.',
      },
    },
  },
};

export const Info: Story = {
  args: {
    type: TOAST_TYPE.INFO,
    message: '정보를 확인해주세요.',
  },
  parameters: {
    docs: {
      description: {
        story: '정보 메시지를 표시하는 토스트입니다.',
      },
    },
  },
};

export const Warning: Story = {
  args: {
    type: TOAST_TYPE.WARNING,
    message: '경고: 주의가 필요합니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '경고 메시지를 표시하는 토스트입니다.',
      },
    },
  },
};
