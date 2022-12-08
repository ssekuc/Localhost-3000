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
    let newGame;

    if(req.body.numOfPlayers == '8'){
        newGame = new Game({
            title : req.body.title,
            creatorId : req.user.username,
            teams : Number(req.body.numOfPlayers),
            game : {
                firstRound : {
                    isDone : "N",
                    game1 : {
                        team1 : req.body.teams[0],
                        team2 : req.body.teams[1],
                        winner : null
                    },
                    game2 : {
                        team3 : req.body.teams[2],
                        team4 : req.body.teams[3],
                        winner : null
                    },
                    game3 : {
                        team5 : req.body.teams[4],
                        team6 : req.body.teams[5],
                        winner : null
                    },
                    game4 : {
                        team7 : req.body.teams[6],
                        team8 : req.body.teams[7],
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

    }
    else if(req.body.numOfPlayers == '16'){
        newGame = new Game({
            title : req.body.title,
            creatorId : req.user.username,
            teams : Number(req.body.numOfPlayers),
            game : {
                firstRound : {
                    isDone : "N",
                    game1 : {
                        team1 : req.body.teams[0],
                        team2 : req.body.teams[1],
                        winner : null
                    },
                    game2 : {
                        team3 : req.body.teams[2],
                        team4 : req.body.teams[3],
                        winner : null
                    },
                    game3 : {
                        team5 : req.body.teams[4],
                        team6 : req.body.teams[5],
                        winner : null
                    },
                    game4 : {
                        team7 : req.body.teams[6],
                        team8 : req.body.teams[7],
                        winner : null
                    },
                    game5 : {
                        team9 : req.body.teams[8],
                        team10 : req.body.teams[9],
                        winner : null
                    },
                    game6 : {
                        team11 : req.body.teams[10],
                        team12 : req.body.teams[11],
                        winner : null
                    },
                    game7 : {
                        team13 : req.body.teams[12],
                        team14 : req.body.teams[13],
                        winner : null
                    },
                    game8 : {
                        team15 : req.body.teams[14],
                        team16 : req.body.teams[15],
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
                    },
                    game3 : {
                        team5 : null,
                        team6 : null,
                        winner : null
                    },
                    game4 : {
                        team7 : null,
                        team8 : null,
                        winner : null
                    },
                },
                thirdRound : {
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
            isPremium : "Y",
            comment : null,
            isActive: "Y"
        });
    }


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
    console.log("-------------------------");

    Game.find((err, games) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        return res.render('index', { page: 'pastList', user: req.user, games });   
    })
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
        if(game.teams == 8){
            return res.render('index', { page: 'detail', user: req.user, game });
        }
        else if(game.teams == 16){
            return res.render('index', { page: 'detail', user: req.user, game });
        }

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

        if(game.teams == 8){
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
        }
        else if(game.teams == 16){
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
            }
            else if(game.game.firstRound.game5.winner == null){
                game.game.firstRound.game5.winner = winner;
                game.game.secondRound.game3.team5 = winner;
            }
            else if(game.game.firstRound.game6.winner == null){
                game.game.firstRound.game6.winner = winner;
                game.game.secondRound.game3.team6 = winner;
            }
            else if(game.game.firstRound.game7.winner == null){
                game.game.firstRound.game7.winner = winner;
                game.game.secondRound.game4.team7 = winner;
            }
            else if(game.game.firstRound.game8.winner == null){
                game.game.firstRound.game8.winner = winner;
                game.game.secondRound.game4.team8 = winner;
                game.game.firstRound.isDone = 'Y';
            }


            else if(game.game.secondRound.game1.winner == null){
                game.game.secondRound.game1.winner = winner;
                game.game.thirdRound.game1.team1 = winner;
            }
            else if(game.game.secondRound.game2.winner == null){
                game.game.secondRound.game2.winner = winner;
                game.game.thirdRound.game1.team2 = winner;
            }
            else if(game.game.secondRound.game3.winner == null){
                game.game.secondRound.game3.winner = winner;
                game.game.thirdRound.game2.team3 = winner;
            }
            else if(game.game.secondRound.game4.winner == null){
                game.game.secondRound.game4.winner = winner;
                game.game.thirdRound.game2.team4 = winner;
                game.game.secondRound.isDone = 'Y';
            }


            else if(game.game.thirdRound.game1.winner == null){
                game.game.thirdRound.game1.winner = winner;
                game.game.finalRound.game1.team1 = winner;
            }
            else if(game.game.thirdRound.game2.winner == null){
                game.game.thirdRound.game2.winner = winner;
                game.game.finalRound.game1.team2 = winner;
                game.game.thirdRound.isDone = 'Y';
            }

            else if(game.game.finalRound.game1.winner == null){
                game.game.finalRound.game1.winner = winner;
                game.game.finalRound.isDone = 'Y';
                game.isActive = 'N';
            }
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


