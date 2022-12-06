import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  act,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import Employee from "./components/Employee.js";

const TEST_IDS = {
  tableId: "table",
  newEmplNameInputId: "new-employee-name-input",
  newEmplPosInputId: "new-employee-position-input",
  newEmplSalaryInputId: "new-employee-salary-input",
  addNewEmplBtnId: "add-new-employee-button",
  emplSalaryDivPrefix: "employee-salary-div-",
  emplSalaryInputPrefix: "employee-salary-input-",
  emplSaveBtnPrefix: "employee-save-button-",
};

describe("Editable Table", () => {
  let getByTestId;
  let queryByTestId;
  let table;
  let newEmplNameInput;
  let newEmplPosInput;
  let newEmplSalaryInput;
  let addNewEmplBtn;
  let emplSalaryDiv2;
  let emplSalaryInput2;
  let emplSaveBtn2;

  beforeEach(() => {
    const app = render(<App />);
    getByTestId = app.getByTestId;
    queryByTestId = app.queryByTestId;
    table = getByTestId(TEST_IDS.tableId);
    newEmplNameInput = getByTestId(TEST_IDS.newEmplNameInputId);
    newEmplPosInput = getByTestId(TEST_IDS.newEmplPosInputId);
    newEmplSalaryInput = getByTestId(TEST_IDS.newEmplSalaryInputId);
    addNewEmplBtn = getByTestId(TEST_IDS.addNewEmplBtnId);
    emplSalaryDiv2 = getByTestId(TEST_IDS.emplSalaryDivPrefix + "1");
    emplSaveBtn2 = getByTestId(TEST_IDS.emplSaveBtnPrefix + "1");
  });

  afterEach(() => {
    cleanup();
  });

  const addNewEmployee = (name, position, salary) => {
    fireEvent.change(newEmplNameInput, { target: { value: name } });
    fireEvent.change(newEmplPosInput, { target: { value: position } });
    fireEvent.change(newEmplSalaryInput, { target: { value: salary } });
  };

  it("should initially render a 5-row table, and save and add buttons are disabled", () => {
    expect(table.rows.length).toEqual(5);
    expect(emplSaveBtn2).toBeDisabled();
    expect(addNewEmplBtn).toBeDisabled();
  });

  it("should result in appropriate UI changes when employee salary changes to a new valid value", () => {
    fireEvent.click(emplSalaryDiv2, { button: "0" });
    // Nyari make metho getByTestId
    emplSalaryInput2 = getByTestId(`${TEST_IDS.emplSalaryDivPrefix}1`);
    // Ngecek apakah salary element ada
    expect(emplSalaryInput2).toBeInTheDocument();
    // Membuat event double click untuk menampilkan element input
    fireEvent.dblClick(emplSalaryInput2);
    // Mengubah value input dengan menggunakan test id dari input
    fireEvent.change(getByTestId(`${TEST_IDS.emplSalaryInputPrefix}1`), {
      target: { value: "110000" },
    });
    fireEvent.click(emplSaveBtn2, { button: "0" });
    emplSalaryDiv2 = queryByTestId(`${TEST_IDS.emplSalaryDivPrefix}1`);
    expect(emplSalaryInput2).not.toBeInTheDocument();
    expect(emplSalaryDiv2).toBeInTheDocument();
    expect(emplSalaryDiv2.textContent).toEqual("110000");
  });

  it("save button should be disabled when employee salary changes to an invalid value", () => {
    fireEvent.click(emplSalaryDiv2, { button: "0" });
    // Nyari make metho getByTestId
    emplSalaryInput2 = getByTestId(`${TEST_IDS.emplSalaryDivPrefix}1`);
    expect(emplSalaryInput2).toBeInTheDocument();
    fireEvent.dblClick(emplSalaryInput2);
    // fireEvent.change(emplSalaryInput2, { target: { value: "70000" } });
    // Karena sebelumnya input salary sudah diubah menjadi 110000, maka saat ini value input salary adalah 110000
    // Input akan invalid jika value input salary sama 110000 jadi jika value input salary diubah menjadi 110000 maka input akan invalid
    // sedangkan jika diubah jadi 70000 maka input akan valid, jika input valid maka button akan enabled
    fireEvent.change(getByTestId(`${TEST_IDS.emplSalaryInputPrefix}1`), {
      target: { value: "110000" },
    });
    expect(emplSaveBtn2).toBeDisabled();
  });

  it("should add a new employee to the table with valid values and reset input fields", () => {
    addNewEmployee("Marlyn Smith", "IOS Developer", "80000");
    expect(addNewEmplBtn).toBeEnabled();
    fireEvent.click(addNewEmplBtn, { button: "0" });
    expect(table.rows.length).toEqual(6);
    expect(table.rows[4].textContent).toContain(
      "Marlyn SmithIOS Developer80000"
    );
    expect(table.rows[5].textContent).toEqual("Add");
  });

  it("adding a new employee with invalid values is not possible", () => {
    addNewEmployee("Melanie Yates", "Software Engineer", "120000");
    expect(addNewEmplBtn).toBeEnabled();
    addNewEmployee("", "Java Developer", "100000");
    expect(addNewEmplBtn).toBeDisabled();
    addNewEmployee("Paul Sanders", "", "50000");
    expect(addNewEmplBtn).toBeDisabled();
    addNewEmployee("Chris Hatch", "Android Developer", "");
    expect(addNewEmplBtn).toBeDisabled();
  });
});
