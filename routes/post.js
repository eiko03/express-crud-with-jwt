const express = require ('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/',async(req,res)=>{
    try{
        const posts= await Post.find();
        res.json(posts);
    }
    catch(err){
        res.json(err);
    }
});

router.post('/',async(req,res)=>{
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

});

router.get('/:postid',async(req,res)=>{
    try{
        const posts= await Post.findById(req.params.postid);
        res.json(posts);
    }
    catch(err){
        res.json(err);
    }
});

router.delete('/:postid',async(req,res)=>{
    try{
        const posts= await Post.remove({_id:req.params.postid})
        res.json(posts);
    }
    catch(err){
        res.json(err);
    }
});

router.patch('/:postid',async(req,res)=>{
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
});

module.exports = router