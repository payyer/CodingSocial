const mongoose = require("mongoose")
const { db: { host, port, name } } = require("../configs/config.mongodb")
const CONNECTION_STRING = `mongodb://${host}:${port}/${name}`
const { countConnect } = require("../helpers/check.connect")

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }
        mongoose
            .connect(CONNECTION_STRING, { maxPoolSize: 50 })
            .then(() => {
                console.log("Connected PRO!")
                countConnect();
            })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;