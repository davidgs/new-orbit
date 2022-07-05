/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import Store from 'electron-store';

const store = new Store();

const DEBUG = true;
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

// const zbc = new ZBClient({
//   onReady: () => {
//     console.log(`onReady: Connected!`);
//     zbcReady = true;
//   },
//   onConnectionError: () => {
//     console.log(`Disconnected!`);
//     zbcReady = false;
//   },
// });
export interface IpcRequest {
  responseChannel?: string;

  params?: string;
}
// async function checkC8Ready(event, message) {
//   console.log('checkC8Ready: ', message);
//   if(message !== '') {
//     PROC_NAME = message;
//   }
//   console.log('Got ready request, checking if C8 is ready');
//   console.log('checkC8Ready :', zbcReady);
//   const result = await zbc.topology();
//   console.log('Topology: ', result);
//   if (PROC_NAME !== '') {
//     (async () => {
//       zbc.createWorker(PROC_NAME, (job) => {
//         if (DEBUG) {
//           console.log('Handling job: ', job.key);
//         }
//         if (job.variables.count === undefined) {
//           job.variables.count = 0;
//         }
//         if (job.variables.add === undefined) {
//           job.variables.add = 0;
//         }
//         if (DEBUG) {
//           console.log('Incoming variables: ', job.variables);
//         }
//         job.variables.count = job.variables.count + job.variables.add;
//         if (DEBUG) {
//           console.log('Job Complete: ', job.variables);
//         }
//         job.complete(job.variables);
//       });
//     })();
//   }
//   return zbcReady;
//   // }
//   // return 'Not ready!';
// }

// async function startC8Process(event, processName) {
//   console.log('startC8Process: ', processName.zeeBeProcessName);
//   console.log('Got start process request');
//   console.log('checkC8Ready :', zbcReady);
//   const result = await zbc.createProcessInstance(processName.zeeBeProcessName);
//   console.log('StartProcess: ', result);
//   return result;
// }

function getCredentials(...args: any[]) {
  console.log('args', args[1]);
  const value = store.get();
  console.log(value);
  return value;

  // return store.get(key);
}
function setCredentials(...credentials: any[]) {
  console.log('Setting credentials', credentials[1]);
  store.set('orbit.token', credentials[1].orbit.token);
  store.set('orbit.workplaceSlug', credentials[1].orbit.workplaceSlug);
  store.set('airtable.token', credentials[1].airtable.token);
  store.set('airtable.baseID', credentials[1].airtable.baseID);
}

function getOrbitToken() {
  const orbitCredentials = store.get('orbit');
  if (orbitCredentials) {
    return orbitCredentials.token;
  }
  return '';
}
ipcMain.handle('getStoreValue', (event, key) => {
  console.log('getStoreValue: ', key);
  const value = store.get(key);
  console.log('getStoreValue: ', value);
  return value;
  // return store.get(key);
});
ipcMain.handle('get-store-value', (event, key) => {
  console.log('get-store-value: ', key);
  console.log('get-store-value: ', store.get(key));
  const foo = store.get(key);
  return foo;
});
function getStoreValue(...args: any[]) {
  console.log('args', args[1]);
  const value = store.get(args[1]);
  console.log(value);
  return value;

  // return store.get(key);
}

ipcMain.on('getCredentials', (event, arg) => {
  const orbitCredentials = store.get('orbit');
  if (orbitCredentials) {
    event.reply(orbitCredentials);
  }
  event.reply({
    token: '',
    workplaceSlug: '',
  });
});

function setOrbitCredentials(credentials: object) {
  store.set('orbit', credentials);
}

function handleSetTitle(event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

// function setZeeBeCredentials(args: any) {
//   const { clientId, clientSecret, clusterId } = args;
//   console.log('setZeeBeCredentials', clientId, clientSecret, clusterId);
//   zbc.clientId = clientId;
//   zbc.clientSecret = clientSecret;
//   zbc.clusterId = clusterId;
//   return checkC8Ready();
// }
ipcMain.on('start-process', async (event, arg) => {
  // console.log(event);
  console.log('Starting Process: ', arg.zeeBeProcessName);
  // startC8Process(arg);
  console.log('Replying with fuck!');
  event.reply('start-process', 'fuck!');
});

ipcMain.on('fetchOrgs', async (event, arg) => {
  console.log('fetchOrgs Args: ', arg);
  const { clientId, clientSecret, clusterId } = arg;
  console.log('clientID: ', clientId);
  console.log('fetchOrgs', event);
});

async function fetchOrgs(message: string) {
  console.log('Calling fetchOrgs');
  console.log('clientID: ', message);
}

ipcMain.on('camunda-8', async (event, arg) => {
  const msgTemplate = (ready: string) => `${ready}`;
  console.log('Got message: ', msgTemplate(arg));
  if (
    msgTemplate(arg) === 'Ready?' &&
    zbc.clientId &&
    zbc.clientSecret &&
    zbc.clusterId
  ) {
    console.log('Got ready message, starting process');
    // const result = await zbc.createProcessInstance('TestScriptWorker', {
    //   count: 0,
    //   add: 1,
    // });

    // const rep = `C8 process started: ${result.processInstanceKey}`;
    // event.reply('camunda-8', { rep });
    // console.log('C8 result: ', result);
    return;
  }
  event.reply('camunda-8', { rep: 'C8 not ready' });
});

// ipcMain.on('ipc-example', async (event, arg) => {
//   const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
//   console.log(msgTemplate(arg));
//   event.reply('ipc-example', msgTemplate('pong'));
// });

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
    ipcMain.on('set-title', handleSetTitle);
    ipcMain.handle('set-credentials', setCredentials);
    ipcMain.handle('get-credentials', getCredentials);
    // ipcMain.handle('get-store-value', getStoreValue);
    // ipcMain.handle('set-store-value', setStoreValue);

    ipcMain.handle('get-orbit-token', getOrbitToken);
    ipcMain.handle('fetch-orgs', fetchOrgs);
    // ipcMain.on('start-process', startC8Process);
    // ipcMain.handle('set:set-zeebe-credentials', setZeeBeCredentials);
  })
  .catch(console.log);
