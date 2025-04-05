let globalAppointments = [];
let globalDate = {};
let globalEmployeeId = null

function setGlobalAppointments(appointments) {
    globalAppointments = appointments;
}

function getGlobalAppointments() {
    return globalAppointments;
}

function setEditedCurrentTime(newMonth, newYear) {
    globalDate = { month: newMonth, year: newYear } 
}

function getEditedCurrentTime(){
    return globalDate
}

function setSelectedEmployeeId(employeeId){
    globalEmployeeId = employeeId
}

function getSelectedEmployeeId(){
    return globalEmployeeId
}

export {setGlobalAppointments,getGlobalAppointments, setEditedCurrentTime, getEditedCurrentTime, setSelectedEmployeeId, getSelectedEmployeeId}