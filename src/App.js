import React, { Fragment, useState } from "react";
import "h8k-components";

import { AddEmployee, Employee } from "./components";

const title = "Editable Table";

const employeesList = [
  {
    id: 0,
    name: "Chris Hatch",
    position: "Software Developer",
    salary: 130000,
  },
  {
    id: 1,
    name: "Elizabeth Montgomery",
    position: "Lead Research Engineer",
    salary: 70000,
  },
  {
    id: 2,
    name: "Aiden Shaw",
    position: "Machine Learning Engineer",
    salary: 80000,
  },
];

const App = () => {
  const [listOfEmployee, setEmployeeList] = useState(employeesList);

  const handlerEditEmployee = (employee) => {
    const selectEmployee = listOfEmployee.find((val) => val.id === employee.id);
    selectEmployee.salary = employee.salary;
  };

  const handlerAddEmployee = (employee) => {
    setEmployeeList((prev) => {
      const lastEmployee = prev[prev.length - 1];
      return [
        ...prev,
        {
          id: lastEmployee.id + 1,
          ...employee,
        },
      ];
    });
  };

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="card w-45 mx-auto mt-75 pb-5">
        <table data-testid="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listOfEmployee.map((employee, idx) => (
              <tr key={employee.id} data-testid={`row-${idx}`}>
                <Employee
                  idx={idx}
                  employeName={employee.name}
                  position={employee.position}
                  salary={employee.salary}
                  handlerEditEmployee={handlerEditEmployee}
                />
              </tr>
            ))}
            <tr>
              <AddEmployee handlerAddEmployee={handlerAddEmployee} />
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default App;
