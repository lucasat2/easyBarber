let globalAppointments = [];

function setGlobalAppointments(appointments) {
    globalAppointments = appointments;
}

function getGlobalAppointments() {
    return globalAppointments;
}

export {setGlobalAppointments,getGlobalAppointments}