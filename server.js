let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();
let PORT = process.env.PORT || 3000;

//set up app to nadle body parsing

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Data
var characters = [{
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  }, {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }, {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }];
  
//routes

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'index.html'));

});

// api route
app.get('/api/characters', function(req, res) {
    return res.json(characters);
    res.end();
});

//just a character at a time
app.get('/api/characters/:character', function(req, res){
    let chosen = req.params.character;
    //connect to db, make a sequelize call to get Yoda
    for(var i = 0; i < characters.length; i++) {
        if(chosen === characters[i].routeName) {
            return res.json(characters[i]);

        }
    }

    return res.send('no character found');
});

//create new characters
app.post('/api/characters', function (req, res){
    let newcharacter = req.body;
    console.log(newcharacter);
    characters.push(newcharacter);

    res.json(newcharacter);
});


//listener
app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
});