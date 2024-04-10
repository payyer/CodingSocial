require("dotenv").config();
const app = require("./src/app.js");
const { app: {port} } = require("./src/configs/config.mongodb")

const server = app.listen(port, () => {console.log(`Listen on port :${port}`)});

process.on("SIGNT", () =>{
    server.close(() => console.log("Server Close"))
})