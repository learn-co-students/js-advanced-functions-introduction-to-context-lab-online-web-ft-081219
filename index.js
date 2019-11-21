// Your code here

function createEmployeeRecord(array){
  
    const new_person = {
        firstName: array[0], 
        familyName:  array[1],
        title:  array[2],
        payPerHour:  array[3],
        timeInEvents:  [],
        timeOutEvents: []
    }
    return new_person
}

function createEmployeeRecords(array){
    const Array = []
    
        array.forEach(e=>{
            Array.push({
                firstName: e[0], 
                familyName:  e[1],
                title:  e[2],
                payPerHour:  e[3],
                timeInEvents:  [],
                timeOutEvents: []
            })
        })
        return Array
 
}

function createTimeInEvent (obj,date){
    const normalized_date = date.split(" ")
    obj.timeInEvents.push({type: "TimeIn", hour: parseInt(normalized_date[1]),date: normalized_date[0]})
    return obj
}

function createTimeOutEvent(obj,date){
    const normalized_date = date.split(" ")
    obj.timeOutEvents.push({type: "TimeOut", hour: parseInt(normalized_date[1]),date: normalized_date[0]})
    return obj
}

function hoursWorkedOnDate(obj, date){
   const time_in_event = obj.timeInEvents.find(e =>{if(e.date === date){return e}})
   const time_out_event  =  obj.timeOutEvents.find(e =>{if(e.date === date){return e}})
   if(time_in_event && time_out_event){
       return (time_out_event.hour - time_in_event.hour)/ 100
   }
} 

function wagesEarnedOnDate(obj, date){
   const hours =  hoursWorkedOnDate(obj,date)
   return obj.payPerHour * hours
}

function allWagesFor(obj){
   const dates = obj.timeInEvents.map(e => e.date)
    const amounts_made = dates.map((e => wagesEarnedOnDate(obj,e)))
    return amounts_made.reduce((total,memo) => {return total + memo} )
}

function calculatePayroll(array){
    const array_of_amount_due = array.map(e =>{
       return allWagesFor(e)
    })
    return array_of_amount_due.reduce((total,memo) => {return total + memo} )


}


function findEmployeeByFirstName(array,name){

    return array.find(e => e.firstName === name)
 }