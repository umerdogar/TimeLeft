// const tintColorLight = '#2f95dc';
// const tintColorDark = '#fff';

// export default {
//   light: {
//     text: '#000',
//     background: '#fff',
//     tint: tintColorLight,
//     tabIconDefault: '#ccc',
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: '#fff',
//     background: '#000',
//     tint: tintColorDark,
//     tabIconDefault: '#ccc',
//     tabIconSelected: tintColorDark,
//   },
// };


const palette = {
  coral: '#FF6B6B',
  coralDark: '#E85555',
  cream: '#FFF8F0',
  charcoal: '#1A1A2E',
  charcoalLight: '#2D2D44',
  warmGray: '#8C8C9E',
  lightGray: '#F2F2F7',
  white: '#FFFFFF',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};

export default {
  light: {
    text: palette.charcoal,
    subtext: palette.warmGray,
    background: palette.cream,
    card: palette.white,
    tint: palette.coral,
    tabIconDefault: palette.warmGray,
    tabIconSelected: palette.coral,
    border: palette.lightGray,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  },
  dark: {
    text: palette.white,
    subtext: palette.warmGray,
    background: palette.charcoal,
    card: palette.charcoalLight,
    tint: palette.coral,
    tabIconDefault: palette.warmGray,
    tabIconSelected: palette.coral,
    border: palette.charcoalLight,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  },
  palette,
};