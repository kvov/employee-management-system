import EmployeeRow from "./EmployeeRow";
const EmployeeTable = (props) => { 

    const rowStyle = {border:"1px solid purple", padding:4, backgroundColor: "#593196", color: "white"};
    
    return (
        <div className="container-fluid mb-5">
            <div className="row justify-content-center">
                <div className="col-10">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th style={rowStyle}>ID</th>
                                <th style={rowStyle}>First Name</th>
                                <th style={rowStyle}>Last Name</th>
                                <th style={rowStyle}>Age</th>
                                <th style={rowStyle}>Date Of Joining</th>
                                <th style={rowStyle}>Title</th>
                                <th style={rowStyle}>Department</th>
                                <th style={rowStyle}>Employee Type</th>
                                <th style={rowStyle}>Current Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.employees.map((employee, index) => <EmployeeRow key={employee.id} employee={employee} index={index} deleteEmployee={props.deleteEmployee}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default EmployeeTable;