import { Header } from '../components'
import '../styles/globals.css'

const MyApp =({ Component, pageProps }) =>{
  return( 
  <>
  <Header/>
  <Component {...pageProps} />
  
  </>
  )
}

export default MyApp
