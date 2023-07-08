//REACT AND NEXT
import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";

//MUI
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";

//TANSTACK QUERY
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// MUI THEME IMPORTS
import theme from "../theme";
import createEmotionCache from "theme/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// TANSTACK query
// const queryClient = new QueryClient();

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} /> */}
          <Component {...pageProps} />
        {/* </QueryClientProvider> */}
      </ThemeProvider>
    </CacheProvider>
  );
}
