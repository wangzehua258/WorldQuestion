// Theme 4: Sunset Orange with Lavender Accents
export const sunsetOrangeTheme = {
  // Background gradients
  background: 'bg-gradient-to-br from-sunset-50 via-orange-50 to-yellow-50',
  headerBackground: 'bg-white/90 backdrop-blur-md',
  
  // Primary colors
  primary: {
    50: 'bg-sunset-50',
    100: 'bg-sunset-100',
    200: 'bg-sunset-200',
    300: 'bg-sunset-300',
    400: 'bg-sunset-400',
    500: 'bg-sunset-500',
    600: 'bg-sunset-600',
    700: 'bg-sunset-700',
    800: 'bg-sunset-800',
    900: 'bg-sunset-900',
  },
  
  // Text colors
  text: {
    primary: 'text-sunset-700',
    secondary: 'text-slate-500',
    dark: 'text-slate-800',
    light: 'text-slate-600',
  },
  
  // Button styles
  buttons: {
    primary: 'bg-sunset-500 hover:bg-sunset-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
    success: 'bg-warmYellow-400 hover:bg-warmYellow-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
    danger: 'bg-accentBlue-400 hover:bg-accentBlue-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl text-lg',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all duration-200 text-base',
  },
  
  // Card styles
  cards: {
    main: 'bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-sunset-100',
    secondary: 'bg-gradient-to-r from-sunset-50 to-orange-50 rounded-3xl shadow-lg p-8',
    comment: 'bg-white rounded-2xl p-6 border border-sunset-100 shadow-sm',
  },
  
  // Header styles
  header: {
    logo: 'p-3 bg-gradient-to-r from-sunset-400 to-orange-400 rounded-2xl shadow-lg',
    title: 'text-3xl font-extrabold text-sunset-700 tracking-tight',
    subtitle: 'text-base text-slate-500 font-medium',
  },
  
  // Typography
  typography: {
    h1: 'text-2xl md:text-3xl lg:text-4xl font-extrabold text-sunset-600 leading-snug tracking-tight font-classic',
    h2: 'text-2xl md:text-3xl font-bold text-slate-700 leading-tight font-modern',
    h3: 'text-xl font-bold text-sunset-700 leading-tight font-modern',
    h4: 'text-lg font-semibold text-slate-700 leading-tight font-modern',
    body: 'text-base text-slate-700 leading-relaxed font-sans',
    bodySmall: 'text-sm text-slate-600 leading-relaxed font-sans',
    caption: 'text-sm text-slate-500 font-medium font-sans',
    button: 'text-base font-semibold font-modern',
  },
  
  // Gradients
  gradients: {
    primary: 'bg-gradient-to-r from-sunset-400 to-orange-400',
    secondary: 'bg-gradient-to-r from-orange-400 to-sunset-400',
    success: 'bg-gradient-to-r from-lavender-400 to-purple-400',
    danger: 'bg-gradient-to-r from-red-400 to-pink-400',
  },
  
  // Animations
  animations: {
    hover: 'hover:scale-105 transition-transform duration-200',
    tap: 'active:scale-95 transition-transform duration-100',
  }
}; 