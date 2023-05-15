const PostsCollection = require('../models/postsModel')

module.exports.addNewPost = async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const authorName = req.body.authorName;
    const authorImg = req.body.authorImg;
    const createdAt = req.body.createdAt;
    if (title && content ) {
        const newPost = {
            title,
            content,
            authorName,
            authorImg,
            createdAt
        }

        const post = new PostsCollection(newPost);
        await post.save()

            .then((savedPost) => {
                res.status(201).json({
                    message: 'Post created successfully',
                    post: savedPost
                });
            })
    } else {
        res.status(404).json({
            message: 'Error creating post',
    
        });
    }
}


module.exports.allPosts = async (req, res) => {
    const posts = await PostsCollection.find({})
    res.status(200).json(posts)
}