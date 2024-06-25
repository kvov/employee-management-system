import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import fetchGraphQLData from "../graphQLFetch";

function EmployeeDirectory() {
    const location = useLocation();
    const navigate = useNavigate();
    // const { id: urlId } = useParams();
    const [employees, setEmployees] = useState([]);
    const [employeeType, setEmployeeType] = useState('');

    useEffect(() => {
        loadData();
    }, [location, employeeType]); 

    const loadData = async () => {
        //added
        const params = new URLSearchParams(location.search);
        const filter = {};
        if (params.get('employeeType')) filter.employeeType = params.get('employeeType');
        //
        const query = `query employeeList($employeeType: EmployeeType){
            employeeList(employeeType: $employeeType) {
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

        const data = await fetchGraphQLData(query, filter);
        if (data) {
            setEmployees(data.employeeList);
        }
    }

    const deleteEmployee = async (index) => {
        const { id } = employees[index];
        const query = `mutation employeeDelete($id: Int!) {
            employeeDelete(id: $id)
        }`;

        const data = await fetchGraphQLData(query, { id });

        if (data && data.employeeDelete) {
            setEmployees(prevEmployees => prevEmployees.filter((_, i) => i !== index));
            const params = new URLSearchParams(location.search);
            if (employeeType && params.get('employeeType')) {
                navigate('/employees', { replace: true });
            }
            window.alert('Employee deleted successfully.');
        } else {
            loadData();
            window.alert('Failed to delete employee.');
        }
    }

    return (
        <React.Fragment>
            <EmployeeSearch initialEmployeeType={employeeType}/>
            <hr />
            <div style={{ textAlign: 'center', padding: '10px' }}><h2>Employees</h2></div>
            <EmployeeTable employees={employees} deleteEmployee={deleteEmployee} />
        </React.Fragment>
    );
}

export default function EmployeeWrapper() {
    const [searchParams] = useSearchParams();
    const employeeType = searchParams.get('employeeType');
    return <EmployeeDirectory employeeType={employeeType} />;
}
