//styles
import '../assets/scss/main.scss'
import "tabulator-tables/dist/css/tabulator.min.css";
import '../assets/scss/myTabulator.scss'


//components
import Footer from '../components/Footer/Footer'
import { Provider } from 'react-redux'
import Head from 'next/head'


//cookies
import Cookies from 'universal-cookie';
export const cookies = new Cookies();

//store
import { useStore } from '../redux/store'


export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <Head>
                <title>Physibuzz</title>
            </Head>
            <Component {...pageProps} />
            <Footer />

        </Provider>
    )
}