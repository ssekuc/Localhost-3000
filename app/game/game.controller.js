//Show add page
export function DisplayAddPage(req, res, next){
    if(!req.user){
        return res.redirect('/user/login')
    }

    return res.render('index', { page: 'add', user: req.user });
}

export function DisplayActiveListPage(req, res, next){

    return res.render('index', { page: 'activeList', user: req.user });
}

export function DisplayPastListPage(req, res, next){

    return res.render('index', { page: 'pastList', user: req.user });
}
