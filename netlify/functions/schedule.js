// import {readFileSync} from 'fs';
import { XMLParser } from 'fast-xml-parser';
import axios from 'axios';

function convertRooms(rooms) {
    const o = {};
    for (let room of rooms) {
        if (o[room.ID]) throw 'room id conflict'
        o[room.ID] = room.NAZWA;
    }
    return o;
}

function convertTitles(titles) {
    const o = {};
    for (let title of titles) {
        if (o[title.ID]) throw 'title id conflict'
        o[title.ID] = title.NAZWA;
    }
    return o;
}

function convertTeachers(teachers, titles) {
    const o = {};
    for (let teacher of teachers) {
        if (o[teacher.ID]) throw 'teacher id conflict'
        o[teacher.ID] = {
            name: teacher.IMIE,
            nsh: teacher.IM_SK,
            surname: teacher.NAZW,
            title: titles[teacher.ID_TYT],
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
            sem: cl.SEM, group: cl.GRUPA, wm: cl.TYG
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

export async function handler(event) {
    // const xmlBuffer = readFileSync('plan.xml');
    const xmlBuffer = (await axios.get("https://degra.wi.pb.edu.pl/rozklady/webservices.php")).data;

    const parser = new XMLParser();
    const jObj = parser.parse(xmlBuffer).conversation;

    if (!('tabela_tytuly' in jObj
        && 'tabela_sale' in jObj
        && 'tabela_nauczyciele' in jObj
        && 'tabela_przedmioty' in jObj
        && 'tabela_rozklad' in jObj
        && 'tabela_studia' in jObj)) {
        return {
            statusCode: 500,
            body: 'Failed to fetch data from remote server'
        }
    }

    const result = {};

    const titles = convertTitles(jObj.tabela_tytuly);

    result.rooms = convertRooms(jObj.tabela_sale);
    result.teachers = convertTeachers(jObj.tabela_nauczyciele, titles);
    result.subjects = convertSubjects(jObj.tabela_przedmioty);
    result.classes = convertClassses(jObj.tabela_rozklad);
    result.institutions = convertInstitutions(jObj.tabela_studia);

    const spacing = event.queryStringParameters.debug ? '  ' : null;

    return {
        statusCode: 200, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result, null, spacing)
    }
}
