import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <NavLink to="/employees" style={{ fontSize: "20px" }} className="nav-link" activeclassname="active">Employees</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/employees-add" style={{ fontSize: "20px" }} className="nav-link" activeclassname="active">Add Employee</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
