let globalAppointments = [];
let globalDate = {};

function setGlobalAppointments(appointments) {
    globalAppointments = appointments;
}

function getGlobalAppointments() {
    return globalAppointments;
}

function setEditedCurrentTime(newMonth, newYear) {
    globalDate = { month: newMonth, year: newYear }
  return  ;
}

function getEditedCurrentTime(){
    console.log(globalDate)
    return globalDate
}

export {setGlobalAppointments,getGlobalAppointments, setEditedCurrentTime, getEditedCurrentTime}