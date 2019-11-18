const electron = require("electron");
const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", () => {
  //Here is where we will start stuff when electron is ready
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);
});
