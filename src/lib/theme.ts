// Universal Color Theme Configuration
// Customize these colors to change the entire application theme

export const theme = {
  // Primary Colors
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  
  // Secondary Colors (Pink)
  secondary: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
    950: '#500724',
  },
  
  // Neutral Colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Gradients
  gradients: {
    primary: 'from-purple-600 to-pink-600',
    primaryHover: 'from-purple-700 to-pink-700',
    hero: 'from-purple-900 via-pink-800 to-orange-700',
    footer: 'from-purple-900 via-purple-800 to-pink-900',
    text: 'from-purple-600 to-pink-600',
    textLight: 'from-purple-400 to-pink-400',
  },
  
  // Background Colors
  backgrounds: {
    light: '#fafafa',
    dark: '#0a0a0a',
    card: '#ffffff',
    cardDark: '#171717',
  },
  
  // Text Colors
  text: {
    primary: '#171717',
    secondary: '#525252',
    light: '#fafafa',
    muted: '#737373',
  },
  
  // Border Colors
  border: {
    light: '#e5e5e5',
    dark: '#262626',
  },
  
  // Shadow Colors
  shadow: {
    primary: 'rgba(168, 85, 247, 0.25)',
    secondary: 'rgba(236, 72, 153, 0.25)',
  },
};

// CSS Custom Properties for dynamic theming
export const cssVariables = {
  '--color-primary-50': theme.primary[50],
  '--color-primary-100': theme.primary[100],
  '--color-primary-200': theme.primary[200],
  '--color-primary-300': theme.primary[300],
  '--color-primary-400': theme.primary[400],
  '--color-primary-500': theme.primary[500],
  '--color-primary-600': theme.primary[600],
  '--color-primary-700': theme.primary[700],
  '--color-primary-800': theme.primary[800],
  '--color-primary-900': theme.primary[900],
  '--color-primary-950': theme.primary[950],
  
  '--color-secondary-50': theme.secondary[50],
  '--color-secondary-100': theme.secondary[100],
  '--color-secondary-200': theme.secondary[200],
  '--color-secondary-300': theme.secondary[300],
  '--color-secondary-400': theme.secondary[400],
  '--color-secondary-500': theme.secondary[500],
  '--color-secondary-600': theme.secondary[600],
  '--color-secondary-700': theme.secondary[700],
  '--color-secondary-800': theme.secondary[800],
  '--color-secondary-900': theme.secondary[900],
  '--color-secondary-950': theme.secondary[950],
  
  '--gradient-primary': theme.gradients.primary,
  '--gradient-primary-hover': theme.gradients.primaryHover,
  '--gradient-hero': theme.gradients.hero,
  '--gradient-footer': theme.gradients.footer,
  '--gradient-text': theme.gradients.text,
  '--gradient-text-light': theme.gradients.textLight,
  
  '--bg-light': theme.backgrounds.light,
  '--bg-dark': theme.backgrounds.dark,
  '--bg-card': theme.backgrounds.card,
  '--bg-card-dark': theme.backgrounds.cardDark,
  
  '--text-primary': theme.text.primary,
  '--text-secondary': theme.text.secondary,
  '--text-light': theme.text.light,
  '--text-muted': theme.text.muted,
  
  '--border-light': theme.border.light,
  '--border-dark': theme.border.dark,
  
  '--shadow-primary': theme.shadow.primary,
  '--shadow-secondary': theme.shadow.secondary,
};

// Helper function to get gradient class
export function getGradient(type: keyof typeof theme.gradients) {
  return theme.gradients[type];
}

// Helper function to get color
export function getColor(scale: 'primary' | 'secondary' | 'neutral', shade: number) {
  return theme[scale][shade as keyof typeof theme.primary];
}
