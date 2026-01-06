import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { ThemeProvider } from 'next-themes';
import {useState} from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from "@vercel/analytics/next"
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const [buttonText, setButtonText] = useState('Hello !');

  const onChangeLanguageHandler = (text:string) =>{
    setButtonText(text);
  }

  return (
    <>
      <Head>
        <title>Yudi Dharma Putra</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" enableSystem={false}>
      <Navigation onChangeLanguage={onChangeLanguageHandler} text={buttonText} />
      <Component {...pageProps} text={buttonText}/>
      <GoogleTagManager gtmId={'GTM-WVZ645LG'} />
      <Analytics />
      <Footer/>
      </ThemeProvider>
    </>
  )
}

export default MyApp
