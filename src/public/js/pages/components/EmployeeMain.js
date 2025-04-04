import { EmployeeList } from './EmployeeList.js';
import { mockEmployees } from './employees.js';

document.addEventListener('DOMContentLoaded', () => {
	const app = document.querySelector('#app');

	const container = document.createElement('div');
	container.className = 'container';

	const newEmployeeButton = document.createElement('button');
	newEmployeeButton.className = 'new-employee-button';
	newEmployeeButton.textContent = 'Cadastrar um novo funcionário';

	container.appendChild(newEmployeeButton);
	container.appendChild(EmployeeList(mockEmployees));
	app.appendChild(container);
});