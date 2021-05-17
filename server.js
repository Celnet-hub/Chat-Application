//import modules
const express = require('express');





//create an instance of express
const app = express();

//create server 
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log(`Server is live on port ${Port}`);
})
