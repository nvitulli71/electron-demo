const electron = require("electron");
const { app, BrowserWindow } = electron;

app.on("ready", () => {
  //Here is where we will start stuff when electron is ready
  new BrowserWindow({});
});
