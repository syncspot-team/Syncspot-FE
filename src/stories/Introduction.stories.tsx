import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Introduction',
  component: () => (
    <div className="max-w-4xl p-8 mx-auto space-y-12">
      <section>
        <h1 className="mb-6 text-3xl font-bold">
          SyncSpot 컴포넌트 디자인 시스템
        </h1>
        <p className="mb-8">
          SyncSpot은 중간지점 계산, 장소 투표, 시간 투표를 위한 모임 올인원 웹
          서비스 입니다. <br />이 문서는 SyncSpot의 컴포넌트의 디자인 시스템을
          소개합니다.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">⚙️ 컴포넌트 구조</h2>
        <p className="mb-6">
          SyncSpot의 컴포넌트는 다음과 같은 구조로 구성되어 있습니다:
        </p>

        <div className="space-y-6">
          {[
            {
              title: '1. Common 컴포넌트',
              items: [
                [
                  'BottomSheet',
                  '바텀 시트의 장소, 시간 내부요소를 표시합니다.',
                ],
                [
                  'Button',
                  '버튼의 기본 형태, 두번째 형태, 나가기, 비활성화, 로딩상태를 표시합니다.',
                ],
                [
                  'Input',
                  '폼 입력을 위한 입력의 기본, 글자수 제한, 기능, 비활성화 상태를 표시합니다.',
                ],
                [
                  'KakaoLocationPicker',
                  '카카오 주소 검색 입력의 초기 상태, 기본, 비활성화를 표시합니다.',
                ],
                [
                  'Modal',
                  '모달 내부 요소의 탈퇴, 재투표 확인, 모임 정보, 공유하기를 표시합니다.',
                ],
                [
                  'Toast',
                  '알림 메시지를 표시하는 토스트 성공, 실패의 여러 형태, 경고, 정보를 표시합니다.',
                ],
                ['Loading', '로딩 상태를 표시합니다.'],
              ],
            },
            {
              title: '2. Auth 컴포넌트',
              items: [['작성 예정']],
            },
            {
              title: '3. Location 컴포넌트',
              items: [['작성 예정']],
            },
            {
              title: '4. Place 컴포넌트',
              items: [['작성 예정']],
            },
            {
              title: '5. Time 컴포넌트',
              items: [['작성 예정']],
            },
            {
              title: '6. Layout 컴포넌트',
              items: [['작성 예정']],
            },
          ].map(({ title, items }) => (
            <section key={title}>
              <h3 className="mb-2 text-xl font-semibold">{title}</h3>
              <ul className="pl-6 space-y-1 list-disc">
                {items.map(([name, desc]) => (
                  <li key={name}>
                    <strong>{name}</strong>: {desc}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section>
        <h2 className="my-4 text-2xl font-bold">🎨 디자인 시스템</h2>

        <section>
          <h3 className="my-4 text-xl font-semibold">🔤 폰트</h3>
          <div className="space-y-2">
            <div className="font-tt">TT Interphases Pro Trl Variable</div>
            <div className="font-suit">SUIT</div>
            <div className="font-pre">Pretendard</div>
          </div>
        </section>

        <section>
          <h3 className="my-4 text-xl font-semibold">🔎 타이포그래피</h3>
          <div className="space-y-2">
            <div className="text-logo">로고 - SUIT Bold 38pt</div>
            <div className="text-title">제목 - SUIT Bold 26pt</div>
            <div className="text-subtitle">소제목 - SUIT Bold 22pt</div>
            <div className="text-menu">메뉴 - SUIT Regular 18pt</div>
            <div className="text-menu-selected">메뉴 선택 - SUIT Bold 18pt</div>
            <div className="text-content">본문 - SUIT Medium 16pt</div>
            <div className="text-content-bold">본문 강조 - SUIT Bold 16pt</div>
            <div className="text-description">부가 설명 - SUIT Medium 14pt</div>
          </div>
        </section>

        <section>
          <h2 className="my-4 text-2xl font-bold">🎨 색상 팔레트</h2>
          <div className="space-y-8">
            {/* Primary Colors */}
            <div>
              <h3 className="mb-2 text-xl font-semibold">Primary Colors</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 text-white rounded bg-blue-normal01">
                  Primary: var(--blue-normal01)
                </div>
                <div className="p-4 text-white rounded bg-blue-normal02">
                  Secondary: var(--blue-normal02)
                </div>
                <div className="p-4 text-white rounded bg-blue-dark02">
                  Tertiary: var(--blue-dark02)
                </div>
              </div>
            </div>

            {/* Gray Scale */}
            <div>
              <h3 className="mb-2 text-xl font-semibold">Gray Scale</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 text-black rounded bg-gray-light">
                  Gray Light: var(--gray-light)
                </div>
                <div className="p-4 text-black rounded bg-gray-normal">
                  Gray Normal: var(--gray-normal)
                </div>
                <div className="p-4 text-white rounded bg-gray-dark">
                  Gray Dark: var(--gray-dark)
                </div>
              </div>
            </div>

            {/* Red Variants */}
            <div>
              <h3 className="mb-2 text-xl font-semibold">Red Variants</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 text-white rounded bg-red-light">
                  Error Light: var(--red-light)
                </div>
                <div className="p-4 text-white rounded bg-red-normal">
                  Error Normal: var(--red-normal)
                </div>
              </div>
            </div>

            {/* Additional Colors */}
            <div>
              <h3 className="mb-2 text-xl font-semibold">Additional Colors</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 text-black rounded bg-white-default">
                  White: var(--white)
                </div>
                <div className="p-4 text-white rounded bg-black-default">
                  Black: var(--black)
                </div>
                <div className="p-4 text-white rounded bg-black-alpha-60">
                  Overlay: var(--black-alpha-60)
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="my-4 text-xl font-semibold">✨테두리</h3>
          <div className="space-y-4">
            <div className="p-4 border border-primary rounded-default">
              기본 테두리: 0.875rem
            </div>
            <div className="p-4 border-login rounded-login">
              로그인 테두리: 1.875rem
            </div>
          </div>
        </section>

        <section>
          <h3 className="my-4 text-xl font-semibold">☀️ 그림자</h3>
          <div className="space-y-4">
            <div className="p-4 shadow-default">
              기본 그림자: 0 0 20px 0 rgba(47, 95, 221, 0.50)
            </div>
            <div className="p-4 shadow-focus">
              포커스 그림자: 0 0 0 2px rgba(235, 248, 255, 1)
            </div>
            <div className="p-4 shadow-black">
              블랙 그림자: 0 0 8px 0 rgba(0,0,0,0.25)
            </div>
          </div>
        </section>

        <section>
          <h3 className="my-4 text-xl font-semibold">🎬 애니메이션</h3>
          <div className="space-y-2">
            <div className="p-4 animate-slideDown">Slide Down</div>
            <div className="p-4 animate-slideUp">Slide Up</div>
            <div className="p-4 animate-customBounce">Custom Bounce</div>
            <div className="p-4 animate-slideInRight">Slide In Right</div>
          </div>
        </section>
      </section>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'initial',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
