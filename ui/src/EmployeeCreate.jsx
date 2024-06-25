import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeCreate(props) {
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const age = form.age.value;
        const dateOfJoining = form.dateOfJoining.value;
        const title = form.title.value;
        const department = form.department.value;
        const employeeType = form.employeeType.value;

        // Capitalize the first letter of first name and last name
        const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

        const newEmployee = {
            firstName: capitalizedFirstName,
            lastName: capitalizedLastName,
            age: age,
            dateOfJoining: dateOfJoining,
            title: title,
            department: department,
            employeeType: employeeType
        };
    
        try {
            await props.createEmployee(newEmployee);
    
            // Show success alert
            alert('Employee added successfully');
    
            // Reset form fields
            form.reset();
    
            // Navigate to employees list page
            navigate('/employees');
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    }

    return (
        <div className="container px-5 my-5 px-5">
            <div className="row gx-5 justify-content-center">
                <div className="col-lg-6">
                    <form name="employeeCreate" onSubmit={handleSubmit} noValidate>
                        <div className="form-floating mb-3">
                            <input type="text" id="firstName" name="firstName" className="form-control" placeholder="First Name"/>
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Last Name" />
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" id="age" name="age" className="form-control" placeholder="Age" />
                            <label htmlFor="age">Age</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" id="dateOfJoining" name="dateOfJoining" className="form-control" placeholder="Date of Joining" />
                            <label htmlFor="dateOfJoining">Date Of Joining</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select id="title" name="title" className="form-select" required>
                                <option value="">Select Title</option>
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                                <option value="VP">VP</option>
                            </select>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select id="department" name="department" className="form-select" required>
                                <option value="">Select Department</option>
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Engineering">Engineering</option>
                            </select>
                            <label htmlFor="department">Department</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select id="employeeType" name="employeeType" className="form-select" required>
                                <option value="">Select Employee Type</option>
                                <option value="FullTime">Full Time</option>
                                <option value="PartTime">Part Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Seasonal">Seasonal</option>
                            </select>
                            <label htmlFor="employeeType">Employee Type</label>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg btn-add">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmployeeCreate;
