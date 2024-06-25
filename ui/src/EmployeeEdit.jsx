import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fetchGraphQLData from '../graphQLFetch';

function EmployeeEdit() {
    const { id: paramsId } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        age: '',
        dateOfJoining: '',
        title: '',
        department: '',
        employeeType: '',
        currentStatus: '',
    });

    useEffect(() => {
        const loadData = async () => {
            const query = `
                query employee($id: Int!) {
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
                }
            `;
            const data = await fetchGraphQLData(query, { id: parseInt(paramsId) });
            if (data) {
                const employee = data.employee;

                setEmployee(employee);
            } else {
                setEmployee({ 
                    firstName: '',
                    lastName: '',
                    age: '',
                    dateOfJoining: '',
                    title: '',
                    department: '',
                    employeeType: '',
                    currentStatus: '' 
                });
            }
        };
        loadData();
    }, [paramsId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newValue = name === 'currentStatus' ? value === '1' : value;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const query = `
            mutation employeeUpdate($id: Int!, $employee: EmployeeUpdateInput!) {
                employeeUpdate(id: $id, employee: $employee) {
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
            }
        `;

        const { id, firstName, lastName, age, dateOfJoining, employeeType, ...employeeUpdates } = employee;

        const data = await fetchGraphQLData(query, { id, employee: employeeUpdates });

        if (data) {
            setEmployee(data.employeeUpdate);
            alert('Employee updated successfully');
            navigate(`/employees/${id}`);
        }
    };

    return (
        <div className="container px-5 my-5 px-5">
            <div className="row gx-5 justify-content-center">
                <div className="col-lg-6">  
                    <form onSubmit={handleSubmit}>
                        <h3>Editing Employee with ID {employee.id}</h3>
                        <table class="table table-hover">
                            <tbody>
                                <tr>
                                    <td><label>First Name</label></td>
                                    <td><input type="text" name="firstName" value={employee.firstName} readOnly /></td>
                                </tr>
                                <tr>
                                    <td><label>Last Name</label></td>
                                    <td><input type="text" name="lastName" value={employee.lastName} readOnly /></td>
                                </tr>
                                <tr>
                                    <td><label>Age</label></td>
                                    <td><input type="number" name="age" value={employee.age} readOnly /></td>
                                </tr>
                                <tr>
                                    <td><label>Date of Joining</label></td>
                                    <td><input type="text" name="dateOfJoining" value={employee.dateOfJoining} readOnly /></td>
                                </tr>
                                <tr>
                                    <td><label>Title</label></td>
                                    <td>
                                        <select name="title" value={employee.title} onChange={handleChange}>
                                            <option value="Employee">Employee</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Director">Director</option>
                                            <option value="VP">VP</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Department</label></td>
                                    <td>
                                        <select name="department" value={employee.department} onChange={handleChange}>
                                            <option value="IT">IT</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="HR">HR</option>
                                            <option value="Engineering">Engineering</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Current Status (1 or 0):</label>
                                    </td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="currentStatus" 
                                            value={employee.currentStatus ? '1' : '0'} 
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ textAlign: 'center', padding: '10px', width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '30px auto' }}>
                            <button className="btn btn-primary btn-lg btn-add" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmployeeEdit;