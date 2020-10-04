/* eslint react/jsx-no-target-blank: 0 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const Footer = (props: { className?: string }): JSX.Element => (
    <footer className={`text-center ${props.className || ''}`}>
        <p className="small">
            <span>Copyright {new Date().getFullYear()} <a href="https://jasonbutz.info" target="_blank">Jason Butz</a>. </span>
            <span>Open Sourced Under the <a href="https://github.com/jbutz/pocket-to-evernote/blob/master/LICENSE" target="_blank">MIT License</a></span>
        </p>
        <p>
            <a href="https://github.com/jbutz/pocket-to-evernote" target="_blank">
                <span className="badge bg-dark"><FontAwesomeIcon icon={faGithub} /> Contribute on GitHub</span>
            </a>
        </p>
        <p className="small">This application is not affiliated with Pocket or Evernote. Pocket is copyright Read It Later, Inc. Evernote is copyright Evernote Corporation.</p>
    </footer>
);