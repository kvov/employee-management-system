import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchGraphQLData from '../graphQLFetch';

export default function EmployeeDetail() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const query = `query employee($id: Int!) {
                employee(id: $id) {
                    id
                    firstName
                    lastName
                    age
                    dateOfJoining
                    title
                    department
                    employeeType
                    currentStatus
                }
            }`;
            const data = await fetchGraphQLData(query, { id });
            if (data && data.employee) {
                setEmployee(data.employee);
            } else {
                setEmployee({});
            }
        };
        loadData();
    }, [id]);

    return (
        <div className="container px-5 my-5 px-5">
            <div className="row gx-5 justify-content-center">
                <div className="col-lg-6">
                <h3>Employee Details</h3>
                <table class="table table-hover">
                    <tbody>
                        <tr class="table-primary">
                            <th>ID</th>
                            <td>{employee.id}</td>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <td>{employee.firstName}</td>
                        </tr>
                        <tr class="table-secondary">
                            <th>Last Name</th>
                            <td>{employee.lastName}</td>
                        </tr>
                        <tr>
                            <th>Age</th>
                            <td>{employee.age}</td>
                        </tr>
                        <tr class="table-secondary">
                            <th>Date of Joining</th>
                            <td>{employee.dateOfJoining}</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>{employee.title}</td>
                        </tr>
                        <tr class="table-secondary">
                            <th>Department</th>
                            <td>{employee.department}</td>
                        </tr>
                        <tr>
                            <th>Employee Type</th>
                            <td>{employee.employeeType}</td>
                        </tr>
                        <tr class="table-secondary">
                            <th>Current Status</th>
                            <td>{employee.currentStatus ? '1' : '0'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}
