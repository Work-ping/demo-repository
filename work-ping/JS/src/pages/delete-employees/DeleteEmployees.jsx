import { useState } from 'react';
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

  const handleClear = () => {
    setUserId('');
    setShowInfo(false);
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

      <Row className="justify-content-center">
        <Col xl={6} lg={8} md={10} sm={12}>
          <ComponentContainerCard
            id="default"
            title="Remove Employee"
            description="Enter the Employee User ID to review details before removal."
          >
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">
                  Employee User ID
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User ID (e.g. EMP-1023)"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button
                  variant="danger"
                  disabled={!userId}
                  onClick={handleRemoveClick}
                >
                  Delete
                </Button>

                <Button
                  variant="secondary"
                  onClick={handleClear}
                  disabled={!userId}
                >
                  Clear
                </Button>
              </div>

              <p className="text-danger fs-13 mt-3 mb-0">
                ⚠️ This action is permanent and cannot be undone.
              </p>
            </Form>
          </ComponentContainerCard>
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
