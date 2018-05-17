/**
 * Checks to see if the entered password matches the one from the database
 * @param {string} serverpass - the password from the server 
 * @param {string} localpass  - the password entered by the user
 * @returns {boolean} - True if the passwords match, False if otherwise
 */

module.exports.checkPassword = function(serverpass, localpass) {
    if (serverpass === localpass) {
        return true
    } else {
        return false
    }
}