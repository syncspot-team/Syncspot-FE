import { extendTailwindMerge } from 'tailwind-merge';

export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'logo',
            'title',
            'subtitle',
            'menu',
            'menu-selected',
            'content',
            'content-bold',
            'description',
          ],
        },
      ],
      'bg-color': [
        {
          background: [
            'primary',
            'secondary',
            'tertiary',
            'disabled',
            'error-light',
            'error-normal',
            'overlay',
          ],
        },
      ],
      'text-color': [
        {
          text: [
            'primary',
            'secondary',
            'tertiary',
            'error-light',
            'error-normal',
            'white-default',
            'black-default',
          ],
        },
      ],
      'border-color': [
        {
          border: [
            'primary',
            'secondary',
            'tertiary',
            'disabled',
            'error-light',
            'error-normal',
            'gray-light',
            'gray-normal',
            'gray-dark',
          ],
        },
      ],
      fill: [
        {
          fill: [
            'primary',
            'secondary',
            'tertiary',
            'disabled',
            'error-light',
            'error-normal',
          ],
        },
      ],
      rounded: [
        {
          rounded: ['default', 'login'],
        },
      ],
      shadow: [
        {
          shadow: ['default', 'focus'],
        },
      ],
      animate: [
        {
          animate: [
            'slideDown',
            'slideUp',
            'slideInRight',
            'slideOutRight',
            'fadeIn',
            'fadeOut',
          ],
        },
      ],
    },
  },
});
