# Booth Demo UI
## Install

Clone the repo and install dependencies:

```bash
git clone https://github.com/davidgs/booth-demo-ui
cd booth-demo-ui
npm install
```

## Environment variables

```bash
export ZEEBE_ADDRESS=your-cloud-account
export ZEEBE_CLIENT_ID=client-id
export ZEEBE_CLIENT_SECRET=client-secret
```
## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Using the App

Right now, it will start a process if you fill in the `Process ID` field. and click the `Start` button.

If you want to listen for task worker jobs, edit the `App.tsx` file and set the name of the task you'd like to listen for on line 53. Rebuild and when you hit `Test` it will test your connection, and start the task worker. 
