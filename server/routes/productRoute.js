const router = require('express').Router()

const {addUser, AllUsers,Login,EditProfil,DeleteUser} = require('../controllers/productsControllers')
const {addNewPost,allPosts} = require('../controllers/postsControllers')

// add new user (registration)
router.post('/add', addUser)

//print all users
router.get('/users',AllUsers);

//check if user is exist into database(login)
router.get('/user/login',Login);

//POST route for editing an existing user profile by their ID.
router.post('/edit/:id',EditProfil)

//GET route for deleting an existing user from the database by their ID.
router.get("/deleteUser/:id",DeleteUser)

//Add New Post
router.post("/addPost",addNewPost)

router.get("/posts",allPosts)

module.exports = router