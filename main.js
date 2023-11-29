import "./style.css";
import { v4 as uuid } from "uuid";

const addEmployeeBtn = document.querySelector("#add-employee");
const employeeModal = document.querySelector("#employee-modal");
const employeeForm = employeeModal.querySelector("form");
const employeeList = document.querySelector("#employee-list");
const EMPLOYEE_KEY = "employees";

function createEmployeeItem(empl) {
  /* empl =  {
  id: "123",
  name: "John",
  team: "Frontend",
  salary: "1000",
} */
  const employeeItem = document.createElement("li");
  employeeItem.id = empl.id;
  employeeItem.classList.add(
    "bg-purple-500",
    "text-white",
    "py-2",
    "px-6",
    "rounded-md",
    "shadow-md",
    "flex",
    "justify-between",
    "items-center"
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add(
    "text-white",
    "py-1",
    "px-2",
    "rounded-md",
    "shadow-md",
    "text-sm",
    "font-bold"
  );
  deleteBtn.innerText = "Delete";

  deleteBtn.addEventListener("click", () => {
    const employees = JSON.parse(localStorage.getItem(EMPLOYEE_KEY));
    const filteredEmployees = employees.filter((employee) => {
      return employee.id !== empl.id;
    });

    localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(filteredEmployees));
    employeeItem.remove();
    if (!filteredEmployees || filteredEmployees.length === 0) {
      const heading = document.createElement("h2");
      heading.innerText = "No employees found";
      heading.classList.add("text-3xl", "font-bold", "text-center");
      employeeList.append(heading);
      return;
    }
  });

  employeeItem.innerHTML = `
    <span>Name: ${empl.name}</span>
    <span>Team: ${empl.team}</span>
    <span>Salary hr: ${empl.salary}</span>
    `;

  employeeItem.append(deleteBtn);

  return employeeItem;
}

function initEmployees() {
  const existingEmployees = JSON.parse(localStorage.getItem(EMPLOYEE_KEY));
  if (!existingEmployees || existingEmployees.length === 0) {
    const heading = document.createElement("h2");
    heading.innerText = "No employees found";
    heading.classList.add("text-3xl", "font-bold", "text-center");
    employeeList.append(heading);
    return;
  }

  existingEmployees.forEach((employee) => {
    const item = createEmployeeItem(employee);

    employeeList.append(item);
  });
}

employeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(employeeForm));

  /*@Todo Clever Validation */
  if (formData.name === "" || formData.team === "" || formData.salary === "") {
    alert("Please fill all the fields");
    return;
  }

  const existingEmployees =
    JSON.parse(localStorage.getItem(EMPLOYEE_KEY)) || [];

  const newEmployee = { ...formData, id: uuid() };
  /*   {
  id: "123",
  name: "John",
  team: "Frontend",
  salary: "1000",
} */

  localStorage.setItem(
    EMPLOYEE_KEY,
    JSON.stringify([...existingEmployees, newEmployee])
  );

  const newEmployeeItem = createEmployeeItem(newEmployee);
  employeeList.querySelector("h2").remove();
  employeeList.append(newEmployeeItem);

  employeeForm.reset();
  employeeModal.classList.remove("show-modal");
});

addEmployeeBtn.addEventListener("click", () => {
  employeeModal.classList.toggle("show-modal");
});

initEmployees();
