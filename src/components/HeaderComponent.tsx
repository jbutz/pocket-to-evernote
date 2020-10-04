import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faEvernote, faGetPocket } from '@fortawesome/free-brands-svg-icons';

export const Header = (): JSX.Element => (
    <header className="text-center">
        <h1 className="display-1"><FontAwesomeIcon icon={faGetPocket} color="#EF4056"/> <FontAwesomeIcon icon={faArrowRight} /> <FontAwesomeIcon icon={faEvernote} color="#00A82D" /></h1>
        <div className="alert alert-warning mt-1" role="alert">This application is still a work in progress and should be considered pre-alpha.</div>
    </header>
);
