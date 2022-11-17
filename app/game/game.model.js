import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    title: String,
    creatorId: String,
    teams: Number,
    game: Object,
    isPremium: String,
    comment: Object,
    isActive: String
},{
    timestamps:true,
    collection: 'games'
});


export default mongoose.model('Game', GameSchema);