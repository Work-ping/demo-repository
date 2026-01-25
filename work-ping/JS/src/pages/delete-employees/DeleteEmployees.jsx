import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  Row,
  Offcanvas
} from 'react-bootstrap';

import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageBreadcrumb from '@/components/layout/PageBreadcrumb';
import PageMetaData from '@/components/PageTitle';
import UserInfo from './UserInfo';

const DeleteEmployees = () => {
  const [userId, setUserId] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const handleClear = () => {
    setUserId('');
    setShowInfo(false);
  };
 const handleUpdateClick = () => {
  navigate(`/update-employee/${userId}`);
};

  const handleRemoveClick = () => {
    setShowInfo(true);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  return (
    <>
      <PageBreadcrumb subName="Employees" title="Remove Employees" />
      <PageMetaData title="Remove Employees" />

     <Row
  className="justify-content-center"
  style={{ marginTop: '130px' }}
>
  <Col xl={6} lg={8} md={10} sm={12}>
    
    {/* HEADER (CENTERED, NO CARD BACKGROUND) */}
    <div className="text-center mb-4">
      <h4 className="fw-semibold mb-4 pt-3">Remove Employee</h4>
      <p className="text-muted mb-0">
        Enter the Employee User ID to review details before removal.
      </p>
    </div>

    {/* FORM CONTAINER */}
    <div className="rounded-3">
      <Form>
        <Form.Group className="mb-5">
          <Form.Label className="fw-small">
          </Form.Label>
          <Form.Control
            className="w-75 mx-auto"
            type="text"
            placeholder="Enter User ID (e.g. EMP-1023)"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-center gap-5">

          <Button
            variant="secondary"
            onClick={handleClear}
            disabled={!userId}
          >
            Clear
          </Button>
          <Button
            variant="primary" 
            onClick={handleUpdateClick}
            disabled={!userId}
          >
            Update
          </Button>
            <Button
            variant="danger"
            disabled={!userId}
            onClick={handleRemoveClick}
          >
            Delete
          </Button>
        </div>

        <p className="text-danger fs-13 mt-4 mb-0 text-center">
          ⚠️ This action is permanent and cannot be undone.
        </p>
      </Form>
    </div>

  </Col>
</Row>

      {/* RIGHT SIDE OFFCANVAS */}
    <Offcanvas
  show={showInfo}
  onHide={() => setShowInfo(false)}
  placement="end"
  backdrop
  className="user-info-offcanvas"
>
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>Employee Details</Offcanvas.Title>
  </Offcanvas.Header>

  <Offcanvas.Body className="p-0">
    <UserInfo onCancel={() => setShowInfo(false)} />
  </Offcanvas.Body>
</Offcanvas>


    </>
  );
};

export default DeleteEmployees;
