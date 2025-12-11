

const { MongoClient } = require("mongodb")

require('dotenv').config()

async function main() {
    

    const client = new MongoClient('mongodb+srv://dani:reader123@cluster0.geelldo.mongodb.net/?appName=Cluster0')

    try {
        await client.connect();
        console.log("Greatly Nice.");
    } catch {
        console.log("Error.");
    } finally {
        await client.close();
    }
}

main().catch(console.error);