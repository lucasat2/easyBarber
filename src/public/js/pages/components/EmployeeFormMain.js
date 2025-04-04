import { EmployeeForm } from './employeeForm.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    root.appendChild(EmployeeForm());
  }
});