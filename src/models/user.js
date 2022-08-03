import { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
    name: String,
    surname: String,
    username: String,
    email: {type: String, unique: true},
    phone: {type: String, unique: true},
    website: String,
    address: {
        street: String,
        suite: Number,
        city: String,
        zipcode: String
    },
    company: {
        name: String
    },
});

UserSchema.methods.entitize = function () {
    return {
        name: this.name,
        surname: this.username,
        email: this.email,
        street: this.address.street,
        suite: this.address.suite,
        city: this.address.city,
        zipcode: this.address.zipcode,
        mobile: this.phone,
        registeredService: this.website,
        companyName: this.company.name
    }
}

export const User = model('User', UserSchema);