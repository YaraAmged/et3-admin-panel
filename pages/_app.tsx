import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiButton: {
            defaultProps: { variant: "contained" },
            styleOverrides: { contained: { margin: 4 } },
          },
        },
      })}
    >
      <Container>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}

export default MyApp;
