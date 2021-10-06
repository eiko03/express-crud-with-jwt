const Post = require("../models/Post");

const index= async(req,res)=>{
    try{
        const posts= await Post.find();
        res.json(posts);
    }
    catch(err){
        res.json(err);
    }
}

const create= async(req,res)=>{
    const post= new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savedpost =await post.save();
        res.json(savedpost);
    }
    catch (err){
        res.json(err);
    }

}

const show= async(req,res)=>{
    try{
        const posts= await Post.findById(req.params.postid);
        res.json(posts);
    }
    catch(err){
        res.json(err);
    }
}

const destroy = async(req,res)=>{
    try{
        const posts= await Post.remove({_id:req.params.postid})
        res.json(posts);
    }
    catch(err){
        res.json(err);
    }
}

const update= async(req,res)=>{
    try{
        const posts= await Post.updateOne({_id:req.params.postid},
            { $set:
                    {
                        title:req.body.title
                    }
            });
        res.json(posts);
    }
    catch(err){
        res.json(err);
    }
}

module.exports={
    index,create,show,destroy,update
};