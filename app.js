const express = require("express");
const roomRouter = require("./routers/room")
const errorHandler = require("./middleware/errorsHandlers")
const cors = require("cors");


//creazione dell'app express

const app = express();
const port = 4000;

//cartella pubblica accessibi
app.use(express.static('public'));

app.use(express.json())
//Middleware cors
app.use(cors({
    origin: "http://localhost:5173"
}))

// DEFINISCO LE ROTTE
app.use("/boolbnb", roomRouter);


//Registro errorHandler middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`app in ascolto su ${port}`);
}); 