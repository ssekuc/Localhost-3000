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

    console.log(req.body.numOfPlayers);
    console.log(req.body.title);

    function convert(raw){
        let result = Number(raw);
        return result;
    }

    let count = convert(req.body.numOfPlayers);

    console.log(count);

    let newGame = new Game({
        title : req.body.title,
        creatorId : req.user.username,
        teams : count,
        game : {
            firstRound : {
                isDone : "N",
                game1 : {
                    team1 : req.body.team1Name,
                    team2 : req.body.team2Name,
                    winner : null
                },
                game2 : {
                    team3 : req.body.team3Name,
                    team4 : req.body.team4Name,
                    winner : null
                },
                game3 : {
                    team5 : req.body.team5Name,
                    team6 : req.body.team6Name,
                    winner : null
                },
                game4 : {
                    team7 : req.body.team7Name,
                    team8 : req.body.team8Name,
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
    //let id = '637690c06492a11bda6f0678';
    let id = req.params.id;
    //console.log(id);
    //console.log(id);

    Game.findById({_id : id}, (err, game) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        return res.render('index', { page: 'detail', user: req.user, game });

    })

}


