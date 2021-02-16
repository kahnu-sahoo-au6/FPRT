const utils = {}

utils.convertroletorolecode = (role)=>{
    if(role === 'user') return "user";
    else if(role === 'admin') return "admin";
}

module.exports = utils