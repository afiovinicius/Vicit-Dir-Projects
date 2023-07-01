const {
  BrowserWindow,
  app,
  dialog,
  ipcMain,
  nativeTheme,
} = require("electron");
const fs = require("fs");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    minWidth: 400,
    height: 630,
    minHeight: 630,
    icon: path.join(__dirname, "../renderer/assets/icon-menu.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  nativeTheme.themeSource = "system";

  win.loadURL(`file://${__dirname}/../renderer/index.html`);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("selectDirectory", async (event) => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  } else {
    return null;
  }
});

ipcMain.handle("createDirectory", async (dirPath, projectName) => {
  try {
    const projectPath = path.join(dirPath, projectName);

    if (fs.existsSync(projectPath)) {
      return { success: false, message: "O diretório já existe." };
    }

    fs.mkdirSync(projectPath, { recursive: true });

    const directories = [
      "assets",
      "docs/proposals",
      "docs/contract",
      "docs/invoice",
      "projects",
    ];

    for (const directory of directories) {
      fs.mkdirSync(path.join(projectPath, directory), { recursive: true });
    }

    return { success: true, message: "Pasta criada com sucesso." };
  } catch (error) {
    return {
      success: false,
      message: `Ocorreu um erro ao criar a pasta: ${error.message}`,
    };
  }
});
