import { PocketBookmark } from '../models/PocketBookmark';
import { EvernoteExportBuilder } from './EvernoteExportBuilder';
import { EvernoteNoteBuilder } from './EvernoteNoteBuilder';
jest.mock('./EvernoteNoteBuilder');

describe('EvernoteExportBuilder', () => {
    let noteBuilder: EvernoteNoteBuilder;
    beforeEach(() => {
        noteBuilder = new EvernoteNoteBuilder();
        (noteBuilder.build as unknown as jest.SpyInstance).mockReturnValue('<en-note />');
    });

    it('instantiates without error', () => {
        expect(() => {
            new EvernoteExportBuilder(noteBuilder);
        }).not.toThrow();
    });

    describe('formatTimestamp', () => {
        it.each([
            [1593093910000, '20200625T140510Z'],
            [1586522154050, '20200410T123554Z'],
            ['2020-04-30T23:59:59.999-0800', '20200501T075959Z'],
        ])('formats "%s"', (dateInitValue, expected) => {
            const inputDate = new Date(dateInitValue);
            expect(EvernoteExportBuilder.formatDate(inputDate)).toEqual(expected);
        });
    });

    describe('buildExport', () => {
        beforeAll(() => {
            jest.useFakeTimers('modern');
            jest.setSystemTime(new Date('2020-10-04T14:53:44Z'));
        });
        afterAll(() => {
            jest.useRealTimers();
        });

        it('builds an export for 1 bookmark', async () => {
            const exportBuilder = new EvernoteExportBuilder(noteBuilder);

            expect(exportBuilder.buildExport([
                new PocketBookmark({
                    href: 'https://example.com',
                    title: 'Example Bookmark',
                    timeAdded: '1593093910',
                    tags: ''
                })
            ])).toMatchSnapshot();
        });

        it('builds an export for 2 bookmark2', async () => {
            const exportBuilder = new EvernoteExportBuilder(noteBuilder);

            expect(exportBuilder.buildExport([
                new PocketBookmark({
                    href: 'https://example.com',
                    title: 'Example Bookmark',
                    timeAdded: '1593093910',
                    tags: ''
                }),
                new PocketBookmark({
                    href: 'https://example.com/new-url',
                    title: 'Example Bookmark Number 2',
                    timeAdded: '1503093910',
                    tags: 'example,two'
                })
            ])).toMatchSnapshot();
        });
    });
});