async function fetchGraphQLData(query) {
  try {
    // Fetch data from GraphQL endpoint
    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const result = await response.json();
    // const result = JSON.parse(body);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}
class EmployeeCreate extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container px-5 my-5 px-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row gx-5 justify-content-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-lg-6"
    }, /*#__PURE__*/React.createElement("form", {
      name: "employeeCreate",
      onSubmit: this.handleSubmit,
      noValidate: true
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-floating mb-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "firstName",
      name: "firstName",
      className: "form-control",
      placeholder: "First Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "firstName"
    }, "First Name")), /*#__PURE__*/React.createElement("div", {
      className: "form-floating mb-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "lastName",
      name: "lastName",
      className: "form-control",
      placeholder: "Last Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "lastName"
    }, "Last Name")), /*#__PURE__*/React.createElement("div", {
      className: "form-floating mb-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      id: "age",
      name: "age",
      className: "form-control",
      placeholder: "Age"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "age"
    }, "Age")), /*#__PURE__*/React.createElement("div", {
      className: "form-floating mb-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "dateOfJoining",
      name: "dateOfJoining",
      className: "form-control",
      placeholder: "Date of Joining"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "dateOfJoining"
    }, "Date Of Joining")), /*#__PURE__*/React.createElement("div", {
      className: "form-floating mb-3"
    }, /*#__PURE__*/React.createElement("select", {
      id: "title",
      name: "title",
      className: "form-select",
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Select Title"), /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP")), /*#__PURE__*/React.createElement("label", {
      htmlFor: "title"
    }, "Title")), /*#__PURE__*/React.createElement("div", {
      className: "form-floating mb-3"
    }, /*#__PURE__*/React.createElement("select", {
      id: "department",
      name: "department",
      className: "form-select",
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Select Department"), /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Engineering"
    }, "Engineering")), /*#__PURE__*/React.createElement("label", {
      htmlFor: "department"
    }, "Department")), /*#__PURE__*/React.createElement("div", {
      className: "form-floating mb-3"
    }, /*#__PURE__*/React.createElement("select", {
      id: "employeeType",
      name: "employeeType",
      className: "form-select",
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Select Employee Type"), /*#__PURE__*/React.createElement("option", {
      value: "FullTime"
    }, "Full Time"), /*#__PURE__*/React.createElement("option", {
      value: "PartTime"
    }, "Part Time"), /*#__PURE__*/React.createElement("option", {
      value: "Contract"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "Seasonal"
    }, "Seasonal")), /*#__PURE__*/React.createElement("label", {
      htmlFor: "employeeType"
    }, "Employee Type")), /*#__PURE__*/React.createElement("div", {
      className: "d-grid"
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "btn btn-primary btn-lg btn-add"
    }, "Add"))))));
  }
  async handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.employeeCreate;
    let firstName = form.firstName.value;
    let lastName = form.lastName.value;
    const age = form.age.value;
    const dateOfJoining = form.dateOfJoining.value;
    const title = form.title.value;
    const department = form.department.value;
    const employeeType = form.employeeType.value;

    // Capitalize the first letter of first name and last name
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const newEmployee = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      dateOfJoining: dateOfJoining,
      title: title,
      department: department,
      employeeType: employeeType
    };
    try {
      await this.props.createEmployee(newEmployee);
      form.firstName.value = "";
      form.lastName.value = "";
      form.age.value = "";
      form.dateOfJoining.value = "";
      form.title.value = "";
      form.department.value = "";
      form.employeeType.value = "";
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  }
}
class EmployeeSearch extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        padding: '10px',
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: '30px auto'
      }
    }, /*#__PURE__*/React.createElement("h2", null, "Employee search"), /*#__PURE__*/React.createElement("div", {
      className: "d-flex"
    }, /*#__PURE__*/React.createElement("input", {
      type: "search",
      className: "form-control me-sm-2",
      placeholder: "To be implemented in Assignment 2"
    }), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary my-2 my-sm-0",
      type: "submit"
    }, "Search")));
  }
}
const EmployeeTable = props => {
  const rowStyle = {
    border: "1px solid purple",
    padding: 4,
    backgroundColor: "#593196",
    color: "white"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "container-fluid mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row justify-content-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-10"
  }, /*#__PURE__*/React.createElement("table", {
    className: "table table-striped"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "ID"), /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "First Name"), /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "Last Name"), /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "Age"), /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "Date Of Joining"), /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "Title"), /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "Department"), /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "Employee Type"), /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, props.employees.map(employee => /*#__PURE__*/React.createElement(EmployeeRow, {
    key: employee.id,
    employee: employee
  })))))));
};
function EmployeeRow(props) {
  const employee = props.employee;
  const rowStyle = {
    border: "1px solid purple",
    padding: 4
  };
  if (employee.currentStatus === true) {
    employee.currentStatus = "1";
  } else {
    employee.currentStatus = "0";
  }
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.id), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.firstName), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.lastName), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.age), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.dateOfJoining), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.title), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.department), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.employeeType), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.currentStatus));
}
class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
  }
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        padding: '10px'
      }
    }, /*#__PURE__*/React.createElement("h2", null, " Employees")), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        padding: '10px'
      }
    }, /*#__PURE__*/React.createElement("h2", null, " Add New Employee")), /*#__PURE__*/React.createElement(EmployeeCreate, {
      createEmployee: this.createEmployee.bind(this)
    }));
  }
  componentDidMount() {
    setTimeout(() => {
      this.loadData();
    }, 500);
  }
  async loadData() {
    const query = `query{employeeList{
            id,
            firstName,
            lastName,
            age,
            dateOfJoining, 
            title,
            department,
            employeeType, 
            currentStatus
        }}`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const result = await response.json();
    console.log(result);
    this.setState({
      employees: result.data.employeeList
    });
  }
  async createEmployee(employee) {
    const options = {
      timeZone: 'UTC'
    };
    const formattedDate = new Date(employee.dateOfJoining).toLocaleDateString('en-CA', options);
    const query = `mutation {employeeCreate(employee: {
            firstName:"${employee.firstName}",
            lastName:"${employee.lastName}",
            age:${employee.age || '0'},
            dateOfJoining: "${formattedDate}",
            title:${employee.title || 'None'}, 
            department:${employee.department || 'None'},
            employeeType:${employee.employeeType || 'None'},
        }){
            id, 
            firstName, 
            lastName,
            age,
            dateOfJoining,
            title,
            department,
            employeeType,
            currentStatus
        }}`;
    const data = await fetchGraphQLData(query, {
      employee
    });
    if (data) {
      this.loadData();
    }
  }
}
const element = /*#__PURE__*/React.createElement(EmployeeDirectory, null);
ReactDOM.render(element, document.getElementById('root'));