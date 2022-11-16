import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    isAdmin: String,
    isPremium: String
},{
    timestamps:true,
    collection: 'users'
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);