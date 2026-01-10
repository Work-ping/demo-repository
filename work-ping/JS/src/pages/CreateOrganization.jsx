import { Button, Col, Row, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
const CreateOrganization = () => {
  const navigate=useNavigate();
  return (
    <Row
      className="align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <Col
        xl={5}
        lg={5}
        md={6}
        className="d-flex justify-content-center mb-4 mb-md-0"
      >
        <img
          src="/organization.png"
          alt="organization"
          style={{ maxWidth: '90%', height: 'auto' }}
        />
      </Col>
      <Col xl={5} lg={5} md={6}>
        <h2 className="fw-semibold mb-2">Welcome to Work-Ping</h2>
        <p className="text-muted mb-4">
          To get started, create or connect to an organization
        </p>

        <Button variant="primary" className="mb-4" onClick={() => navigate('/organization/organization-details')}>
          + Add Organization
        </Button>

        <Card
          className="border-0"
          style={{ backgroundColor: '#e8f5faff' }}
        >
          <Card.Body>
            <h6 className="fw-semibold">
              New here and don’t have an organization?
            </h6>
            <p className="text-muted mb-3">
              You can create a new organization and start managing
              your teams and workflows easily.
            </p>
            <Button variant="outline-primary" onClick={() => navigate('/organization/organization-details')}>
              CREATE ORGANIZATION
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateOrganization;
