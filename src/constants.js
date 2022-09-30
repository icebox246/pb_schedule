const friendlyTimeNames =
    {
        '1': {begin: '8.30', end: '9.15'},
        '2': {begin: '9.15', end: '10.00'},
        '3': {begin: '10.15', end: '11.00'},
        '4': {begin: '11.00', end: '11.45'},
        '5': {begin: '12.00', end: '12.45'},
        '6': {begin: '12.45', end: '13.30'},
        '7': {begin: '14.00', end: '14.45'},
        '8': {begin: '14.45', end: '15.30'},
        '9': {begin: '16.00', end: '16.45'},
        '10': {begin: '16.45', end: '17.30'},
        '11': {begin: '17.40', end: '18.25'},
        '12': {begin: '18.25', end: '19.10'},
        '13': {begin: '19.20', end: '20.05'},
        '14': {begin: '20.05', end: '20.50'},
    }

export function getFriendlyTimeBegin(t) {
    return friendlyTimeNames[t].begin;
}

export function getFriendlyTimeEnd(t) {
    return friendlyTimeNames[t].end;
}

const friendlyKindNames = {
    'W': 'wykład',
    'Ćw': 'ćwiczenia',
    'Ps': 'p. spec.',  // 'pracownia specjalistyczna',
    'P': 'projekt',
    'L': 'laboratorium',
    'S': 'seminarium'
}

export function getFriendlyKindName(k) {
    return friendlyKindNames[k];
}

