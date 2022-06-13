import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  Alert,
  Col,
  FloatingLabel,
  FormControl,
  InputGroup,
  DropdownButton,
  Dropdown,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { useState } from 'react';
import RedButton from '../../assets/images/Button-Red.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function ZeeBeForm() {

  const [show, setShow] = useState(false);
  