function createEmployeeRecord(data){
    return {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = rows => {
    return rows.map(data => createEmployeeRecord(data))
}

const createTimeInEvent = (employee, datetime) => {
    employee.timeInEvents.push({
        type: "TimeIn",
        date: datetime.split(" ")[0],
        hour: parseInt(datetime.split(" ")[1])
    })
    return employee
}

const createTimeOutEvent = (employee, datetime) => {
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: datetime.split(" ")[0],
        hour: parseInt(datetime.split(" ")[1])
    })
    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    const start = employee.timeInEvents.find(d => d.date === date)
    const end = employee.timeOutEvents.find(d => d.date === date)
    return (end.hour - start.hour) / 100
}

const wagesEarnedOnDate = (employee, date) => {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

const allWagesFor = (employee) => {
    const dates = employee.timeInEvents.map(e => e.date)
    return dates.reduce((memo, date) => memo + wagesEarnedOnDate(employee, date), 0)
}

const calculatePayroll = employees => {
    return employees.reduce((memo, emp) => memo + allWagesFor(emp), 0)
}

const findEmployeeByFirstName = (force, name) => {
    return force.find(emp => emp.firstName === name)
}
