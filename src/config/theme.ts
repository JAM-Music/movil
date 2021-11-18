import R from '_src/assets/R';

export const Theme = {
  colors: {
    primary: R.colors.PRIMARY,
    secondary: R.colors.SECONDARY,
    error: R.colors.ERROR,
  },
  Text: {
    style: {
      color: R.colors.TEXT,
    },
  },
  Input: {
    inputStyle: {
      color: R.colors.TEXT,
    },
    selectionColor: R.colors.BORDER,
  },
  ButtonGroup: {
    buttonStyle: {
      borderWidth: 0,
      backgroundColor: R.colors.SECONDARY,
    },
    containerStyle: {
      borderWidth: 0,
    },
    textStyle: {
      color: R.colors.TEXT,
      fontSize: 15,
    },
    selectedButtonStyle: {
      backgroundColor: R.colors.PRIMARY,
      borderWidth: 0,
    },
    innerBorderStyle: {
      backgroundColor: R.colors.BG_TRANSPARENT,
      borderWidth: 0,
    },
  },
};
