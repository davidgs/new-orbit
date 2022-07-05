import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FormLabel, Col, Row, Button, Dropdown } from 'react-bootstrap';
import ipcRenderer from 'electron';

export default function Settings() {
  const [showConfig, setShowConfig] = useState('none');
  const [airtableToken, setAirtableToken] = useState('');
  const [orbitToken, setOrbitToken] = useState('');
  const [tableName, setTableName] = useState('');
  const [baseId, setBaseId] = useState('');
  const [workplaceSlug, setWorkplaceSlug] = useState('');

  // const oToke = ipcRenderer.ipcRenderer.sendSync('get-orbit-token');

  function getOToken() {
    const resp = window.electronAPI.getStoreValue('orbit.token');
    resp
      .then((response: { result: unknown }) => {
        console.log('Start Process: ', response.airtable.baseID);
        setAirtableToken(response.airtable.token);
        setBaseId(response.airtable.baseID);
        setOrbitToken(response.orbit.token);
        setWorkplaceSlug(response.orbit.workplaceSlug);
        return response;
      })
      .catch((error: unknown) => {
        console.log(`Error: ${error}`);
      });
  }
  const _ = getOToken();
  // const getAirtableCredentials = () => {
  //   const aResp = window.electronAPI.getAirtableCredentials();
  //   aResp
  //     .then((result: any) => {
  //       console.log('Airtable credentials: ', result);
  //     })
  //     .catch(console.log);
  // };

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
    </Form.Group>
  );
}
