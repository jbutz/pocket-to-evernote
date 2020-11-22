import { EvernoteExportBuilder } from "./EvernoteExportBuilder";
import { EvernoteNoteBuilder } from "./EvernoteNoteBuilder";
import { PocketExportParser } from "./PocketExportParser";

export class Converter {
    static async convert(file: File, unreadTag: string): Promise<Blob> {
        if (!file) {
            throw new Error('No File');
        }

        if (file.name.endsWith('.html') === false) {
            throw new Error('Wrong Extension');
        }


        console.time('Pocket Export Processing');
        const fileContents = await file.text();

        const pocketParser = new PocketExportParser(fileContents);

        const pocketBookmarks = [
            ...pocketParser.getArchiveBookmarks(),
            ...pocketParser.getUnreadBookmarks().map((bookmark) => ({
                ...bookmark,
                tags: [
                    ...bookmark.tags,
                    unreadTag,
                ].filter((bookmark) => !!bookmark)
            })),
        ];
        console.timeEnd('Pocket Export Processing');
        console.time('Evernote Export Building');
        const exportBuilder = new EvernoteExportBuilder(new EvernoteNoteBuilder());

        const evernoteExport = exportBuilder.buildExport(pocketBookmarks);
        console.timeEnd('Evernote Export Building');
        console.log('Export Length in characters', evernoteExport.length);

        return new Blob([evernoteExport], { type: 'application/octet-stream' });
    }
}