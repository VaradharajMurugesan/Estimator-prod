import { themeShadows } from './themeColors';

export const components = {
  MuiTable: {
    styleOverrides: {
      root: {
        tableLayout: 'fixed',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        fontSize: '13px',
        padding: '12px 0px',
      },
      root: {
        fontSize: '14px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        padding: '12px 8px 12px 0px',
      },
    },
  },
  MUIDataTableSelectCell: {
    styleOverrides: {
      root: {
        paddingLeft: 12,
      },
    },
  },
  MUIDataTableHeadCell: {
    styleOverrides: {
      root: {
        paddingLeft: 16,
      },
    },
  },
  MUIDataTableBodyCell: {
    styleOverrides: {
      root: {
        paddingLeft: 8,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: '14px',
        textTransform: 'none',
        fontWeight: '400',
      },
      contained: {
        boxShadow: themeShadows[8],
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      '*': {
        boxSizing: 'border-box',
      },
      html: {
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      '#root': {
        height: '100%',
      },
      '#nprogress .bar': {
        zIndex: '2000 !important',
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow: themeShadows[12],
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        '&:before': {
          display: 'none',
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        fontSize: '11px',
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontSize: '0.875rem',
      },
    },
  },
  MuiExpansionPanel: {
    styleOverrides: {
      root: {
        '&:before': {
          display: 'none',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        boxShadow:
          '0px 3px 3px -2px rgb(0 0 0 / 6%), 0px 3px 4px 0px rgb(0 0 0 / 4%), 0px 1px 8px 0px rgb(0 0 0 / 4%) !important',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiInputBase-input': {
          // Add your custom styles for the input field here
          padding: '8.5px 14px',
          // color: 'blue',
          // fontSize: '16px',        
          // ...
        },
        '& .MuiFormLabel-root': {
          // Add your custom styles for the label here
          // color: 'green',
          // fontSize: '14px',
          // ...
          top: '-7px'
        },
        // Add your custom styles for the TextField container here
        // borderColor: 'red',
        // borderWidth: '1px',
        // borderStyle: 'solid',
        // ...
      }
    }
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        // Add your custom styles for the FormControl container here
        margin: '0px !important',
        marginBottom: '8px !important'
        // ...
      },
    },
  }
};
