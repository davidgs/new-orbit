import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  Dropdown,
  FloatingLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Settings from './Settings';
import Organizations from './Organizations';
// import { ipcRenderer } from 'electron';
// const { ipcRenderer } = require('electron');

function Hello() {
  const [zeeBeClusterID, setZeeBeClusterID] = useState('');
  const [zeeBeClientSecret, setZeeBeClientSecret] = useState('');
  const [zeeBeClientID, setZeeBeClientID] = useState('');
  const [zeeBeProcessName, setZeeBeProcessName] = useState('');
  const [zeeBeReady, setZeeBeReady] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showConfig, setShowConfig] = useState('none');
  const [showOrgs, setShowOrgs] = useState('none');
  const [showActivities, setShowActivities] = useState('none');
  const [checked, setChecked] = useState(false);
  const [service, setService] = useState('');

  const clearForm = () => {};

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
      <h1>Choose Data Activity</h1>
      <Form
        name="chooser"
        className="align-items-center"
        style={{ width: '90%' }}
      >
        <Form.Group>
          <Row className="mb-3">
            <Dropdown
              onSelect={(eventKey) => {
                const g = eventKey === 'organizations' ? 'block' : 'none';
                const a = eventKey === 'activities' ? 'block' : 'none';
                setShowOrgs(g);
                setShowActivities(a);
                setService(eventKey);
              }}
            >
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select Service
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item key="organizations" eventKey="organizations">
                  Organizations
                </Dropdown.Item>
                <Dropdown.Item key="activities" eventKey="activities">
                  Activities
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        </Form.Group>
      </Form>
      <div style={{ display: showOrgs }}>
        <Organizations />
      </div>
      <p />
      <Form.Group
        as={Row}
        className="mb-3 d-flex flex-column align-items-center"
        controlId="formGridConfig"
      >
        <Col sm={12}>
          <FormLabel>Show Configuration</FormLabel>
          <Form.Check
            checked={checked}
            as="input"
            name="show_config"
            type="switch"
            key="show_config"
            id="custom-switch"
            aria-label="Show Configuration"
            onChange={(eventKey) => {
              setChecked(eventKey.target.checked);
              setShowConfig(eventKey.target.checked ? 'block' : 'none');
            }}
          />
        </Col>
      </Form.Group>

      <div style={{ display: showConfig }}>
        <p />
        <Settings />
      </div>
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
