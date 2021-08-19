let login = (req,res,user)=> {
    res.session.auth = {
        userId: user.id
    }
}


module.exports = login
