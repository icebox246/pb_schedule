import {XMLParser} from 'fast-xml-parser';


const xml = "<note> <to>Tove</to> <from>Jani</from> <heading>Reminder</heading> <body>Don't forget me this weekend!</body> </note>";


export async function handler() {
	const parser = new XMLParser();
	const json = parser.parse(xml);

	return {
		statusCode: 200,
		body: JSON.stringify(json)
	}
}
