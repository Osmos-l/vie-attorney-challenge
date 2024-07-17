/**
 * Build correctly the success response
 * @param {*} code the code response
 * @param {*} data data to be send
 * @param {*} res 
 * @returns response built
 */
const success = (code, data, res) => {
    return res.status(code).json({ success: true, data });
}
  
/**
 * Build correctly the error response
 * @param {*} error The error thrown
 * @param {*} res 
 * @returns response built
 */
const error = (error, res) => {
    // TODO: Log the error into dashboard IT team
    console.log("An error occured");
    console.error(error);

    return res.status(400).json({ success: false });
}

export default { success, error };