module.exports = {
  purge: [
    './css/**/*.css',
    './js/**/*.js',
    './*.html'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          brightBlue: 'hsl(220, 98%, 61%)',
          gradientTop: 'hsl(192, 100%, 67%)',
          gradientBottom: 'hsl(280, 87%, 65%)',
        },
        light: {
          veryLightGray: 'hsl(0, 0%, 98%)',
          veryLightGrayishBlue: 'hsl(236, 33%, 92%)',
          lightGrayishBlue: 'hsl(233, 11%, 84%)',
          darkGrayishBlue: 'hsl(236, 9%, 61%)',
          veryDarkGrayishBlue: 'hsl(235, 19%, 35%)',
        },
        dark: {
          veryDarkBlue: 'hsl(235, 21%, 11%)',
          veryDarkDesaturatedBlue: 'hsl(235, 24%, 19%)',
          lightGrayishBlue: {
            base: 'hsl(234, 39%, 85%)',
            hover: 'hsl(236, 33%, 92%)'
          },
          darkGrayishBlue: 'hsl(234, 11%, 52%)',
          veryDarkGrayishBlue: 'hsl(233, 14%, 35%)',
          veryDarkGrayishBlue: 'hsl(237, 14%, 26%)'
        },
      },

      fontFamily: {
        'josefinSans': ['Josefin Sans', 'sans-serif']
      },

      backgroundImage: (theme) => ({
        'desktopDark': "url('../images/bg-desktop-dark.jpg')",
        'desktopLight': "url('../images/bg-desktop-light.jpg')",
        'mobileDark': "url('../images/bg-mobile-dark.jpg')",
        'mobileLight': "url('../images/bg-mobile-light.jpg')",
        'sun': "url('../images/icon-sun.svg')",
        'moon': "url('../images/icon-moon.svg')",
        'check': "url('../images/icon-check.svg')",
        'cross': "url('../images/icon-cross.svg')",


      }),

      minHeight: {
        '60': '15rem',
        '72': '18rem',
      },

      maxHeight: {
        '50': '50vh'
      },

      letterSpacing: {
        widessst: '.5em'
      },

      screens: {
        'hover-hover': { 'raw': '(hover:hover)' }
      }
    },
  },
  variants: {
    extend: {
      backgroundImage: ['dark', 'checked', 'hover'],
      borderColor: ['checked'],
      borderWidth: ['dark'],
      backgroundClip: ['hover']
    },
  },
  plugins: [],
}
