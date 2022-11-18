import Game from './game.model.js';

//Show add page
export function DisplayAddPage(req, res, next){
    if(!req.user){
        return res.redirect('/login')
    }

    return res.render('index', { page: 'add', user: req.user });
}


export function ProcessAddTournament(req, res, next){

    if(!req.user){
        return res.redirect('/login')
    }

    let newGame = new Game({
        title : "second game",
        creatorId : "yun",
        teams : 8,
        game : {
            firstRound : {
                isDone : "N",
                game1 : {
                    team1 : "yun",
                    team2 : "alex",
                    winner : null
                },
                game2 : {
                    team3 : "asdfas",
                    team4 : "asdfasdfasd",
                    winner : null
                },
                game3 : {
                    team5 : "teasdfm5",
                    team6 : "teaasdasdfasm6",
                    winner : null
                },
                game4 : {
                    team7 : "sssss",
                    team8 : "teasdf",
                    winner : null
                }
            },
            secondRount : {
                isDone : "N",
                game1 : {
                    team1 : null,
                    team2 : null,
                    winner : null
                },
                game2 : {
                    team3 : null,
                    team4 : null,
                    winner : null
                }
            },
            finalRount : {
                isDone : "N",
                game1 : {
                    team1 : null,
                    team2 : null,
                    winner : null
                }
            }
        },
        isPremium : "N",
        comment : null,
        isActive: "Y"
    });

    Game.create(newGame, (err, game) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        res.redirect('/home');


    });
}


export function DisplayActiveListPage(req, res, next){

    Game.find((err, games) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        return res.render('index', { page: 'activeList', user: req.user, games });

    })

}

export function DisplayPastListPage(req, res, next){

    return res.render('index', { page: 'pastList', user: req.user });
}


export function DisplayDetailPage(req, res, next){
    let id = '637690c06492a11bda6f0678';
    console.log(id);

    Game.findById({_id : id}, (err, game) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        return res.render('index', { page: 'detail', user: req.user, game });

    })

}


