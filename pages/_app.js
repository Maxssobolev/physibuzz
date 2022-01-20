//styles
import '../assets/scss/main.scss'
import "tabulator-tables/dist/css/tabulator.min.css";
import '../assets/scss/myTabulator.scss'

import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import Head from 'next/head'
//components
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import { Container } from 'react-bootstrap'


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