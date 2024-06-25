import { Link } from "react-router-dom";

export default function EmployeeRow(props) { 
    const { employee, index, deleteEmployee } = props;
    const rowStyle = {border:"1px solid purple", padding:4};

    if(employee.currentStatus === true) {
        employee.currentStatus = "1";
    } else if(employee.currentStatus === false) {
        employee.currentStatus = "0";
    }
    return (
        <tr>
        <td style={rowStyle}>{employee.id}</td>
        <td style={rowStyle}>{employee.firstName}</td>
        <td style={rowStyle}>{employee.lastName}</td>
        <td style={rowStyle}>{employee.age}</td>
        <td style={rowStyle}>{employee.dateOfJoining}</td>
        <td style={rowStyle}>{employee.title}</td>
        <td style={rowStyle}>{employee.department}</td>
        <td style={rowStyle}>{employee.employeeType}</td>
        <td style={rowStyle}>{employee.currentStatus}</td>
        <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...rowStyle }}>
            <Link className="badge rounded-pill bg-primary" style={{ textDecoration: 'none', margin: "2px", fontSize: "15px" }} to={`/employees/${employee.id}`}>Select</Link>
            <Link className="badge rounded-pill bg-warning" style={{ textDecoration: 'none', margin: "2px", fontSize: "15px" }} to={`/edit/${employee.id}`}>Edit</Link>
            <button className="badge rounded-pill bg-danger" style={{ border: 'none', margin: "2px", fontSize: "15px" }} onClick={() => deleteEmployee(index)}>Delete</button>
        </td>
    </tr>

    )
}