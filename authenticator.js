module.exports = {
	//use a DB to do this
	authenticate: function(name, password) {
		if(name === 'neo') {
			if(password === 'keanu') {
				return true;
			} else {
				return false;
			}
		}
		if(name === 'morpheus') {
			if(password === 'laurence') {
				return true;
			} else {
				return false;
			}
		}
	}
}