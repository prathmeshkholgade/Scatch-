
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ownerSchema = Schema({
    fullName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    products:{
        type:Array,
        default:[]
    },
    picture:{
        type:String
    },
    gstin:{
        type:String
    }
})

module.exports =mongoose.model("owner",ownerSchema)