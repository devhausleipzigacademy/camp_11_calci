import "./style.css";

const addEmployeeBtn = document.querySelector("#add-employee");
const employeeModal = document.querySelector("#employee-modal");
const employeeForm = employeeModal.querySelector("form");
const employeeList = document.querySelector("#employee-list");

function initEmployees() {
  const existingEmployees = JSON.parse(localStorage.getItem("employees"));
  if (!existingEmployees) {
    const heading = document.createElement("h2");
    heading.innerText = "No employees found";
    heading.classList.add("text-3xl", "font-bold", "text-center");
    employeeList.append(heading);
    return;
  }

  existingEmployees.forEach((employee) => {
    const employeeItem = document.createElement("li");
    employeeItem.classList.add(
      "bg-purple-500",
      "text-white",
      "py-2",
      "px-6",
      "rounded-md",
      "shadow-md",
      "flex",
      "justify-between"
    );
    employeeItem.innerHTML = `
    <span>Name: ${employee.name}</span>
    <span>Team: ${employee.team}</span>
    <span>Salary hr: ${employee.salary}</span>
    `;

    employeeList.append(employeeItem);
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

  const existingEmployees = JSON.parse(localStorage.getItem("employees")) || [];

  localStorage.setItem(
    "employees",
    JSON.stringify([...existingEmployees, formData])
  );

  const employeeItem = document.createElement("li");
  employeeItem.classList.add(
    "bg-purple-500",
    "text-white",
    "py-2",
    "px-6",
    "rounded-md",
    "shadow-md",
    "flex",
    "justify-between"
  );
  employeeItem.innerHTML = `
  <span>Name: ${formData.name}</span>
  <span>Team: ${formData.team}</span>
  <span>Salary hr: ${formData.salary}</span>
  `;

  employeeList.append(employeeItem);

  employeeForm.reset();
  employeeModal.classList.remove("show-modal");
});

addEmployeeBtn.addEventListener("click", () => {
  employeeModal.classList.toggle("show-modal");
});

initEmployees();
