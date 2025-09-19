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
      colors: {
        // Persona 3 color palette
        primary: {
          DEFAULT: '#1269cc', // $color-primary
          hover: '#105eb8', // $color-primary-hover
          active: '#0f59ad', // $color-primary-active
          foreground: '#ffffff', // $on-primary
        },
        secondary: {
          DEFAULT: '#6d9ac7', // $color-secondary
          hover: '#7ca4cd', // $color-secondary-hover
          active: '#83a9cf', // $color-secondary-active
          foreground: '#1a1a1a', // $on-secondary
        },
        accent: {
          DEFAULT: '#51eefc', // $color-accent
          hover: '#4bdbe8', // $color-accent-hover
          active: '#47d1de', // $color-accent-active
          foreground: '#111111', // $on-accent
        },
        // Map Persona 3 colors to standard Tailwind names
        blue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#1269cc', // Primary blue
          600: '#105eb8',
          700: '#0f59ad',
          800: '#0c4a94',
          900: '#0a3a7a',
        },
        cyan: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#51eefc', // Accent cyan
          500: '#4bdbe8',
          600: '#47d1de',
          700: '#0891b2',
          800: '#155e75',
          900: '#164e63',
        },
        // Keep existing grays for text
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#1a1a1a', // Persona 3 text
        },
        // Surface colors
        surface: {
          DEFAULT: '#ffffff',
          dark: '#303030',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      typography: theme => ({
        p3: {
          css: {
            color: theme('colors.gray.900'), // Persona 3 text color
            h1: {
              color: theme('colors.primary.DEFAULT'),
              fontWeight: '900',
              fontStyle: 'italic',
              fontFamily: ['Inter', ...defaultTheme.fontFamily.sans],
              letterSpacing: '-0.025em',
            },
            h2: {
              color: theme('colors.secondary.DEFAULT'),
              fontWeight: '700',
            },
            p: {
              fontWeight: '300',
            },
            a: {
              color: theme('colors.accent.DEFAULT'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.accent.hover'),
              },
            },
            strong: { color: theme('colors.primary.DEFAULT') },
            blockquote: {
              borderLeftColor: theme('colors.primary.DEFAULT'),
              color: theme('colors.gray.600'),
              fontStyle: 'italic',
            },
            code: {
              color: theme('colors.accent.DEFAULT'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.4em',
              borderRadius: '4px',
            },
          },
        },
        // Inverted version for dark backgrounds
        'p3-invert': {
          css: {
            color: theme('colors.white'),
            h1: {
              color: theme('colors.primary.foreground'),
              fontWeight: '900',
              fontStyle: 'italic',
              fontFamily: ['Inter', ...defaultTheme.fontFamily.sans],
              letterSpacing: '-0.025em',
            },
            h2: {
              color: theme('colors.primary.foreground'),
              fontWeight: '700',
              opacity: '0.9',
            },
            h3: {
              color: theme('colors.primary.foreground'),
              opacity: '0.9',
            },
            p: {
              color: theme('colors.primary.foreground'),
              fontWeight: '300',
              opacity: '0.85',
            },
            a: {
              color: theme('colors.accent.DEFAULT'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.accent.hover'),
              },
            },
            strong: {
              color: theme('colors.primary.foreground'),
              opacity: '1',
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.foreground'),
              color: theme('colors.primary.foreground'),
              opacity: '0.8',
              fontStyle: 'italic',
            },
            code: {
              color: theme('colors.accent.DEFAULT'),
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '0.2em 0.4em',
              borderRadius: '4px',
            },
            'ul > li': {
              color: theme('colors.primary.foreground'),
              opacity: '0.85',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
