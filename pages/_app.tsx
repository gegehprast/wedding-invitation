import '../styles/globals.css'
import '../styles/inter.css'
import '../styles/lovely.css'
import '../styles/ayuku.css'
import '../styles/LoveConchetta.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
