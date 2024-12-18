/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        suit: 'SUIT',
        pre: 'Pretendard',
      },
      fontSize: {
        // 제목 - SUIT Bold 26pt
        title: [
          '1.625rem',
          {
            letterSpacing: '-2.5%',
            fontWeight: '700',
          },
        ],
        // 소제목 - SUIT Bold 22pt
        subtitle: [
          '1.375rem',
          {
            letterSpacing: '-2.5%',
            fontWeight: '700',
          },
        ],
        // 메뉴 - SUIT Regular 22pt
        menu: [
          '1.375rem',
          {
            letterSpacing: '-2.5%',
            fontWeight: '400',
          },
        ],
        // 메뉴 선택 - SUIT Bold 22pt
        'menu-selected': [
          '1.375rem',
          {
            letterSpacing: '-2.5%',
            fontWeight: '700',
          },
        ],
        // 본문 - SUIT Medium 18pt
        content: [
          '1.125rem',
          {
            letterSpacing: 'base',
            fontWeight: '500',
          },
        ],
        // 본문 강조 - SUIT Bold 18pt
        'content-bold': [
          '1.125rem',
          {
            letterSpacing: '-2.5%',
            fontWeight: '700',
          },
        ],
        // 부가 설명 - SUIT Medium 16pt
        description: [
          '1rem',
          {
            // 16pt
            letterSpacing: 'base',
            fontWeight: '500',
          },
        ],
      },
      colors: {
        white: {
          default: 'var(--white)',
        },
        black: {
          default: 'var(--black)',
        },
        blue: {
          light01: 'var(--blue-light01)',
          light02: 'var(--blue-light02)',
          normal01: 'var(--blue-normal01)',
          normal02: 'var(--blue-normal02)',
          dark01: 'var(--blue-dark01)',
          dark02: 'var(--blue-dark02)',
          dark03: 'var(--blue-dark03)',
        },
        gray: {
          light: 'var(--gray-light)',
          normal: 'var(--gray-normal)',
          dark: 'var(--gray-dark)',
        },
        red: {
          light: 'var(--red-light)',
          normal: 'var(--red-normal)',
        },
      },
      textColor: {
        primary: 'var(--blue-normal01)',
        secondary: 'var(--blue-normal02)',
        tertiary: 'var(--blue-dark02)',
        error: {
          light: 'var(--red-light)',
          normal: 'var(--red-normal)',
        },
        white: {
          default: 'var(--white)',
        },
        black: {
          default: 'var(--black)',
        },
      },
      backgroundColor: {
        primary: 'var(--blue-normal01)',
        secondary: 'var(--blue-normal02)',
        tertiary: 'var(--blue-dark02)',
        disabled: 'var(--gray-normal)',
        error: {
          light: 'var(--red-light)',
          normal: 'var(--red-normal)',
        },
        overlay: 'var(--black-alpha-60)',
      },
      borderColor: {
        primary: 'var(--blue-normal01)',
        secondary: 'var(--blue-normal02)',
        tertiary: 'var(--blue-dark02)',
        disabled: 'var(--gray-normal)',
        error: {
          light: 'var(--red-light)',
          normal: 'var(--red-normal)',
        },
      },
      borderRadius: {
        default: '0.875rem',
      },
      fill: {
        primary: 'var(--blue-normal01)',
        secondary: 'var(--blue-normal02)',
        tertiary: 'var(--blue-dark02)',
        disabled: 'var(--gray-normal)',
        error: {
          light: 'var(--red-light)',
          normal: 'var(--red-normal)',
        },
      },
      boxShadow: {
        default: '0 0 20px 0 rgba(47, 95, 221, 0.50)',
        focus: '0 0 0 2px rgba(235, 248, 255, 1)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('tailwind-scrollbar')],
};
