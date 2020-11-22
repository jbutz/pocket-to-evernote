/**
 * @jest-environment jsdom
 */
import {PocketExportParser} from './PocketExportParser';

const sampleHtml = `
<!DOCTYPE html>
<html>
<!--So long and thanks for all the fish-->

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Pocket Export</title>
</head>

<body>
	<h1>Unread</h1>
	<ul>
		<li><a href="https://example.com/unread-00" time_added="1593093910" tags="example-00">Unread Example 00</a></li>
		<li><a href="https://example.com/unread-01" time_added="1588940133" tags="example&01">Unread Example 01</a></li>
		<li><a href="https://example.com/unread-02" time_added="1586522154" tags="">https://example.com/unread-02</a></li>
		<li><a href="https://example.com/unread-03" time_added="1585831231" tags="example_3">I&#039;m Unread Example 03</a></li>
        <li><a href="https://example.com/unread-04" time_added="1553187136" tags="example-04,unread">Unread Example 04</a></li>
	</ul>

	<h1>Read Archive</h1>
    <ul>
        <li><a href="https://example.com/archive-00" time_added="1593093910" tags="example-00">Archive Example 00</a></li>
		<li><a href="https://example.com/archive-01" time_added="1588940133" tags="example&01">Archive Example 01</a></li>
		<li><a href="https://example.com/archive-02" time_added="1586522154" tags="">https://example.com/archive-02</a></li>
		<li><a href="https://example.com/archive-03" time_added="1585831231" tags="example_3">&#039;Archive Example 03&#039;</a></li>
        <li><a href="https://example.com/archive-04" time_added="1553187136" tags="example-04,archive">Archive Example 04</a></li>
	</ul>
</body>

</html>
`;

describe('PocketExportParser', () => {
    it('parses the imported HTML without errors', () => {
        expect(() => new PocketExportParser(sampleHtml)).not.toThrow();
    });
    it('returns unread bookmarks', () => {
        const parser = new PocketExportParser(sampleHtml);

        const unreadBookmarks = parser.getUnreadBookmarks();
        expect(unreadBookmarks.length).toBe(5);
        expect(unreadBookmarks).toEqual([
            expect.objectContaining({
                href: 'https://example.com/unread-00',
                tags: ['example-00'],
                timeAdded: new Date(1593093910000),
                title: 'Unread Example 00'
            }),
            expect.objectContaining({
                href: 'https://example.com/unread-01',
                tags: ['example&01'],
                timeAdded: new Date(1588940133000),
                title: 'Unread Example 01'
            }),
            expect.objectContaining({
                href: 'https://example.com/unread-02',
                tags: [],
                timeAdded: new Date(1586522154000),
                title: 'https://example.com/unread-02'
            }),
            expect.objectContaining({
                href: 'https://example.com/unread-03',
                tags: ['example_3'],
                timeAdded: new Date(1585831231000),
                title: 'I\'m Unread Example 03'
            }),
            expect.objectContaining({
                href: 'https://example.com/unread-04',
                tags: ['example-04','unread'],
                timeAdded: new Date(1553187136000),
                title: 'Unread Example 04'
            })
        ]);
    });
    it('returns archived bookmarks', () => {
        const parser = new PocketExportParser(sampleHtml);

        const archivedBookmarks = parser.getArchiveBookmarks();
        expect(archivedBookmarks.length).toBe(5);
        expect(archivedBookmarks).toEqual([
            expect.objectContaining({
                href: 'https://example.com/archive-00',
                tags: ['example-00'],
                timeAdded: new Date(1593093910000),
                title: 'Archive Example 00'
            }),
            expect.objectContaining({
                href: 'https://example.com/archive-01',
                tags: ['example&01'],
                timeAdded: new Date(1588940133000),
                title: 'Archive Example 01'
            }),
            expect.objectContaining({
                href: 'https://example.com/archive-02',
                tags: [],
                timeAdded: new Date(1586522154000),
                title: 'https://example.com/archive-02'
            }),
            expect.objectContaining({
                href: 'https://example.com/archive-03',
                tags: ['example_3'],
                timeAdded: new Date(1585831231000),
                title: '\'Archive Example 03\''
            }),
            expect.objectContaining({
                href: 'https://example.com/archive-04',
                tags: ['example-04','archive'],
                timeAdded: new Date(1553187136000),
                title: 'Archive Example 04'
            })
        ]);
    });
});