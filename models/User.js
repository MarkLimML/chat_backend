const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Cannot be empty"]
    },
    password: {
        type: String,
        required: [true, "Cannot be empty"]
    },
    messages: {
        type: Object,
        default: {}
    }
}, {minimize: false})

UserSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')) {
        return next;
    }

    bcrypt.genSalt(10, function(err, salt) {
        if(err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
                return next(err);
            }
            user.password = hash
            next();
        })
    })
})

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

UserSchema.statics.findByCredentials = async function(name, password) {
    const user = await User.findOne({name});
    if(!user) {
        throw new Error("User not found");
    }
    const matches = await bcrypt.compare(password, user.password);
    if(!matches) {
        throw new Error("Invalid Password")
    }
    return User;
}

const User = mongoose.Model({'User', UserSchema});

module.exports = User