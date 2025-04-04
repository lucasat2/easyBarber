import { EmployeeCard } from './EmployeeCard.js';

export function EmployeeList(employees) {
  const employeeList = document.createElement('div');
  employeeList.className = 'employee-list';

  employees.forEach(employee => {
    employeeList.appendChild(EmployeeCard(employee));
  });

  return employeeList;
}