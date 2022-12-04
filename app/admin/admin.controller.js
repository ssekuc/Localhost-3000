import User from "../user/user.model.js";

//Show admin home page
export function DisplayAdminHomePage(req, res, next){
    if(!req.user){
        return res.redirect('/user/login')
    }

    User.find((err, users) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        return res.render('index', { page: 'adminHome', user: req.user, users });
    })
}