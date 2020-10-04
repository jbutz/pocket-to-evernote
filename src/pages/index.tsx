import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Introduction } from '../components/IntroductionComponent';
import { ConversionComponent } from '../components/ConversionComponent';

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
