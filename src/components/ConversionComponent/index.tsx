import React from "react";
import { EvernoteExportBuilder } from "../../libs/EvernoteExportBuilder";
import { EvernoteNoteBuilder } from "../../libs/EvernoteNoteBuilder";
import { PocketExportParser } from "../../libs/PocketExportParser";
import { ConversionComponentForm } from "./ConversionComponentForm";

export class ConversionComponent extends React.Component<{ className?: string }> {
    constructor(props) {
        super(props);
    }

    async handleFormSubmit(event: { file: HTMLInputElement, tag: HTMLInputElement }) {
        debugger;
        const file = event.file.files.item(0) || null;
        if(!file) {
            throw new Error('No File');
        }

        if(file.name.endsWith('.html') === false) {
            throw new Error('Wrong Extension');
        }
        debugger;

        const unreadTag = event.tag.value.trim();
        
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

        const exportBuilder = new EvernoteExportBuilder(new EvernoteNoteBuilder());

        const evernoteExport = exportBuilder.buildExport(pocketBookmarks);
        
    }

    render() {
        return <ConversionComponentForm className={this.props.className} handleFormSubmit={this.handleFormSubmit} />
    }
}