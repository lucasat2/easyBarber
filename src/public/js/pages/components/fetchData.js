// Função para buscar serviços
async function fetchServices() {
    try {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Erro ao buscar serviços');
        const services = await response.json();
        return services;
    } catch (error) {
        console.error('Erro ao obter a lista de serviços:', error);
        return [];
    }
  }
  
  // Função para buscar funcionários do servidor
  async function fetchStaff() {
    try {
      const response = await fetch('/api/staff/');
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao buscar funcionários: ${errorMessage}`);
      }
      const { response: staff } = await response.json();
      
      staff.map(employee => ({
        id: employee.id,
        name:employee.name
      }))

      return staff;
    } catch (error) {
      console.error('Erro ao obter a lista de funcionários:', error.message);
      return [];
    }
  }

  export {fetchStaff, fetchServices}