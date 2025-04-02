// Função para buscar serviços
async function fetchServices() {
  try {
    const response = await fetch("/api/services");

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.error || "Falha não identificada");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

// Função para buscar funcionários do servidor
async function fetchStaff() {
  try {
    const response = await fetch("/api/staff"); 

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.error || "Falha não identificada");
    }

    const result = await response.json();

    return result.response;
  } catch (error) {
    throw error;
  }
}

async function fetchAppointmentsByEmployee(employeeData) {
  try {
    const response = await fetch(`/api/appointments/${employeeData.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.error || "Falha não identificada");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export { fetchStaff, fetchServices, fetchAppointmentsByEmployee };