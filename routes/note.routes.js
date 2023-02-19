const express = require("express") 
const {NoteModel}=require("../model/note.model");
// const {}
const noteRouter=express.Router()

noteRouter.get("/",async (req,res)=>{
    const notes=await NoteModel.find({user:req.body.user})
    res.send(notes)
})

noteRouter.post("/create",async (req,res)=>{
    const payload=req.body
    const note=new NoteModel(payload)
    await note.save();
    res.send({"msg":"New Note Created"})
})

noteRouter.patch("/update/:id", async (req,res)=>{
    const Id = req.params.id;
    const udata=req.body;
    try{
        await NoteModel.findByIdAndUpdate({_id:Id},udata);
        res.send({"msg":"Note updated"})
    }catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
})

noteRouter.delete("/delete/:id", async (req,res)=>{
    const noteID=req.params.id
    await NoteModel.findByIdAndDelete(noteID)
    res.send({"msg":"Note Deleted!"});
})

module.exports={
    noteRouter
}