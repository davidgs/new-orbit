const { contextBridge, ipcRenderer } = require('electron');

export type Channels = 'camunda-8';

contextBridge.exposeInMainWorld('electronAPI', {
  //   ipcRenderer: {
  //     sendMessage(channel: Channels, args: unknown[]) {
  //       ipcRenderer.send(channel, args);
  //     },
  //     on(channel: Channels, func: (...args: unknown[]) => void) {
  //       const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
  //         func(...args);
  //       ipcRenderer.on(channel, subscription);

  //       // return () => ipcRenderer.removeListener(channel, subscription);
  //     },
  //     once(channel: Channels, func: (...args: unknown[]) => void) {
  //       ipcRenderer.once(channel, (_event, ...args) => func(...args));
  //     },
  //   },
  getStoreValue: (key: string) =>
    ipcRenderer.invoke('get-store-value', key),
  checkC8Ready: (message: string) =>
    ipcRenderer.invoke('check:check-C8-ready', message),
  startC8Process: (scriptName: string) =>
    ipcRenderer.invoke('start-C8-process', scriptName),
  setTitle: () => ipcRenderer.send('set-title'),
  setAirtableCredentials: (credentials: object) =>
    ipcRenderer.invoke('set-airtable-credentials', credentials),
  getAirtableCredentials: () => ipcRenderer.invoke('get-airtable-credentials'),
  setOrbitCredentials: (credentials: object) =>
    ipcRenderer.invoke('set-orbit-credentials', credentials),
  getOrbitCredentials: () => ipcRenderer.invoke('get-orbit-credentials'),
  fetchOrgs: (message: string) => ipcRenderer.invoke('fetch-orgs', message),

  // startProcess: (proc) => ipcRenderer.send('start-process', proc),
  // setZeeBeCredentials: () => return ipcRenderer.invoke('set-zeebe-credentials'),
});
