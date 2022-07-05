import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FormLabel, Col, Row, Button, Dropdown } from 'react-bootstrap';
import ipcRenderer from 'electron';

export default function Settings() {
  function getSetting(args: string): string {
    const resp = window.electronAPI.getStoreValue(args);
    resp
      // eslint-disable-next-line promise/always-return
      .then((response: { result: unknown }) => {
        console.log('Start Process: ', response);
        // setAirtableToken(response.airtable.token);
        // setBaseId(response.airtable.baseID);
        // setOrbitToken(response.orbit.token);
        // setWorkplaceSlug(response.orbit.workplaceSlug);
        // return response;
      })
      .catch((error: unknown) => {
        console.log(`Error: ${error}`);
        return '';
      });
  }
  const [showConfig, setShowConfig] = useState('none');
  const [airtableToken, setAirtableToken] = useState(
    window.electronAPI
      .getStoreValue(null, 'airtable.token')
      .then((response: string) => {
        console.log('Airtable Token: ', response);
        return response;
      })
      .catch((error: unknown) => {
        console.log(`Error: ${error}`);
      })
  );
  const [orbitToken, setOrbitToken] = useState(
    window.electronAPI
      .getStoreValue(null, 'orbit.token')
      .then((response: string) => {
        console.log('Airtable Token: ', response);
        return response;
      })
      .catch((error: unknown) => {
        console.log(`Error: ${error}`);
      })
  );
  const [tableName, setTableName] = useState('');
  const [baseId, setBaseId] = useState(
    window.electronAPI
      .getStoreValue(null, 'airtable.baseID')
      .then((response: string) => {
        console.log('Airtable BaseID: ', response);
        return response;
      })
      .catch((error: unknown) => {
        console.log(`Error: ${error}`);
      })
  );
  const [workplaceSlug, setWorkplaceSlug] = useState(
    window.electronAPI
      .getStoreValue(null, 'orbit.workplaceSlug')
      .then((response: string) => {
        console.log('Workplace Slug: ', response);
        return response;
      })
      .catch((error: unknown) => {
        console.log(`Error: ${error}`);
      })
  );

  // const oToke = ipcRenderer.ipcRenderer.sendSync('get-orbit-token');

  function saveConfig() {
    const settings = {
      airtable: {
        token: airtableToken,
        baseID: baseId,
      },
      orbit: {
        token: orbitToken,
        workplaceSlug,
      },
    };
    window.electronAPI.setCredentials(settings);
    setShowConfig('none');
  }

  function getCreds() {
    const aResp = window.electronAPI.getCredentials();
    aResp
      .then((result: any) => {
        console.log('Credentials: ', result);
        setAirtableToken(result.airtable.token);
        setBaseId(result.airtable.baseID);
        setOrbitToken(result.orbit.token);
        setWorkplaceSlug(result.orbit.workplaceSlug);
      })
      .catch((error: any) => {
        console.log('Error: ', error);
      });
  }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const useless = getCreds();

  return (
    <Form.Group as={Row} className="mb-3" controlId="formGridConfig">
      <div
        className="align-items-left"
        style={{ display: { showConfig }, width: '90%' }}
      >
        <h2 align-items="center">Orbit Configuration</h2>
        <Form.Group as={Row} className="mb-3" controlId="formGridSlug">
          <FormLabel column sm={4}>
            Orbit Token
          </FormLabel>
          <Col sm={8}>
            <Form.Control
              name="orbit_token"
              type="text"
              value={orbitToken}
              onChange={(eventKey) => {
                console.log(eventKey.target.value);
                setOrbitToken(eventKey.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGridSlug">
          <FormLabel column sm={4}>
            Workplace Slug
          </FormLabel>
          <Col sm={8}>
            <Form.Control
              name="workplace_slug"
              type="text"
              value={workplaceSlug}
              onChange={(eventKey) => {
                setWorkplaceSlug(eventKey.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <h3 align-items="center">Airtable Configuration</h3>
        <Form.Group as={Row} className="mb-3" controlId="formGridSlug">
          <FormLabel column sm={4}>
            Airtable Token
          </FormLabel>
          <Col sm={8}>
            <Form.Control
              name="airtable_token"
              type="text"
              value={airtableToken}
              onChange={(eventKey) => {
                setAirtableToken(eventKey.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGridSlug">
          <FormLabel column sm={4}>
            Base ID
          </FormLabel>
          <Col sm={8}>
            <Form.Control
              name="base_id"
              type="text"
              value={baseId}
              onChange={(eventKey) => {
                setBaseId(eventKey.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGridSlug">
          <FormLabel column sm={4}>
            Table Name
          </FormLabel>
          <Col sm={8}>
            <Form.Control
              name="table_name"
              type="text"
              value={tableName}
              onChange={(eventKey) => {
                setTableName(eventKey.target.value);
              }}
            />
          </Col>
        </Form.Group>
      </div>
      <Button
        variant="primary"
        onClick={() => {
          saveConfig();
        }}
      >
        Save
      </Button>
    </Form.Group>
  );
}
