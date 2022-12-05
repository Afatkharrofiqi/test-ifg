import React, { Fragment, useEffect, useState } from "react";

const AddEmployee = ({ handlerAddEmployee }) => {
  const [employeeName, setEmployeeName] = useState(null);
  const [position, setPosition] = useState(null);
  const [salary, setSalary] = useState(null);
  const [submitBtn, setSubmitBtn] = useState(true);

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    switch (nameInput) {
      case "employeeName":
        setEmployeeName(value);
        break;
      case "position":
        setPosition(value);
        break;
      case "salary":
        setSalary(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const newEmployee = {
      name: employeeName,
      position: position,
      salary: parseInt(salary),
    };
    handlerAddEmployee(newEmployee);
    resetField();
  };

  const resetField = () => {
    setEmployeeName(null);
    setPosition(null);
    setSalary(null);
  };

  useEffect(() => {
    if (employeeName && position && salary) {
      setSubmitBtn(false);
    } else {
      setSubmitBtn(true);
    }
  }, [employeeName, position, salary]);

  return (
    <Fragment>
      <td className="pl-30">
        <input
          data-testid="new-employee-name-input"
          placeholder="Enter Name"
          name="employeeName"
          value={employeeName ?? ""}
          onChange={handleInput}
        />
      </td>
      <td className="pl-20">
        <input
          data-testid="new-employee-position-input"
          placeholder="Enter Position"
          name="position"
          value={position ?? ""}
          onChange={handleInput}
        />
      </td>
      <td className="pl-20">
        <input
          data-testid="new-employee-salary-input"
          type="number"
          name="salary"
          placeholder="Enter Salary"
          value={salary ?? ""}
          onChange={handleInput}
        />
      </td>
      <td className="pl-20">
        <button
          data-testid="add-new-employee-button"
          className="x-small w-75 ma-0 px-25"
          onClick={handleSubmit}
          disabled={submitBtn}
        >
          Add
        </button>
      </td>
    </Fragment>
  );
};

export default AddEmployee;
