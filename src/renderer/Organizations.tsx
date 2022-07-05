import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FormLabel, Col, Row, Button, Dropdown } from 'react-bootstrap';
import { ipcRenderer } from 'electron';
import { render } from '@testing-library/react';

export default function Organizations() {
  const [direction, setDirection] = useState('PickOne');
  const [items, setItems] = useState('Pick One');
  const [sortString, setSortString] = useState('Pick One');

  function fetchOrgs(event) {
    event.preventDefault();
    event.stopPropagation();
    const message = {
      direction,
      items,
      sortString,
      query: 'organizations',
    };
    window.electronAPI.send('fetch-orgs', message);
   // window.electronAPI.fetchOrgs(message);
  }
  return (
    <>
      <div>
        <div>
          <h3>Fetching data for: Organizations</h3>
        </div>
        <Form
          name="fetch-orgs"
          className="aligb-items-left"
          style={{ width: '90%' }}
        >
          <Form.Group as={Row} className="mb-3" controlId="formGridDirection">
            <FormLabel column sm={4}>
              Direction
            </FormLabel>
            <Col sm={2}>
              <Dropdown
                id="direction"
                name="direction"
                onSelect={(eventKey) => {
                  setDirection(eventKey);
                }}
              >
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-flags"
                  className="text-left"
                >
                  {direction}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item key="DESC" eventKey="DESC">
                    DESC
                  </Dropdown.Item>
                  <Dropdown.Item key="ASC" eventKey="ASC">
                    ASC
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col sm={6}></Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formGridAmount">
            <FormLabel column sm={4}>
              Items
            </FormLabel>
            <Col sm={2}>
              <Dropdown
                id="items"
                name="items"
                onSelect={(eventKey) => {
                  setItems(eventKey);
                }}
              >
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-flags"
                  className="text-left"
                >
                  {items}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item key="10" eventKey="10">
                    10
                  </Dropdown.Item>
                  <Dropdown.Item key="25" eventKey="25">
                    25
                  </Dropdown.Item>
                  <Dropdown.Item key="50" eventKey="50">
                    50
                  </Dropdown.Item>
                  <Dropdown.Item key="75" eventKey="75">
                    75
                  </Dropdown.Item>
                  <Dropdown.Item key="100" eventKey="100">
                    100
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col sm={6}></Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formGridAmount">
            <FormLabel column sm={4}>
              Sort By
            </FormLabel>
            <Col sm={2}>
              <Dropdown
                id="sort"
                name="sort"
                onSelect={(eventKey) => {
                  setSortString(eventKey);
                }}
              >
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-flags"
                  className="text-left"
                >
                  {sortString}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item key="name" eventKey="name">
                    Name
                  </Dropdown.Item>
                  <Dropdown.Item key="website" eventKey="website">
                    Website
                  </Dropdown.Item>
                  <Dropdown.Item key="members_count" eventKey="members_count">
                    Members Count
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="employees_count"
                    eventKey="employees_count"
                  >
                    Employees Count
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col sm={6}></Col>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={fetchOrgs} />
        </Form>
      </div>
    </>
  );
}
