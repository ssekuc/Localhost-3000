//Show add page
export function DisplayHomePage(req, res, next){
    
    return res.render('index', { page: 'home', user: req.user });
    
}