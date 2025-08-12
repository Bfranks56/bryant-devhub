const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      typography: theme => ({
        brand: {
          css: {
            color: theme('colors.gray.800'),
            h1: {
              color: theme('colors.teal.700'),
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h2: {
              color: theme('colors.teal.600'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.teal.600'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.teal.800'),
              },
            },
            strong: { color: theme('colors.teal.700') },
            blockquote: {
              borderLeftColor: theme('colors.teal.500'),
              color: theme('colors.gray.600'),
              fontStyle: 'italic',
            },
            code: {
              color: theme('colors.pink.600'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.4em',
              borderRadius: '4px',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
