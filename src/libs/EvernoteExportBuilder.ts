import { DateTime } from 'luxon';
import { create as createXml, fragment as createXmlFragment } from 'xmlbuilder2';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { PocketBookmark } from '../models/PocketBookmark';
import { EvernoteNoteBuilder } from './EvernoteNoteBuilder';

const MAX_TITLE_LENGTH = 255;
export class EvernoteExportBuilder {
    constructor(private readonly evernoteNoteBuilder: EvernoteNoteBuilder) { }

    public buildExport(pocketBookmarks: PocketBookmark[]): string {
        const exportEl = createXml({ version: '1.0', encoding: 'UTF-8' })
            .ele('en-export', {
                'export-date': EvernoteExportBuilder.formatDate(new Date()),
                application: 'Pocket to Evernote',
                version: 'Pocket to Evernote'
            })
            .dtd({ sysID: 'http://xml.evernote.com/pub/evernote-export3.dtd' });

        pocketBookmarks.forEach((bookmark) => {
            exportEl.import(this.buildNoteElement(bookmark));
        });

        return exportEl.end({ prettyPrint: true });
    }

    private buildNoteElement(pocketBookmark: PocketBookmark): XMLBuilder {
        const noteEl = createXmlFragment()
            .ele('note');

        noteEl.ele('title')
            .txt(EvernoteExportBuilder.formatNoteTitle(pocketBookmark.title));

        noteEl.ele('content').dat(this.evernoteNoteBuilder.build(pocketBookmark));

        noteEl.ele('created').txt(EvernoteExportBuilder.formatDate(pocketBookmark.timeAdded));
        noteEl.ele('updated').txt(EvernoteExportBuilder.formatDate(pocketBookmark.timeAdded));
        const noteAttributesEl = noteEl.ele('note-attributes');
        noteAttributesEl.ele('source').txt('Pocket');
        noteAttributesEl.ele('source-url').txt(pocketBookmark.href);
        noteAttributesEl.ele('source-application').txt('Pocket to Evernote');

        pocketBookmark.tags.forEach((tag) => {
            noteEl.ele('tag').txt(tag);
        });

        return noteEl;
    }

    static formatDate(input: Date): string {
        return DateTime.fromJSDate(input).toUTC().toFormat('yyyyMMdd\'T\'HHmmss\'Z\'');
    }

    static formatNoteTitle(input: string): string {
        const trimmedTitle = input.trim();
        if(trimmedTitle.length > MAX_TITLE_LENGTH) {
            return `${trimmedTitle.substring(MAX_TITLE_LENGTH - 3)}...`;
        }
        return trimmedTitle;
    }
}