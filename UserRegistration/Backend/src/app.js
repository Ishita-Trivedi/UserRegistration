const express=require('express');
const path=require('path');
const app=express();
const bodyParser=require('body-parser');
const port=process.env.PORT || 3000;//either port 3000 or any other port
require('./db/database');
const Registers=require('./models/registers');//gets the Register model
const hbs=require('hbs');

const static_path=path.join(__dirname,'../public');//connects to index.html
console.log(__dirname);
const templates_path=path.join(__dirname,'../templates/views');
const partials_path=path.join(__dirname,'../templates/partials');

app.use(express.json());
app.use(express.static(static_path));
app.use(express.urlencoded({extended:false}));
app.set('view engine','hbs');//setting default file as hbs
app.set('views',templates_path);
hbs.registerPartials(partials_path);
app.get('/',(req,res)=>{//call back function
    // res.send('Hello World');.
    res.render('index');
});
app.get("/login",(req,res)=>{
    res.render('login');
});
app.get("/register",(req,res)=>{
    res.render('register');
});
app.post("/login", async (req, res) => {
  try {
    // Extract login data from the request body
    const { email, password } = req.body;

    // Assuming you have a "Registers" model to represent users
    // Find the user with the provided email in the database
    const user = await Registers.findOne({ email });

    // If no user is found with the provided email, return an error
    if (!user) {
      return res.status(404).send("User not found. Please register.");
    }

    // Compare the provided password with the stored hashed password
    // (Assuming you have a hashed password stored in the database)
    // If the passwords match, consider it a successful login
    // Otherwise, return an error indicating incorrect credentials
    if (user.password === password) {
      return res.status(200).send("Login successful!");
    } else {
      return res.status(401).send("Incorrect credentials. Please try again.");
    }
  } catch (error) {
    // Handle any errors that occur during the login process
    res.status(400).send(error.message);
  }
});

app.post("/register", async (req, res) => {
  try {
    // Extract registration data from the request body
    const { email, password } = req.body;

    // Assuming you have a "Registers" model, create a new document in the database
    const newUser = new Registers({
      email,
      password
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response or redirect to a success page
    res.status(201).send("User registered successfully!");
  } catch (error) {
    // Handle any errors that occur during the registration process
    res.status(400).send(error.message);
  }
});

app.listen(port,()=>
console.log('Server started at port '+port) );