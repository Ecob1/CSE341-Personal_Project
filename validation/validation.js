handleErrors = (fn) => (req, res, next) => 
    Promise.resolve((req, res, next)).catch((error) => console.log(error));
module.exports = {handleErrors};