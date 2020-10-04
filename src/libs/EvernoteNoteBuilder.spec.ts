import { PocketBookmark } from '../models/PocketBookmark';
import { EvernoteNoteBuilder } from './EvernoteNoteBuilder';

describe('EvernoteNoteBuilder', () => {
    let builder: EvernoteNoteBuilder;
    beforeEach(() => {
        builder = new EvernoteNoteBuilder();
    });

    it('builds the xml document', async () => {
        const exampleBookmark = new PocketBookmark({
            href: 'https://example.com',
            title: 'Example Bookmark',
            timeAdded: '0',
            tags: ''
        });

        expect(builder.build(exampleBookmark)).toMatchSnapshot();
    });
});