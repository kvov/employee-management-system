import { HashRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Page from "./Page";

const element = (
    <Router>
        <Page />
    </Router>
)
createRoot(document.getElementById('root')).render(element);
