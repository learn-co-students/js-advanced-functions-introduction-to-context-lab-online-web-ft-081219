// Your code here
function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []

  }
}

function createEmployeeRecords(records) {
  return records.map(createEmployeeRecord)
}

function createTimeInEvent(record, timeIn) {
  const [date, hour] = timeIn.split(" ")

  record.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10)
  })

  return record
}

function createTimeOutEvent(record, timeOut) {
  const [date, hour] = timeOut.split(" ")

  record.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10)
  })

  return record
}

function hoursWorkedOnDate(record, date) {
  const timeIn = record.timeInEvents.find(el => el.date === date)
  const timeOut = record.timeOutEvents.find(el => el.date === date)

  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
  let dates = record.timeInEvents.map(timeIn => timeIn.date)
  let pay = dates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate(record, d)
    }, 0)

  return pay
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(rec =>rec.firstName === firstName)
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
