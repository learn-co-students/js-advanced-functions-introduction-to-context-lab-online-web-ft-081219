function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeObject, dateStamp) {
  employeeObject.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(dateStamp.split(" ")[1], 10),
    date: dateStamp.split(" ")[0]
  });
  return employeeObject;
}

function createTimeOutEvent(employeeObject, dateStamp) {
  employeeObject.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(dateStamp.split(" ")[1], 10),
    date: dateStamp.split(" ")[0]
  });
  return employeeObject;
}

function hoursWorkedOnDate(employeeObject, date) {
  const timeInE = employeeObject.timeInEvents.find(e => e.date === date);
  const timeOutE = employeeObject.timeOutEvents.find(e => e.date === date);
  return (timeOutE.hour - timeInE.hour)/100;

}

function wagesEarnedOnDate(employeeObject, date) {
  return employeeObject.payPerHour * hoursWorkedOnDate(employeeObject, date);
}

function allWagesFor(employeeObject) {
  const dates = employeeObject.timeOutEvents.map(e => e.date);
  const wagesEachDate = dates.map(date => wagesEarnedOnDate(employeeObject, date));
  return wagesEachDate.reduce((total, element) => total + element);
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(e => e.firstName === firstName);
}

function calculatePayroll(employeesArray) {
  return employeesArray.reduce(((total, element) => total + allWagesFor(element)), 0);
}