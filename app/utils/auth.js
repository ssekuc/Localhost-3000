import jwt from 'jsonwebtoken';
import { Secret } from '../config/config.js';

export function AuthGuard(req, res, next){
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next();
}

export function AdminAuthGuard(req, res, next){
    if(!req.isAuthenticated() || req.user.isAdmin == 'N'){
        return res.redirect('/')
    }
    next();
}

export function GenerateToken(user){
    const payload = {
        id: user._id,
        username: user.username,
        name: user.firstName + user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        isPremium: user.isPremium
    }

    const jwtOptions = {
        expiresIn: 604800
    }

    return jwt.sign(payload, Secret, jwtOptions);

}