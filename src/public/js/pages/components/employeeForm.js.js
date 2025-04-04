export function EmployeeForm() {
  const form = document.createElement('div');
  form.className = 'employee-form';

  
  const employeeFormAvatarContainer = document.createElement('div');
  employeeFormAvatarContainer.className = 'employee-form-avatar-container';
  const employeeFormAvatarIcon = document.createElement('div');
  employeeFormAvatarIcon.className = 'employee-form-avatar-icon';

 
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
  svg.setAttribute('viewBox', '0 0 24 24');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M0 0h24v24H0z');
  path1.setAttribute('fill', 'none');

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22C6.8 15.7 9.22 15 12 15s5.2 0.7 6 1.98c-1.29 1.94-3.5 3.22-6 3.22z');

  svg.appendChild(path1);
  svg.appendChild(path2);
  employeeFormAvatarIcon.appendChild(svg);
  employeeFormAvatarContainer.appendChild(employeeFormAvatarIcon);


  const fields = [
    { label: 'Nome', id: 'name' },
    { label: 'Sobrenome', id: 'surname' },
    { label: 'CPF', id: 'cpf' },
    { label: 'Email', id: 'email' },
    { label: 'Telefone', id: 'phone' },
    { label: 'Data de Nascimento', id: 'birthdate' },
    { label: 'CEP', id: 'cep' },
  ];

  const fieldContainers = fields.map(field => {
    const container = document.createElement('div');
    container.className = 'employee-form-field-container';

    const label = document.createElement('label');
    label.textContent = field.label;
    label.setAttribute('for', field.id);

    const input = document.createElement('input');
    input.type = field.id === 'birthdate' ? 'date' : 'text';
    input.id = field.id;
    input.name = field.id;

    container.appendChild(label);
    container.appendChild(input);
    return container;
  });

 
  const buttons = document.createElement('div');
  buttons.className = 'employee-form-buttons';

  const scheduleButton = document.createElement('button');
  scheduleButton.textContent = 'Horários';
  scheduleButton.className = 'employee-form-schedule-button';

  const servicesButton = document.createElement('button');
  servicesButton.textContent = 'Serviços';
  servicesButton.className = 'employee-form-services-button';

  const saveButton = document.createElement('button');
  saveButton.textContent = '✓';
  saveButton.className = 'employee-form-save-button';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '️';
  deleteButton.className = 'employee-form-delete-button';

  buttons.appendChild(scheduleButton);
  buttons.appendChild(servicesButton);
  buttons.appendChild(saveButton);
  buttons.appendChild(deleteButton);

  
  form.appendChild(employeeFormAvatarContainer);
  fieldContainers.forEach(field => form.appendChild(field));
  form.appendChild(buttons);

  return form;
}