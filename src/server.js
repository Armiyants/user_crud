import app from "./app.js";
import config from "./config/config.json" assert {type: "json"};

app.set("port", config.listeningPort);

const server = app.listen(config.listeningPort, () => {
    console.log(`App is running at ${config.listeningPort}`);
    console.log("Press CTRL-C to stop\n");
});

export default server;