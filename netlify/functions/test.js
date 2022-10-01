import {XMLParser} from 'fast-xml-parser';
import axios from 'axios';


export async function handler() {
    const xml = (await axios.get('https://www.w3schools.com/xml/note.xml')).data;
    const parser = new XMLParser();
    const json = parser.parse(xml);

    return {
        statusCode: 200, body: JSON.stringify(json)
    }
}
