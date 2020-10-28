import React from "react";

;
export class ConversionComponentForm extends React.Component<{ className?: string; handleFormSubmit: Function }> {
    private fileInput: React.RefObject<HTMLInputElement>;
    private tagInput: React.RefObject<HTMLInputElement>

    constructor(props) {
        super(props);

        this.fileInput = React.createRef();
        this.tagInput = React.createRef();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit() {
        this.props.handleFormSubmit({
            file: this.fileInput.current,
            tag: this.tagInput.current,
        })
    }

    render() {
        return (
            <section className={`${this.props.className || ''}`}><div>
                <div className="mb-3">
                    <label htmlFor="pocketFile" className="form-label">Pocket Export File</label>
                    <input type="file" className="form-control" id="pocketFile" aria-describedby="pocketFileHelp" ref={this.fileInput} />
                    <div id="pocketFileHelp" className="form-text">This file is never sent to the servers and stays entirely private.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="unreadTagName" className="form-label">Unread Tag</label>
                    <input type="text" className="form-control" id="unreadTagName" aria-describedby="unreadTagNameHelp" defaultValue="read-it-later" ref={this.tagInput} />
                    <div id="unreadTagNameHelp" className="form-text">This tag is applied to all notes for items that were unread in the Pocket export. Leave it blank to skip this feature.</div>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.handleFormSubmit}>Build My Evernote File</button>
            </div></section>
        );
    }
}