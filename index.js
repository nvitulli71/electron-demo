const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on("ready", () => {
  //Here is where we will start stuff when electron is ready
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on("closed", () => {
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 300,
    title: "Add new ToDo",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  addWindow.loadURL(`file://${__dirname}/addWindow.html`);
  addWindow.on("closed", () => (addWindow = null));
}

ipcMain.on("todo:add", (event, todo) => {
  mainWindow.webContents.send("todo:add", todo);
  addWindow.close();
});

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New ToDo",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Clear ToDo",
        click() {
          mainWindow.webContents.send("todo:clear");
        },
      },
      {
        label: "Quit",
        accelerator: "CommandOrControl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: "Edit",
  },
];

if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "Developer",
    submenu: [
      { role: "reload" },
      {
        label: "Dev Tools",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
        accelerator: process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+Shift+I",
      },
    ],
  });
}

if (process.platform === "darwin") {
  menuTemplate.unshift({});
}
