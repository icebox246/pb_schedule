import {XMLParser} from 'fast-xml-parser';
import fetch from 'node-fetch';


export async function handler() {
    const xml = await (await fetch('https://www.w3schools.com/xml/note.xml'))
    const parser = new XMLParser();
    const json = parser.parse(xml);

    return {
        statusCode: 200, body: JSON.stringify(json)
    }
}
