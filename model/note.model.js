const mongoose=require("mongoose")
mongoose.set('strictQuery', false)

const noteSchema=mongoose.Schema({
    title:String,
    body: String,
    user:String
})

const NoteModel=new mongoose.model("note",noteSchema)

module.exports={
    NoteModel
}