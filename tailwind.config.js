/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({
        html: {
          fontFamily: "'SUIT', 'Pretendard', sans-serif",
        },
      });
      addComponents({
        '.primary-btn': {
          width: 'maxContent',
          height: '24px',
          borderWidth: theme('borderWidth.default'),
          borderRadius: theme('borderRadius.radiusFull'),
          padding: '0px 6px',
          transitionProperty: 'colors',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2px',
          borderColor: theme('borderColor.default'),
          color: theme('textColor.weak'),
          '&:hover': {
            borderColor: theme('borderColor.bold'),
            color: theme('textColor.bold'),
          },
        },
      });
      const newUtilities = {
        '.display-bold24': {
          fontWeight: theme('fontWeight.bold'),
          fontSize: theme('fontSize.L'),
          lineHeight: theme('lineHeight.auto'),
        },
        '.display-bold16': {
          fontWeight: theme('fontWeight.bold'),
          fontSize: theme('fontSize.M'),
          lineHeight: theme('lineHeight.auto'),
        },
        '.display-bold14': {
          fontWeight: theme('fontWeight.bold'),
          fontSize: theme('fontSize.R'),
          lineHeight: theme('lineHeight.auto'),
        },
        '.display-bold12': {
          fontWeight: theme('fontWeight.bold'),
          fontSize: theme('fontSize.S'),
          lineHeight: theme('lineHeight.auto'),
        },
        '.display-medium16': {
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.M'),
          lineHeight: theme('lineHeight.22'),
        },
        '.display-medium14': {
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.R'),
          lineHeight: theme('lineHeight.22'),
        },
        '.display-medium12': {
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.S'),
          lineHeight: theme('lineHeight.auto'),
        },
        '.selected-bold16': {
          fontWeight: theme('fontWeight.bold'),
          fontSize: theme('fontSize.M'),
          lineHeight: theme('lineHeight.auto'),
          textDecoration: 'underline',
        },
        '.selected-bold14': {
          fontWeight: theme('fontWeight.bold'),
          fontSize: theme('fontSize.R'),
          lineHeight: theme('lineHeight.auto'),
          textDecoration: 'underline',
        },
        '.available-medium16': {
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.M'),
          lineHeight: theme('lineHeight.22'),
        },
        '.available-medium14': {
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.R'),
          lineHeight: theme('lineHeight.22'),
        },
        '.available-medium12': {
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.S'),
          lineHeight: theme('lineHeight.auto'),
        },
        '.hover-medium16': {
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.M'),
          lineHeight: theme('lineHeight.22'),
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        '.hover-medium14': {
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.R'),
          lineHeight: theme('lineHeight.22'),
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
