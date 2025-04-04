export function EmployeeCard(employee) {
  const card = document.createElement('div');
  card.className = 'employee-card';

  const avatar = document.createElement('div');
  avatar.className = 'employee-avatar';

  const info = document.createElement('div');
  info.className = 'employee-info';

  const name = document.createElement('h3');
  name.className = 'employee-name';
  name.textContent = employee.name;

  const role = document.createElement('p');
  role.className = 'employee-role';
  role.textContent = employee.role;

  info.appendChild(name);
  info.appendChild(role);

  const date = document.createElement('div');
  date.className = 'employee-date';

  const startDate = document.createElement('div');
  startDate.textContent = employee.startDate;

  const days = document.createElement('div');
  days.className = 'employee-days';
  days.textContent = `Entrou há ${employee.daysAgo} dias`;

  date.appendChild(startDate);
  date.appendChild(days);

  card.appendChild(avatar);
  card.appendChild(info);
  card.appendChild(date);

  return card;
}