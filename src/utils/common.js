export function getTimeNow() {

    var d = new Date;
    var dtenow = [d.getDate(), (d.getMonth() + 1), d.getFullYear()].join('/') + ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

    return dtenow;
};

export function convertTime(dateInt) {
    var date = new Date(dateInt);
    return date.toLocaleString();
}

export function diffTimeToSeconds(date1, date2) { // return int
    var d1 = new Date(date1);
    var d2 = new Date(date2);
    return parseInt((d2 - d1) / 1000);
}

export function DatetimeToHHMMSS(datetime){
    var d = new Date(datetime);
    return [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
}

export function SecondsToHHMMSS(second){
    return new Date(second * 1000).toISOString().substr(11, 8);
}

export function ConvertStringToNumber(str){
    return new parseInt(str);
}