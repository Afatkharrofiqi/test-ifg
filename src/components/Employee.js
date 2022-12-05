import React, { Fragment, useEffect, useState } from "react";

const Employee = ({
  idx,
  employeName,
  position,
  salary,
  handlerEditEmployee,
}) => {
  const [buttonSave, setButtonSave] = useState(true);
  const [salaryInput, setSalaryInput] = useState(false);
  const [salaryValue, setSalaryValue] = useState(salary);
  const [disabledSalary, setDisabledSalary] = useState(true);

  const handleDoubleClick = (e) => {
    setSalaryInput(true);
    setDisabledSalary(false);
  };

  const handleInputSalary = (e) => {
    setSalaryValue(e.target.value);
  };

  const handleSave = () => {
    const employeeEdit = {
      id: idx,
      name: employeName,
      position: position,
      salary: parseInt(salaryValue),
    };
    handlerEditEmployee(employeeEdit);
    setSalaryInput(false);
    setDisabledSalary(true);
    setButtonSave(true);
  };

  useEffect(() => {
    if (salary !== parseInt(salaryValue)) {
      setButtonSave(false);
    } else {
      setButtonSave(true);
    }
  }, [setButtonSave, salary, salaryValue]);

  return (
    <Fragment>
      <td>{employeName}</td>
      <td className="pl-20">{position}</td>
      <td className="pl-20" onDoubleClick={handleDoubleClick}>
        {/* use this block of code when the salary field becomes editable */}
        {salaryInput ? (
          <input
            data-testid={"employee-salary-input-" + idx}
            onChange={handleInputSalary}
            value={salaryValue}
            disabled={disabledSalary}
            type="number"
          />
        ) : (
          <>
            <div data-testid={"employee-salary-div-" + idx}>{salaryValue}</div>
          </>
        )}
      </td>
      <td className="pl-20">
        <button
          className={"x-small w-75 ma-0 px-25"}
          data-testid={"employee-save-button-" + idx}
          disabled={buttonSave}
          onClick={handleSave}
        >
          Save
        </button>
      </td>
    </Fragment>
  );
};

export default Employee;
