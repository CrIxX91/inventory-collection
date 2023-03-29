import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { darkTheme } from '@/themes';
import '@/styles/globals.css';
import { AuthProvider } from '@/context';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NextUIProvider theme={darkTheme} >
        <Component {...pageProps}  />
      </NextUIProvider>
    </AuthProvider>
  )
}

