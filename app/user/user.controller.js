import passport from 'passport';
import User from './user.model.js';
import {GenerateToken} from '../utils/auth.js'

//Show login page
export function DisplayLoginPage(req, res, next){
    if(!req.user){
        return res.render('index', { page: 'login', user: req.user });
    }

    return res.redirect('/home');
}

//Show register page
export function DisplayRegisterPage(req, res, next){
    if(!req.user){
        return res.render('index', { page: 'register', user: req.user });
    }
    return res.redirect('/home');
}

//Login user
export function ProcessLogin(req, res, next){
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        if(!user){
            return res.json({success: false, msg: 'ERROR: Authentication Failed'});
        }

        req.logIn(user, (err) => {
            if (err){
                console.error(err);
                res.end(err);
            }
            return res.redirect('/home');


            // const authToken = GenerateToken(user);

            // return res.json({
            //     success: true,
            //     msg: 'User Logged In Successfully',
            //     user: {
            //         id: user._id,
            //         username: user.username,
            //         email: user.email,
            //         isAdmin: user.isAdmin,
            //         isPremium: user.isPremium
            //     },
            //     token: authToken
            // })
        })
    })(req, res, next);
}


//Insert new user
export function ProcessRegister(req, res, next){

    let newUser = new User({
        ...req.body,
        isAdmin: 'N',
        isPremium: 'N' 
    });

    User.register(newUser, req.body.password, (err) => {

        if(err){
            if(err.name === 'UserExistsError'){
                console.error('ERROR: User Already Exists!')
            }
            console.log(err);
            return res.json({success: false, msg: 'ERROR: Registration Failed!'})
        }

        return res.redirect('/login');

        // return res.json({success: true, msg: 'User Registered Successfully'});
    })
}


export function ProcessLogout(req, res, next){
    req.logOut(function(err){
        if(err){
            console.error(err);
            res.end(err);
        }

        console.log("user logged out successfully");
    });

    res.redirect('/login');
}

