let aboutMessage = "Employee Management System API v1.0";
function setAboutMessage(_, { message }) {
    const newAboutMessage = message;
    return newAboutMessage;
}

function getAboutMessage() {
    return aboutMessage;
}

module.exports = { setAboutMessage, getAboutMessage };