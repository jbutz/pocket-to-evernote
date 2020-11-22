import React from "react";
import { EvernoteExportBuilder } from "../../libs/EvernoteExportBuilder";
import { EvernoteNoteBuilder } from "../../libs/EvernoteNoteBuilder";
import { PocketExportParser } from "../../libs/PocketExportParser";
import { ConversionComponentForm } from "./ConversionComponentForm";
import {Converter} from '../../libs/Converter';

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
        const unreadTag = event.tag.value.trim();
        const exportBlob = Converter.convert(file, unreadTag)
        
        this.setState({
            exportUrl: URL.createObjectURL(exportBlob)
        });
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.exportUrl && <ConversionComponentForm className={this.props.className} handleFormSubmit={this.handleFormSubmit} />}
                {this.state.exportUrl && <div className="text-center"><a className="btn btn-primary " href={this.state.exportUrl} download="export.enex">Download</a></div>}
            </React.Fragment>
        )
    }
}