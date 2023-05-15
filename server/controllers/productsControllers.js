const Collection = require('../models/product.model');

// Handler for getting all users from the database
module.exports.AllUsers = async (req, res) => {
  const data = await Collection.find({})
  res.status(200).json(data)
}

// Handler for adding a new user to the database
module.exports.addUser = async (req, res) => {
  const name = req.body.name;
  const mail = req.body.mail;
  const password = req.body.password;
  const img = req.body.img;
  const description = req.body.description
  const date = req.body.date

  let user = {
    name,
    mail,
    password,
    img,
    description,
    date
  }

  // Check if required fields are present and user doesn't already exist
  if (name && mail && password) {
    const data = await Collection.findOne({
      mail: user.mail
    })
    if (!data) {
      const newUser = new Collection(user);
      await newUser.save();
      res.json(user);
    }
  } else {
    res.json({
      message: 'user already exist'
    });
  }
}

// Handler for user login
module.exports.Login = async (req, res) => {
  const Getmail = req.query.email;
  const Getpassword = req.query.password;

  // Search if user exists in the database
  const user = await Collection.findOne({
    mail: Getmail,
    password: Getpassword
  });
  
  if (!user) {
    res.json({
      message: 'user not exist'
    });
  } else {
    res.json({
      _id: user._id
    });
  }
};

// Handler for editing user profile information
module.exports.EditProfil = async (req, res) => {
  const img = req.body.img;
  const name = req.body.name;
  const password = req.body.password;
  const mail = req.body.mail;
  const description = req.body.description

  const id = req.params.id;

  let userNew = {
    img: img ? img : undefined,
    name: name ? name : undefined,
    password: password ? password : undefined,
    description: description ? description : undefined,
    mail: mail ? mail : undefined
  }

  // Search if user exists in the database
  const user = await Collection.findOne({
    _id: id
  });

  if (user) {
    // Check which fields to update and update the user
    if (!userNew.img) {
      userNew.img = user.img;
    }
    if (!userNew.name) {
      userNew.name = user.name;
    }
    if (!userNew.password) {
      userNew.password = user.password;
    }
    if (!userNew.mail) {
      userNew.mail = user.mail;
    }
    if (!userNew.description) {
      userNew.description = user.description;
    }

    const newColl = await Collection.findByIdAndUpdate(id, userNew, {
      new: true
    });
    if (newColl) {
      res.json(newColl);
    } else {
      res.json({
        message: 'Not updated!'
      });
    }
  }
}

// Handler for deleting a user
module.exports.DeleteUser = async (req, res) => {
  const id = req.params.id;
  
  // Search for user and delete them
  const user = await Collection.findOneAndDelete({
    _id: id
  }, {
    writeConcern: {
      w: 1,
      j: true,
      wtimeout: 1000
    }
  })
  
  res.json({message:'user delete !'})
}
