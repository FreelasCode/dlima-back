import { App } from "./app"

const PORT = process.env.PORT || 8080;


new App().server.listen(PORT);
console.log("server listening on http://localhost:3000");