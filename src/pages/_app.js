// pages/_app.js
import '../styles/globals.css';
import { MyProvider } from '../src/context/MyContext';

function MyApp({ Component, pageProps }) {
    return (
        <MyProvider>
            <Component {...pageProps} />
        </MyProvider>
    );
}

export default MyApp;
