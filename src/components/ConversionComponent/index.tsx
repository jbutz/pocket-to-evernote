import React from 'react';
import { Converter } from '../../libs/Converter';
import { ConversionComponentForm } from './ConversionComponentForm';

export class ConversionComponent extends React.Component<{ className?: string }, {exportUrl: null | string}> {
    constructor(props: { className?: string }) {
        super(props);
        this.state = {
            exportUrl: null
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    async handleFormSubmit(event: { file: HTMLInputElement, tag: HTMLInputElement }): Promise<void> {
        
        const file = event.file.files.item(0) || null;
        const unreadTag = event.tag.value.trim();
        const exportBlob = Converter.convert(file, unreadTag);
        
        this.setState({
            exportUrl: URL.createObjectURL(exportBlob)
        });
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                {!this.state.exportUrl && <ConversionComponentForm className={this.props.className} handleFormSubmit={this.handleFormSubmit} />}
                {this.state.exportUrl && <div className="text-center"><a className="btn btn-primary " href={this.state.exportUrl} download="export.enex">Download</a></div>}
            </React.Fragment>
        );
    }
}