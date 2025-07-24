// 所有可用主题
export const themes = {
  'watermelon': {
    name: 'Watermelon',
    description: 'Fresh watermelon red with mint green',
    theme: {
      background: 'bg-gradient-to-br from-red-50 via-pink-50 to-green-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-red-50',
        100: 'bg-red-100',
        200: 'bg-red-200',
        300: 'bg-red-300',
        400: 'bg-red-400',
        500: 'bg-red-500',
        600: 'bg-red-600',
        700: 'bg-red-700',
        800: 'bg-red-800',
        900: 'bg-red-900',
      },
      text: {
        primary: 'text-red-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-green-400 hover:bg-green-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-red-400 hover:bg-red-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-red-100',
        secondary: 'bg-gradient-to-r from-red-50 to-green-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-red-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-red-400 to-green-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-red-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-red-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-red-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-red-400 to-green-400',
        secondary: 'bg-gradient-to-r from-green-400 to-red-400',
        success: 'bg-gradient-to-r from-green-400 to-emerald-400',
        danger: 'bg-gradient-to-r from-red-400 to-pink-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  },
  'mango': {
    name: 'Mango',
    description: 'Tropical mango orange with lemon yellow',
    theme: {
      background: 'bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-orange-50',
        100: 'bg-orange-100',
        200: 'bg-orange-200',
        300: 'bg-orange-300',
        400: 'bg-orange-400',
        500: 'bg-orange-500',
        600: 'bg-orange-600',
        700: 'bg-orange-700',
        800: 'bg-orange-800',
        900: 'bg-orange-900',
      },
      text: {
        primary: 'text-orange-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-orange-100',
        secondary: 'bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-orange-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-orange-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-orange-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-orange-400 to-yellow-400',
        secondary: 'bg-gradient-to-r from-yellow-400 to-orange-400',
        success: 'bg-gradient-to-r from-yellow-400 to-amber-400',
        danger: 'bg-gradient-to-r from-orange-400 to-red-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  },
  'banana': {
    name: 'Banana',
    description: 'Warm banana yellow with cream white',
    theme: {
      background: 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-yellow-50',
        100: 'bg-yellow-100',
        200: 'bg-yellow-200',
        300: 'bg-yellow-300',
        400: 'bg-yellow-400',
        500: 'bg-yellow-500',
        600: 'bg-yellow-600',
        700: 'bg-yellow-700',
        800: 'bg-yellow-800',
        900: 'bg-yellow-900',
      },
      text: {
        primary: 'text-yellow-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-amber-400 hover:bg-amber-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-yellow-100',
        secondary: 'bg-gradient-to-r from-yellow-50 to-amber-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-yellow-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-yellow-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-yellow-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-yellow-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-yellow-400 to-amber-400',
        secondary: 'bg-gradient-to-r from-amber-400 to-yellow-400',
        success: 'bg-gradient-to-r from-amber-400 to-orange-400',
        danger: 'bg-gradient-to-r from-yellow-400 to-red-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  },
  'cotton-candy': {
    name: 'Cotton Candy',
    description: 'Dreamy cotton candy pink with sky blue',
    theme: {
      background: 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-pink-50',
        100: 'bg-pink-100',
        200: 'bg-pink-200',
        300: 'bg-pink-300',
        400: 'bg-pink-400',
        500: 'bg-pink-500',
        600: 'bg-pink-600',
        700: 'bg-pink-700',
        800: 'bg-pink-800',
        900: 'bg-pink-900',
      },
      text: {
        primary: 'text-pink-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-pink-100',
        secondary: 'bg-gradient-to-r from-pink-50 to-blue-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-pink-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-pink-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-pink-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-pink-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-pink-400 to-blue-400',
        secondary: 'bg-gradient-to-r from-blue-400 to-pink-400',
        success: 'bg-gradient-to-r from-blue-400 to-cyan-400',
        danger: 'bg-gradient-to-r from-pink-400 to-purple-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  },
  'chocolate': {
    name: 'Chocolate',
    description: 'Rich chocolate brown with golden brown',
    theme: {
      background: 'bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-amber-50',
        100: 'bg-amber-100',
        200: 'bg-amber-200',
        300: 'bg-amber-300',
        400: 'bg-amber-400',
        500: 'bg-amber-500',
        600: 'bg-amber-600',
        700: 'bg-amber-700',
        800: 'bg-amber-800',
        900: 'bg-amber-900',
      },
      text: {
        primary: 'text-amber-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-amber-400 hover:bg-amber-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-amber-100',
        secondary: 'bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-amber-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-amber-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-amber-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-amber-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-amber-400 to-orange-400',
        secondary: 'bg-gradient-to-r from-orange-400 to-amber-400',
        success: 'bg-gradient-to-r from-orange-400 to-red-400',
        danger: 'bg-gradient-to-r from-amber-400 to-brown-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  },
  'mint-candy': {
    name: 'Mint Candy',
    description: 'Refreshing mint green with mint blue',
    theme: {
      background: 'bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-green-50',
        100: 'bg-green-100',
        200: 'bg-green-200',
        300: 'bg-green-300',
        400: 'bg-green-400',
        500: 'bg-green-500',
        600: 'bg-green-600',
        700: 'bg-green-700',
        800: 'bg-green-800',
        900: 'bg-green-900',
      },
      text: {
        primary: 'text-green-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-green-400 hover:bg-green-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-green-100',
        secondary: 'bg-gradient-to-r from-green-50 to-cyan-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-green-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-green-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-green-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-green-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-green-400 to-cyan-400',
        secondary: 'bg-gradient-to-r from-cyan-400 to-green-400',
        success: 'bg-gradient-to-r from-cyan-400 to-blue-400',
        danger: 'bg-gradient-to-r from-green-400 to-emerald-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  },
  'caramel': {
    name: 'Caramel',
    description: 'Sweet caramel gold with deep brown',
    theme: {
      background: 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-yellow-50',
        100: 'bg-yellow-100',
        200: 'bg-yellow-200',
        300: 'bg-yellow-300',
        400: 'bg-yellow-400',
        500: 'bg-yellow-500',
        600: 'bg-yellow-600',
        700: 'bg-yellow-700',
        800: 'bg-yellow-800',
        900: 'bg-yellow-900',
      },
      text: {
        primary: 'text-yellow-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-yellow-100',
        secondary: 'bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-yellow-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-yellow-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-yellow-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-yellow-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-yellow-400 to-orange-400',
        secondary: 'bg-gradient-to-r from-orange-400 to-yellow-400',
        success: 'bg-gradient-to-r from-orange-400 to-red-400',
        danger: 'bg-gradient-to-r from-yellow-400 to-amber-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  },
  'forest': {
    name: 'Forest',
    description: 'Natural forest green with moss green',
    theme: {
      background: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-green-50',
        100: 'bg-green-100',
        200: 'bg-green-200',
        300: 'bg-green-300',
        400: 'bg-green-400',
        500: 'bg-green-500',
        600: 'bg-green-600',
        700: 'bg-green-700',
        800: 'bg-green-800',
        900: 'bg-green-900',
      },
      text: {
        primary: 'text-green-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-emerald-400 hover:bg-emerald-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-green-400 hover:bg-green-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-green-100',
        secondary: 'bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-green-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-green-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-green-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-green-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-green-400 to-emerald-400',
        secondary: 'bg-gradient-to-r from-emerald-400 to-green-400',
        success: 'bg-gradient-to-r from-emerald-400 to-teal-400',
        danger: 'bg-gradient-to-r from-green-400 to-teal-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  },
  'blue-rose': {
    name: 'Blue Rose',
    description: 'Mysterious blue rose with deep purple',
    theme: {
      background: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-blue-50',
        100: 'bg-blue-100',
        200: 'bg-blue-200',
        300: 'bg-blue-300',
        400: 'bg-blue-400',
        500: 'bg-blue-500',
        600: 'bg-blue-600',
        700: 'bg-blue-700',
        800: 'bg-blue-800',
        900: 'bg-blue-900',
      },
      text: {
        primary: 'text-blue-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-purple-400 hover:bg-purple-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-blue-100',
        secondary: 'bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-blue-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-blue-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-blue-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-blue-400 to-purple-400',
        secondary: 'bg-gradient-to-r from-purple-400 to-blue-400',
        success: 'bg-gradient-to-r from-purple-400 to-indigo-400',
        danger: 'bg-gradient-to-r from-blue-400 to-indigo-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  },
  'lavender': {
    name: 'Lavender',
    description: 'Peaceful lavender purple with light purple',
    theme: {
      background: 'bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-purple-50',
        100: 'bg-purple-100',
        200: 'bg-purple-200',
        300: 'bg-purple-300',
        400: 'bg-purple-400',
        500: 'bg-purple-500',
        600: 'bg-purple-600',
        700: 'bg-purple-700',
        800: 'bg-purple-800',
        900: 'bg-purple-900',
      },
      text: {
        primary: 'text-purple-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-violet-400 hover:bg-violet-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-purple-400 hover:bg-purple-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-purple-100',
        secondary: 'bg-gradient-to-r from-purple-50 to-violet-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-purple-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-purple-400 to-violet-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-purple-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-purple-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-purple-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-purple-400 to-violet-400',
        secondary: 'bg-gradient-to-r from-violet-400 to-purple-400',
        success: 'bg-gradient-to-r from-violet-400 to-indigo-400',
        danger: 'bg-gradient-to-r from-purple-400 to-indigo-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  },
  'aurora': {
    name: 'Aurora',
    description: 'Dreamy aurora green with aurora blue',
    theme: {
      background: 'bg-gradient-to-br from-green-50 via-cyan-50 to-blue-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-green-50',
        100: 'bg-green-100',
        200: 'bg-green-200',
        300: 'bg-green-300',
        400: 'bg-green-400',
        500: 'bg-green-500',
        600: 'bg-green-600',
        700: 'bg-green-700',
        800: 'bg-green-800',
        900: 'bg-green-900',
      },
      text: {
        primary: 'text-green-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-green-400 hover:bg-green-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-green-100',
        secondary: 'bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-green-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-green-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-green-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-green-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-green-400 to-blue-400',
        secondary: 'bg-gradient-to-r from-blue-400 to-green-400',
        success: 'bg-gradient-to-r from-blue-400 to-cyan-400',
        danger: 'bg-gradient-to-r from-green-400 to-cyan-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  },
  'sunset': {
    name: 'Sunset',
    description: 'Warm sunset orange with pink purple',
    theme: {
      background: 'bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50',
      headerBackground: 'bg-white/90 backdrop-blur-md',
      primary: {
        50: 'bg-orange-50',
        100: 'bg-orange-100',
        200: 'bg-orange-200',
        300: 'bg-orange-300',
        400: 'bg-orange-400',
        500: 'bg-orange-500',
        600: 'bg-orange-600',
        700: 'bg-orange-700',
        800: 'bg-orange-800',
        900: 'bg-orange-900',
      },
      text: {
        primary: 'text-orange-700',
        secondary: 'text-slate-500',
        dark: 'text-slate-800',
        light: 'text-slate-600',
      },
      buttons: {
        primary: 'bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        success: 'bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        danger: 'bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
      },
      cards: {
        main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-orange-100',
        secondary: 'bg-gradient-to-r from-orange-50 to-pink-50 rounded-3xl shadow-lg p-8',
        comment: 'bg-white rounded-2xl p-6 border border-orange-100 shadow-sm',
      },
      header: {
        logo: 'p-3 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl shadow-lg',
        title: 'text-3xl font-extrabold text-orange-700 tracking-tight',
        subtitle: 'text-base text-slate-500 font-medium',
      },
      typography: {
        h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-orange-600 leading-snug tracking-tight font-classic',
        h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
        h3: 'text-xl font-bold text-orange-700 leading-tight font-modern',
        h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
        body: 'text-base text-slate-700 leading-relaxed font-sans',
        bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
        caption: 'text-sm text-slate-500 font-medium font-sans',
        button: 'text-base font-semibold font-modern',
      },
      gradients: {
        primary: 'bg-gradient-to-r from-orange-400 to-pink-400',
        secondary: 'bg-gradient-to-r from-pink-400 to-orange-400',
        success: 'bg-gradient-to-r from-pink-400 to-purple-400',
        danger: 'bg-gradient-to-r from-orange-400 to-red-400',
      },
      animations: {
        hover: 'hover:scale-105 transition-transform duration-200',
        tap: 'active:scale-95 transition-transform duration-100',
      }
    }
  }
};

export type ThemeKey = keyof typeof themes;

// 获取每日主题
export const getDailyTheme = (): ThemeKey => {
  const themeKeys = Object.keys(themes) as ThemeKey[];
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return themeKeys[dayOfYear % themeKeys.length];
};

// 获取当前主题
export const getCurrentTheme = (): ThemeKey => {
  // 检查localStorage中是否有用户选择的主题
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('selectedTheme') as ThemeKey;
    if (savedTheme && themes[savedTheme]) {
      return savedTheme;
    }
  }
  // 否则返回每日主题
  return getDailyTheme();
};

// 设置用户选择的主题
export const setUserTheme = (themeKey: ThemeKey) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('selectedTheme', themeKey);
  }
};

// 清除用户选择的主题（恢复每日自动切换）
export const clearUserTheme = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('selectedTheme');
  }
}; 