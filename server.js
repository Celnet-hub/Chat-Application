//import modules
const express = require("express");
const path = require("path");

//create an instance of express
const app = express();

//middleware
app.use(express.static(path.join(__dirname, "public")));

//create server
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
	console.log(`Server is live on port ${Port}`);
});
