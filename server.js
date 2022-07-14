const express = require('express');
const PORT = process.env.PORT || 3030;
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization,accept');
    if (req.method === 'OPTIONS'){
        res.statusCode = 200;
        return res.end();
    }
    else{
        return next();
    }
})

app.get('/df/server', (req, res) => {
    res.send("server says hello!!!")
})



require('./routes/df-routes')(app)

app.listen(PORT, () => {
    console.log("server is listenin!!!")
})
