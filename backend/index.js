const connectToMongo = require('./db');
var cors = require("cors");


connectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());


app.get('/',(req,res) =>{
    res.send("Succcessfull");
});


app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.listen(port, () => {
  console.log(`RapidRecall backend listening on port http://localhost:${port}`)
})