export class PocketBookmark {
    public readonly href: string;
    public readonly title: string;
    public readonly timeAdded: Date;
    public readonly tags: string[];
    constructor(props: {
        href: string,
        title: string,
        timeAdded: string,
        tags?: string
    }) {
        this.href = props.href;
        this.title = props.title;
        this.timeAdded = new Date(Number.parseInt(props.timeAdded, 10) * 1000);
        this.tags = (props.tags || '').split(',').filter((value) => !!value);
    }
}