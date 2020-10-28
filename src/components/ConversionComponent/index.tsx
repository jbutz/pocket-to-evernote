import React from "react";
import { EvernoteExportBuilder } from "../../libs/EvernoteExportBuilder";
import { EvernoteNoteBuilder } from "../../libs/EvernoteNoteBuilder";
import { PocketExportParser } from "../../libs/PocketExportParser";
import { ConversionComponentForm } from "./ConversionComponentForm";

export class ConversionComponent extends React.Component<{ className?: string }, {exportUrl: null | string}> {
    constructor(props) {
        super(props);
        this.state = {
            exportUrl: null
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    async handleFormSubmit(event: { file: HTMLInputElement, tag: HTMLInputElement }) {
        
        const file = event.file.files.item(0) || null;
        if(!file) {
            throw new Error('No File');
        }

        if(file.name.endsWith('.html') === false) {
            throw new Error('Wrong Extension');
        }

        const unreadTag = event.tag.value.trim();
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

        const exportBlob = new Blob([ evernoteExport ], { type: 'application/octet-stream' });
        this.setState({
            exportUrl: URL.createObjectURL(exportBlob)
        });
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.exportUrl && <ConversionComponentForm className={this.props.className} handleFormSubmit={this.handleFormSubmit} />}
                {this.state.exportUrl && <a href={this.state.exportUrl} download="export.enex">Download</a>}
            </React.Fragment>
        )
    }
}