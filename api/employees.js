const { UserInputError } = require('apollo-server-express');
const { getDb } = require('./db');

//Turn employeelist into async function
async function list(_, {employeeType}) { 

    //Get list of employees from employees collection and return
    const filter = {};
    if(employeeType) filter.employeeType = employeeType;
    const db = getDb();
    const employees = await db.collection('employees').find(filter).toArray();
	return employees;

}

function validateEmployee(employee) {
    const errors = [];
    if (employee.firstName.length < 1) {
        errors.push('Enter first name.');
    }
    if (employee.lastName.length < 1) {
        errors.push('Enter last name.');
    }
    if (employee.age <= 20 || employee.age >= 70) {
        errors.push('Age must be between 20 and 70.');
    }
    if (employee.dateOfJoining == "Invalid Date") {
        errors.push('Date must be in format YYYY-MM-DD.');
    } else {
        if (new Date(employee.dateOfJoining) > new Date()) {
            errors.push('Date of joining cannot be in the future.');
        }
    }

    if (employee.title == "None") {
        errors.push('Select Title.');
    }
    if (employee.department == "None") {
        errors.push('Select Department.');
    }
    if (employee.employeeType == "None") {
        errors.push('Select Employee Type.');
    }

    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors });
    }
}

async function create(_, { employee }) {
    try {
        validateEmployee(employee);
        const db = getDb();
         // Find the highest existing ID
        const highestIdEmployee = await db.collection('employees').findOne({}, { sort: { id: -1 } });
        let newId = 1; // Default to 1 if no employees exist yet

        if (highestIdEmployee) {
            newId = highestIdEmployee.id + 1; // Increment the highest ID
        }

        // Assign the new ID to the employee
        employee.id = newId;

        employee.currentStatus = "true";

        // Insert the employee into the database
        const result = await db.collection('employees').insertOne(employee);
        
        return result.ops[0]; // Return the newly created employee
    } catch (error) {
        
        if (error instanceof UserInputError) {
                throw error;
            } else {
                throw new Error(`Failed to create employee: ${error}`);
            }
    }
}

async function get(_, { id }) {
    const db = getDb();
    const result = await db.collection('employees').findOne({ id });
    return result;
}

async function update(_, { id, employee }) {
    const db = getDb();
    const { firstName, lastName, title, department, employeeType, currentStatus } = employee;

    // Define update fields
    const updateFields = {};
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (title !== undefined) updateFields.title = title;
    if (department !== undefined) updateFields.department = department;
    if (employeeType !== undefined) updateFields.employeeType = employeeType;
    if (currentStatus !== undefined) updateFields.currentStatus = currentStatus;

    // Check if any updateable fields are provided
    if (Object.keys(updateFields).length === 0) {
        throw new Error(`No valid fields provided for update.`);
    }

    // Update the employee in the database
    const result = await db.collection('employees').updateOne(
        { id },
        { $set: updateFields }
    );

    // Check if the employee exists and was successfully updated
    if (result.modifiedCount === 0) {
        throw new Error(`Employee with id ${id} not found or not updated.`);
    }

    // Fetch and return the updated employee
    const savedEmployee = await db.collection('employees').findOne({ id });
    return savedEmployee;
}


async function remove(_, { id }) {
    const db = getDb();
    const employee = await db.collection('employees').findOne({ id });
    if (!employee) return false;
    employee.deleted = new Date();

    let result = await db.collection('deleted_employees').insertOne(employee);
    if (result.insertedId) {
        result = await db.collection('employees').removeOne({ id });
        return result.deletedCount === 1;
    }

    return false;
}


module.exports = { list, create, get, update, remove };