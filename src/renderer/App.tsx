import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  FloatingLabel,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { ipcRenderer } from 'electron';
// const { ipcRenderer } = require('electron');

function Hello() {
  const [zeeBeClusterID, setZeeBeClusterID] = useState('');
  const [zeeBeClientSecret, setZeeBeClientSecret] = useState('');
  const [zeeBeClientID, setZeeBeClientID] = useState('');
  const [zeeBeProcessName, setZeeBeProcessName] = useState('');
  const [zeeBeReady, setZeeBeReady] = useState(false);
  const [validated, setValidated] = useState(false);

  const clearForm = () => {
    setZeeBeClusterID('');
    setZeeBeClientSecret('');
    setZeeBeClientID('');
    setZeeBeProcessName('');
    setValidated(false);
    setZeeBeReady(false);
  };

  const startProcess = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('start process: ', zeeBeProcessName);
    const resp = window.electronAPI.startC8Process({
      zeeBeProcessName,
    });
    // const resp = window.electronAPI.startC8Process(zeeBeProcessName);
    resp
      // eslint-disable-next-line promise/always-return
      .then((response: { result: unknown }) => {
        console.log('Start Process: ', response);
      })
      .catch((error: unknown) => {
        console.log(`Error: ${error}`);
      });
  };
  const checkRead = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const resp = window.electronAPI.checkC8Ready('DoMathTask');
    resp
      // eslint-disable-next-line promise/always-return
      .then((response: { result: unknown }) => {
        // eslint-disable-next-line promise/always-return
        if (response.result === 'ready') {
          setZeeBeReady(true);
        } else {
          setZeeBeReady(false);
        }
        console.log('Check Ready Response: ', response);
      })
      .catch((error: unknown) => {
        console.log(`Error: ${error}`);
      });
  };

  return (
    <div className="App d-flex flex-column align-items-center">
      <h1>Fill out your credentials!</h1>
      <Form
        noValidate
        validated={validated}
        className="container"
        onSubmit={checkRead}
      >
        <Form.Group>
          {/* Name input */}
          <OverlayTrigger
            placement="auto"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="name-tooltip">Enter The Process ID</Tooltip>}
          >
            <FloatingLabel label="Process ID">
              <Form.Control
                required
                name="processID"
                id="processID"
                value={zeeBeProcessName}
                size="sm"
                type="text"
                onChange={(eventKey) => {
                  setZeeBeProcessName(eventKey.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                You must supply a Process ID!
              </Form.Control.Feedback>
            </FloatingLabel>
          </OverlayTrigger>
        </Form.Group>
        <p />
        {/* Source input */}
        {/* <Form.Group>
          <OverlayTrigger
            placement="auto"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="source-tooltip">
                Client ID is the ID used to authenticate with the Camunda
                Platform 8 API.
              </Tooltip>
            }
          >
            <FloatingLabel label="Client ID">
              <Form.Control
                required
                name="clientID"
                id="clientID"
                type="text"
                size="sm"
                value={zeeBeClientID}
                onChange={(eventKey) => {
                  setZeeBeClientID(eventKey.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                A Client ID is required!
              </Form.Control.Feedback>
            </FloatingLabel>
          </OverlayTrigger>
        </Form.Group>
        <p />
        <Form.Group>
          <OverlayTrigger
            placement="auto"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="source-tooltip">
                Client Secret is the secret used to authenticate with the
                Camunda Platform 8 API.
              </Tooltip>
            }
          >
            <FloatingLabel label="Client Secret">
              <FormControl
                required
                // disabled={linkOrigin === 'Pick a base target'}
                id="target"
                value={zeeBeClientSecret}
                aria-label="Client Secret"
                aria-describedby="target-tooltip"
                onChange={(eventKey) => {
                  setZeeBeClientSecret(eventKey.target.value);
                }}
              />
            </FloatingLabel>
          </OverlayTrigger>
          <Form.Control.Feedback type="invalid">
            The Client Secret for your Cluster is required!
          </Form.Control.Feedback>
        </Form.Group>
        <p /> */}
        <p />
        <Form.Group>
          <Button variant="primary" type="submit">
            Check
          </Button>
          &nbsp;&nbsp;
          <Button variant="outline-primary" type="reset" onClick={startProcess}>
            Start
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
