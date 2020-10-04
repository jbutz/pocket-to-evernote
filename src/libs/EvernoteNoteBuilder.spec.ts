import { PocketBookmark } from "../models/PocketBookmark";
import { EvernoteNoteBuilder } from "./EvernoteNoteBuilder";
import {promises as fs} from 'fs';
import path from 'path';

describe('EvernoteNoteBuilder', () => {
    let builder: EvernoteNoteBuilder;
    beforeEach(() => {
        builder = new EvernoteNoteBuilder();
    });

    it('builds the xml document', async () => {
        const expectedXml = await fs.readFile(path.join(__dirname, '..','testing','EvernoteNoteBuilder.output00.xml'), {encoding: 'utf-8'});
        const exampleBookmark = new PocketBookmark({
            href: 'https://example.com',
            title: 'Example Bookmark',
            timeAdded: '0',
            tags: ''
        });

        expect(builder.build(exampleBookmark)).toEqual(expectedXml);
    })
});