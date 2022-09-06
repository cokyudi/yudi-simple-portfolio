import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { ThemeProvider } from 'next-themes';
import {useState} from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [buttonText, setButtonText] = useState('Hello !');

  const onChangeLanguageHandler = (text:string) =>{
    setButtonText(text);
  }

  return (
    <>
      <ThemeProvider attribute="class" enableSystem={false}>
      <Navigation onChangeLanguage={onChangeLanguageHandler} text={buttonText} />
      <Component {...pageProps} text={buttonText}/>
      <Footer/>
      </ThemeProvider>
    </>
  )
}

export default MyApp
