import { JSDOM } from 'jsdom';
import { PocketBookmark } from '../models/PocketBookmark';

enum List {
    First = 'first-of-type',
    Last = 'last-of-type',
}

export class PocketExportParser {
    private exportDOM: JSDOM;

    constructor(exportHtml: string) {
        this.exportDOM = new JSDOM(exportHtml, {
            url: "https://example.org/",
            referrer: "https://example.com/",
            contentType: "text/html",
            includeNodeLocations: false,
            storageQuota: 0
          });
    }

    public getUnreadBookmarks() {
        return this.getUnreadBookmarkElements().map(this.convertElementToModel);
    }

    public getArchiveBookmarks() {
        return this.getReadArchiveBookmarkElements().map(this.convertElementToModel);
    }

    private convertElementToModel(el: Element) {
        return new PocketBookmark(el.getAttribute('href'), el.textContent, el.getAttribute('time_added'), el.getAttribute('tags'));
    }

    private getUnreadBookmarkElements() {
        return this.getList(List.First);
    }
    private getReadArchiveBookmarkElements() {
        return this.getList(List.Last);
    }
    private getList(list: List) {
        return Array.from(this.exportDOM.window.document.querySelectorAll(`h1:${list.toString()}+ul li>a`));
    }
}