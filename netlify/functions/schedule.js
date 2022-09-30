const {readFileSync} = require('fs');
const {XMLParser} = require('fast-xml-parser');
const {fetch} = require('node-fetch')

function convertRooms(rooms) {
    const o = {};
    for (let room of rooms) {
        if (o[room.ID]) throw 'room id conflict'
            o[room.ID] = room.NAZWA;
    }
    return o;
}

function convertTeachers(teachers) {
    const o = {};
    for (let teacher of teachers) {
        if (o[teacher.ID]) throw 'teacher id conflict'
            o[teacher.ID] = {
                name: teacher.IMIE,
                surname: teacher.NAZW,
            }
    }
    return o;
}

function convertSubjects(subjects) {
    const o = {};
    for (let subject of subjects) {
        if (o[subject.ID]) throw 'subject id conflict'
            o[subject.ID] = {
                name: subject.NAZWA,
                short: subject.NAZ_SK,
            }
    }
    return o;
}

function convertClassses(classes) {
    return classes.map(cl => {
        return {
            day: cl.DZIEN, st: cl.GODZ, dur: cl.ILOSC, tid: cl.ID_NAUCZ,
                rid: cl.ID_SALA, sid: cl.ID_PRZ, iid: cl.ID_ST, kind: cl.RODZ,
                sem: cl.SEM, group: cl.GRUPA
        }
    });
}

function convertInstitutions(institutions) {
    const o = {};
    for (let institution of institutions) {
        if (o[institution.ID]) throw 'insittution id conflict'
            o[institution.ID] = institution.NAZWA;
    }
    return o;
}

exports.handler = async (event) => {
    // const xmlBuffer = readFileSync('plan.xml');
	const xmlBuffer = await (await fetch("https://degra.wi.pb.edu.pl/rozklady/webservices.php")).text();

    const parser = new XMLParser();
    const jObj = parser.parse(xmlBuffer).conversation;

    const result = {};

    result.rooms = convertRooms(jObj.tabela_sale);
    result.teachers = convertTeachers(jObj.tabela_nauczyciele);
    result.subjects = convertSubjects(jObj.tabela_przedmioty);
    result.classes = convertClassses(jObj.tabela_rozklad);
    result.institutions = convertInstitutions(jObj.tabela_studia);

    const spacing = event.queryStringParameters.debug ? '  ' : null;

    return {
        statusCode: 200, headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(result, null, spacing)
    }
}
