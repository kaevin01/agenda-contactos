const app = require("./app");

app.listen(app.get("port"));
console.log("Servidor en puerto:", app.get("port"));
