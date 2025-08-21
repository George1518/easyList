// const User = require('../../models/users')
// const path = require('path')
// const userValidation = async (req,res) =>
// {
//   try {
     
//   const loginReq = req.body;
//   console.log(loginReq)
//   const uname = loginReq.username;
//   console.log(uname)
//   const validate = await User.exists(loginReq)
//   if(validate)
//   { 
//       const userData = await User.findOne({username: uname})
//       console.log(userData)
//        console.log('Login Successful')
//        res.sendFile(path.join(__dirname,'../../public','todo.html'))
//     // res.sendFile("../public/todo.html")
      
    
   
//   }
//    else
//    {
//     res.redirect('/login?error=Invalid Username or Password')

//    }
    
  
//   }
//   catch(err)
//   {
//     if(err.message.includes('User validation failed:'))
//     {
//     res.redirect('/login?error=User validation failed')
//     return
//     }
//         res.redirect(`/login?error=${err.message}`)

//   }
// }

// module.exports = userValidation



const User = require('../../models/users');
const bcrypt = require('bcrypt');

const userValidation = async (req, res) => {
  try {
    const { username, password } = req.body;

    // find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    // check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    // store in session
    req.session.userId = user._id;

    console.log('Login successful:', username);
    res.json({ msg: 'Login successful', username }); // frontend expects JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = userValidation;