import { App } from "./app"

const PORT = process.env.PORT || 8080;

console.log(process.env["MONGO_DB_USER"])
console.log(process.env["MONGO_DB_PASSWORD"])
console.log(process.env["DATABASE_URL"])
console.log(process.env["SECRET"])

new App().server.listen(PORT);
console.log("server listening on http://localhost:3000");