module.exports = {
  purge: {
    // content: ['!./pages/docs/**/*.mdx'],
    // content: ['!./src/components/mdx-components.tsx'],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#4C08DB',
          75: '#723FDD',
          50: '#9977E0',
          25: '#BFAEE2',
        },
        gray: {
          1000: '#2D3748',
          75: '#5B626F',
          50: '#898E97',
          25: '#B6BABE',
        },
        accent: {
          100: '#38B2AC',
        },
        orange: {
          100: '#FFFAF0',
          200: '#FEEBC8',
          300: '#FBD38D',
          400: '#F6AD55',
          500: '#ED8936',
          600: '#DD6B20',
          700: '#C05621',
          800: '#9C4221',
          900: '#7B341E',
        },
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        gradient: '2.80303px 2.80303px 9.34343px rgba(76, 8, 219, 0.15)',
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      },
      backgroundImage: {
        gradient: 'linear-gradient(147.72deg, #4C08DB 18.83%, #38B2AC 96.12%)',
        'gradient-button':
          'linear-gradient(127.48deg, #4C08DB -5.22%, #0CBDE3 134.42%)',
        'gradient-line':
          'linear-gradient(90.02deg, #4C08DB 47.02%, #38B2AC 95.44%)',
      },
    },
  },
  variants: {},
  plugins: [],
};
