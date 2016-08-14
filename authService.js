module.exports = {
    //ideally this will be a service/DB to do this
    authenticate: function(name, password) {
        if(name && password) {
            if(name === "neo") {
                if(password === "keanu") {
                    return true;
                } else {
                    return false;
                }
            }
            if(name === "morpheus") {
                if(password === "laurence") {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
}