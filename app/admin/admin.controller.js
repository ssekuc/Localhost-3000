//Show admin home page
export function DisplayAdminHomePage(req, res, next){
    if(!req.user){
        return res.redirect('/user/login')
    }

    return res.render('index', { page: 'adminHome', user: req.user });
}