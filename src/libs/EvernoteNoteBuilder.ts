import { PocketBookmark } from '../models/PocketBookmark';
import { create as createXml, fragment as createXmlFragment } from 'xmlbuilder2';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';

export class EvernoteNoteBuilder {
    public build(pocketBookmark: PocketBookmark): string {
        const xmlObj = this.constructBookmarkNote(pocketBookmark);

        return xmlObj.end({prettyPrint: true});
    }

    private constructBookmarkNote(pocketBookmark: PocketBookmark): XMLBuilder {
        return createXml({ version: '1.0', encoding: 'UTF-8' })
            .ele('en-note')
            .dtd({ sysID: 'http://xml.evernote.com/pub/enml2.dtd' })
            .ele('div', { 'style': '--en-clipped-content:bookmark' })
            .ele('div', { style: 'font-size: 16px; display:block; min-width: 100%; ' })
            .ele('div')
            .import(this.constructNoteBody(pocketBookmark));
    }

    private constructNoteBody(pocketBookmark: PocketBookmark) {
        const bodyWrapper = createXmlFragment()
            .ele('div', { style: 'display:block;height:100%;' });
        bodyWrapper.import(this.constructBookmarkTitle(pocketBookmark));
        bodyWrapper.import(this.constructBookmarkBody(pocketBookmark));

        return bodyWrapper;
    }

    private constructBookmarkTitle(pocketBookmark: PocketBookmark) {
        return createXmlFragment()
            .ele('div', { 'style': 'font-size:14px;line-height:20px;font-weight:bold;padding-bottom:10px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;', })
            .txt(pocketBookmark.title);
    }

    private constructBookmarkBody(pocketBookmark: PocketBookmark) {
        const bodyFlexContainer = createXmlFragment()
            .ele('div', { style: 'display:flex;flex-flow:row nowrap;place-content:stretch flex-start;align-items:flex-start;padding-top:15px;border-top:1px solid rgb(211, 214, 216);height:100%;' })
            .com('<en-media type="image/png" hash="ff26897593310722d6f07e6fcba357ef" width="146" height="125" style="max-width:180px;vertical-align:top;display:inline-block;"></en-media>');
        const flexContent = bodyFlexContainer.ele('div', { style: 'margin-left:15px;flex:1 1 auto;display:block;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;height:100%;' });
        flexContent.ele('div', { style: 'display:block;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;margin-bottom:15px;' })
            .com('<en-media type="image/png" hash="346e09471362f2907510a31812129cd2" width="16" height="16" style="vertical-align:top;display:inline-block;max-width:16px;"></en-media>')
            .ele('a', { href: pocketBookmark.href, target: '_blank', style: 'margin-left:10px;' })
            .txt(pocketBookmark.href);
        flexContent.ele('div', { style: 'white-space:normal;font-size:12px;overflow:hidden;height:200px;line-height:150%;' })
            .txt(pocketBookmark.title);
        return bodyFlexContainer;
    }


}