import { App } from "./app.js";

async function appBootstrap(){
    const app = new App();
    await app.init();
}

appBootstrap();