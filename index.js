function createEmployeeRecord(array) {
    let obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3]
    }

    obj.timeInEvents = [];
    obj.timeOutEvents = [];

    return obj;
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
}

function createTimeInEvent(obj, datestamp) {
    const h = parseInt(datestamp.split(' ')[1]);
    const d = datestamp.split(' ')[0];
    obj.timeInEvents.push({type: 'TimeIn', hour: h, date: d})
    
    return obj
}

function createTimeOutEvent(obj, datestamp) {
    const h = parseInt(datestamp.split(' ')[1]);
    const d = datestamp.split(' ')[0];
    obj.timeOutEvents.push({type: 'TimeOut', hour: h, date: d})
    
    return obj
}

function hoursWorkedOnDate(obj, date) {
    const clockIn = obj.timeInEvents.find(e => e.date === date);
    const clockOut = obj.timeOutEvents.find(e => e.date === date);

    return (clockOut.hour - clockIn.hour) / 100;
}

function wagesEarnedOnDate(obj, date) {
    return hoursWorkedOnDate(obj, date) * obj.payPerHour;
}

function allWagesFor(obj) {
    return obj.timeInEvents.map(e => wagesEarnedOnDate(obj, e.date)).reduce((e, memo) => e + memo, 0);
}

function findEmployeeByFirstName(array, name) {
    return array.find(obj => obj.firstName === name); 
}

function calculatePayroll(array) {
    return array.map(obj => allWagesFor(obj)).reduce((e, memo) => e + memo, 0);
}