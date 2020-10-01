export class PocketBookmark {
    public readonly href: string;
    public readonly title: string;
    public readonly timeAdded: Date;
    public readonly tags: string[];
    constructor(
        href: string,
        title: string,
        timeAdded: string,
        tags?: string
    ) {
        this.href = href;
        this.title = title;
        this.timeAdded = new Date(Number.parseInt(timeAdded, 10) * 1000);
        this.tags = (tags || '').split(',')
    }
}