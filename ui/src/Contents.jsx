import {Routes, Route, Navigate} from "react-router-dom";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeWrapper from "./EmployeeDirectory";
import EmployeeCreatePage from "./EmployeeCreatePage";
import EmployeeDetail from "./EmployeeDetail";

export default function Contents() {
    const NotFound = () => <h2>Page Not Found</h2>;
    return(
        <Routes>
            <Route path="/" element={<Navigate to="/employees" />} />
            <Route path="/employees" element={<EmployeeWrapper/>} />
            <Route path="/edit/:id" element={<EmployeeEdit/>} />
            <Route path="/employees-add" element={<EmployeeCreatePage />} />
            <Route path="/employees/:id" element={<EmployeeDetail />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}