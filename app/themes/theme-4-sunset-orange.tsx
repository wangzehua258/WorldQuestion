// Theme 4: Sunset Orange with Lavender Accents
export const sunsetOrangeTheme = {
  // Background gradients
  background: 'bg-gradient-to-br from-sunset-50 via-orange-50 to-yellow-50',
  headerBackground: 'bg-white/80 backdrop-blur-md',
  
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
    primary: 'bg-sunset-500 hover:bg-sunset-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl',
    success: 'bg-lavender-400 hover:bg-lavender-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl',
    danger: 'bg-red-400 hover:bg-red-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-full transition-all duration-200',
  },
  
  // Card styles
  cards: {
    main: 'bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-sunset-100',
    secondary: 'bg-gradient-to-r from-sunset-50 to-orange-50 rounded-2xl shadow p-6',
    comment: 'bg-white rounded-xl p-4 border border-sunset-100 shadow-sm',
  },
  
  // Header styles
  header: {
    logo: 'p-2 bg-gradient-to-r from-sunset-400 to-orange-400 rounded-2xl shadow',
    title: 'text-2xl font-extrabold text-sunset-700 tracking-tight',
    subtitle: 'text-sm text-slate-500',
  },
  
  // Typography
  typography: {
    h1: 'text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight',
    h2: 'text-2xl font-bold text-slate-700',
    h3: 'text-xl font-bold text-sunset-700',
    body: 'text-slate-700 leading-relaxed',
    caption: 'text-sm text-slate-500',
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