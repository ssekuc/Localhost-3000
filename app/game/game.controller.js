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
        title : req.body.title,
        creatorId : req.user.username,
        teams : req.body.numOfPlayers,
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
            secondRound : {
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
            finalRound : {
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
    console.log("#########################");

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


    console.log(id);
    console.log(id);

    Game.findById({_id : id}, (err, game) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        return res.render('index', { page: 'detail', user: req.user, game });

    })

}


export function DecideWinner(req, res, next){
    console.log(req.params.id);
    console.log(req.body.winner);
    let id = req.params.id;
    let winner = req.body.winner;

    Game.findById({_id : id}, (err, game) => {
        if(err){
            console.log(err);
            res.end(err);
        }

        console.log(game);

        if(game.game.firstRound.game1.winner == null){
            game.game.firstRound.game1.winner = winner;
            game.game.secondRound.game1.team1 = winner;
        }
        else if(game.game.firstRound.game2.winner == null){
            game.game.firstRound.game2.winner = winner;
            game.game.secondRound.game1.team2 = winner;
        }
        else if(game.game.firstRound.game3.winner == null){
            game.game.firstRound.game3.winner = winner;
            game.game.secondRound.game2.team3 = winner;
        }
        else if(game.game.firstRound.game4.winner == null){
            game.game.firstRound.game4.winner = winner;
            game.game.secondRound.game2.team4 = winner;
            game.game.firstRound.isDone = 'Y';
        }
        else if(game.game.secondRound.game1.winner == null){
            game.game.secondRound.game1.winner = winner;
            game.game.finalRound.game1.team1 = winner;
        }
        else if(game.game.secondRound.game2.winner == null){
            game.game.secondRound.game2.winner = winner;
            game.game.finalRound.game1.team2 = winner;
            game.game.secondRound.isDone = 'Y';
        }
        else if(game.game.secondRound.isDone == 'Y'){
            game.game.finalRound.game1.winner = winner;
            game.game.finalRound.isDone = 'Y';
            game.isActive = 'N';
        }

        Game.updateOne({_id : id}, game, (err, game) => {
            if(err){
                console.log(err);
                res.end(err);
            }
            console.log('##########success###########');

            return res.status(200).send('success');
        })

    })


}


