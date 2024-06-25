import React from "react";
import EmployeeCreate from "./EmployeeCreate";
import fetchGraphQLData from "../graphQLFetch";

export default class EmployeeCreatePage extends React.Component {
    constructor(props) {
        super(props);
    }

    async createEmployee(employee) {
        const options = { timeZone: 'UTC' }; 
        const formattedDate = new Date(employee.dateOfJoining).toLocaleDateString('en-CA', options);

        const query = `mutation {
            employeeCreate(employee: {
                firstName: "${employee.firstName}",
                lastName: "${employee.lastName}",
                age: ${(employee.age || '0')},
                dateOfJoining: "${formattedDate}",
                title: ${employee.title || 'None'}, 
                department: ${employee.department || 'None'},
                employeeType: ${employee.employeeType || 'None'}
            }) {
                id, 
                firstName, 
                lastName,
                age,
                dateOfJoining,
                title,
                department,
                employeeType,
                currentStatus
            }
        }`;

        const data = await fetchGraphQLData(query);
        if (data) {
            console.log("Employee created successfully:", data.employeeCreate);
        }
    }

    render() {
        return (
            <div>
                <div style={{ textAlign: 'center', padding: '30px' }}>
                    <h2> Add New Employee</h2>
                </div>
                <EmployeeCreate createEmployee={this.createEmployee.bind(this)} />
            </div>
        );
    }
}
