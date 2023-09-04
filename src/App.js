import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import EnterPhone from "./routes/EnterPhone";
import EnterCode from "./routes/EnterCode";
import UserInfoContex from "./contexts/UserInfoContext";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import iranYekan from './assets/fonts/iranyekanwebregular.woff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GadgetList from "./routes/GadgetsList";
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useState } from "react";
import { IconButton, Typography } from "@mui/material";

function App() {
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });


  const [theme, settheme] = useState('light');

  const handleChange = () => {

    settheme((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

  }


  const darkTheme = createTheme({

    palette: {

      mode: theme,
      background: {
        default: theme === 'dark' ? '#1b1d2e' : '#edf3f8',

      },

      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#1d5bfe',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#0066ff',
        main: '#ca0aff',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
  
      formbox: {
        main: '#cb09ff',
        light: '#d0d7e2',
        dark: '#0d0f1a',
        
        contrastText: '#fbfdff'
      },

      icons:{
        light: '#0d0f1a',
        dark: '#d0d7e2',
      },

      // Provide every color token (light, main, dark, and contrastText) when using
      // custom colors for props in Material UI's components.
      // Then you will be able to use it like this: `<Button color="custom">`
      // (For TypeScript, you need to add module augmentation for the `custom` value)
      custom: {
        light: '#ffa726',
        main: '#f57c00',
        dark: '#ca0aff',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },



    typography: {
      fontFamily: 'iranYekan, Arial',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'iranYekan';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('iranYekan'), local('iranyekanwebregular'), url(${iranYekan}) format('woff');
           
          }
        `,
      },
    },
  });



  const [userInfo, setUserInfo] = useState({
    mobile: null,
    token: null
  })

  return (
    <CacheProvider value={cacheRtl}>
      <UserInfoContex.Provider value={{ userInfo, setUserInfo }}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>





            <Typography> <IconButton sx={{ ml: 1 }} onClick={handleChange} color="inherit">
              {darkTheme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton></Typography>


            <Routes>
              <Route path="/" element={<EnterPhone />} />
              <Route path="/enter-code" element={<EnterCode />} />
              <Route path="/home" element={<Home />} />
              <Route path="/gadget-list/:slug" element={<GadgetList />} />
              {/* <Route path="/user/enter-phone" element={<UserEnterPhone />} /> */}



            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </UserInfoContex.Provider>
    </CacheProvider>
  );
}

export default App;
