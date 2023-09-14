import { createTheme } from '@mui/material';
import { forEach, merge } from 'lodash';
import { themeColors } from './themeColors';
import themeOptions from './themeOptions';

function createMatxThemes() {
  let themes = {};

  // let inputTheme = createTheme({
  //   overrides: {
  //     MuiTextField: {
  //       root: {
  //         '& .MuiInputBase-input': {
  //           // Add your custom styles for the input field here
  //           color: 'blue',
  //           fontSize: '16px',
  //           // ...
  //         },
  //         '& .MuiFormLabel-root': {
  //           // Add your custom styles for the label here
  //           color: 'green',
  //           fontSize: '14px',
  //           // ...
  //         },
  //         // Add your custom styles for the TextField container here
  //         borderColor: 'red',
  //         borderWidth: '1px',
  //         borderStyle: 'solid',
  //         // ...
  //       },
  //     },
  //   },
  // });


  forEach(themeColors, (value, key) => {
    themes[key] = createTheme(merge({}, themeOptions, value));
  });

  return themes;
}
export const themes = createMatxThemes();
