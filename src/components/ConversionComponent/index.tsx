export const ConversionComponent = (): JSX.Element => (
    <form>
        <div className="mb-3">
            <label htmlFor="pocketFile" className="form-label">Pocket Export File</label>
            <input type="file" className="form-control" id="pocketFile" aria-describedby="pocketFileHelp" />
            <div id="pocketFileHelp" className="form-text">This file is never sent to the servers and stays entirely private.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="unreadTagName" className="form-label">Unread Tag</label>
            <input type="text" className="form-control" id="unreadTagName"  aria-describedby="unreadTagNameHelp" defaultValue="read-it-later"/>
            <div id="unreadTagNameHelp" className="form-text">This tag is applied to all notes for items that were unread in the Pocket export. Leave it blank to skip this feature.</div>
        </div>
        <button type="button" className="btn btn-primary">Build My Evernote File</button>
    </form>
);