import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeSearch({ initialEmployeeType }) {
    const [employeeType, setEmployeeType] = useState(initialEmployeeType || "");
    const [changed, setChanged] = useState(false);
    const navigate = useNavigate();
    
    const onChangeEmployeeType = (e) => {
        setEmployeeType(e.target.value);
        setChanged(true);
        
    };
    
    const applyFilter = () => {
        navigate(`/employees${employeeType ? `?employeeType=${employeeType}` : ''}`);
    };

    return (
        <div style={{ textAlign: 'center', padding: '10px', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '30px auto' }}>
            <h2>Employee Search by Type</h2>
            <div className="form-floating mb-3">                            
                <select className="form-select" onChange={onChangeEmployeeType} value={employeeType}>
                    <option value="">All</option>
                    <option value="FullTime">Full Time</option>
                    <option value="PartTime">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Seasonal">Seasonal</option>
                </select>
            </div>
            <button type="button" className="btn btn-primary btn-lg btn-add" onClick={applyFilter}>Apply</button>
            
        </div>
    );
}

export default EmployeeSearch;
