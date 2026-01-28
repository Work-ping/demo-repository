import { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const UpdateTeamsForm = ({ onSave, onCancel, defaultValues }) => {
  const [teamName, setTeamName] = useState('');
  const [teamManagerId, setTeamManagerId] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [description, setDescription] = useState('');


  const resetForm = () => {
    setTeamName('');
    setTeamManagerId('');
    setOrganizationId('');
    setDescription('');
  };

 
  useEffect(() => {
    if (defaultValues) {
      setTeamName(defaultValues.teamName || '');
      setTeamManagerId(defaultValues.teamManagerId || '');
      setOrganizationId(defaultValues.organizationId || '');
      setDescription(defaultValues.description || '');
    } else {
      resetForm();
    }
  }, [defaultValues]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamName || !teamManagerId) return;

    onSave({
      teamName,
      teamManagerId,
      organizationId,
      description
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Team Name *</Form.Label>
            <Form.Control
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Team Manager ID *</Form.Label>
            <Form.Control
              value={teamManagerId}
              onChange={(e) => setTeamManagerId(e.target.value)}
              placeholder="Enter manager id"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Team Leader ID</Form.Label>
            <Form.Control
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              placeholder="Optional"
            />
          </Form.Group>
        </Col>

      
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </Form.Group>
        </Col>
      </Row>


      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button
          variant="secondary"
          onClick={() => {
            resetForm();
            onCancel();
          }}
        >
          Cancel
        </Button>

        <Button type="submit" variant="primary">
          {defaultValues ? 'Update' : 'Save'}
        </Button>
      </div>
    </Form>
  );
};

export default UpdateTeamsForm;
