module.exports.checkPassword = function(serverpass, localpass) {
    if (serverpass === localpass) {
        return true
    } else {
        return false
    }
}