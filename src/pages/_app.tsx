import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import '../styles/globals.css';

function PocketToEvernote({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />;
}

export default PocketToEvernote;
