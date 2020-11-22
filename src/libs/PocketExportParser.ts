import { PocketBookmark } from '../models/PocketBookmark';

enum List {
    First = 'first-of-type',
    Last = 'last-of-type',
}

export class PocketExportParser {
    private exportDOM: HTMLElement;

    constructor(exportHtml: string) {
        const iframeEl = window.document.createElement('iframe');
        iframeEl.style.display = 'none';
        window.document.body.appendChild(iframeEl);
        this.exportDOM = iframeEl.contentDocument.documentElement;
        this.exportDOM.innerHTML = exportHtml;
    }

    public getUnreadBookmarks(): PocketBookmark[] {
        return this.getUnreadBookmarkElements().map(this.convertElementToModel);
    }

    public getArchiveBookmarks(): PocketBookmark[] {
        return this.getReadArchiveBookmarkElements().map(this.convertElementToModel);
    }

    private convertElementToModel(el: Element): PocketBookmark {
        return new PocketBookmark({
            href: el.getAttribute('href'),
            title: el.textContent,
            timeAdded: el.getAttribute('time_added'),
            tags: el.getAttribute('tags')
        });
    }

    private getUnreadBookmarkElements() {
        return this.getList(List.First);
    }
    private getReadArchiveBookmarkElements() {
        return this.getList(List.Last);
    }
    private getList(list: List) {
        return Array.from(this.exportDOM.querySelectorAll(`h1:${list.toString()}+ul li>a`));
    }
}