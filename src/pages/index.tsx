import Head from 'next/head';
import React from 'react';
import { ConversionComponent } from '../components/ConversionComponent';
import { Introduction } from '../components/IntroductionComponent';

export default function Home(): JSX.Element {
    return (
        <React.Fragment>
            <Head key="title">
                <title>Pocket to Evernote</title>
            </Head>
            <Introduction />
            <hr className="my-3"/>
            <ConversionComponent className=""/>
        </React.Fragment>
    );
}
