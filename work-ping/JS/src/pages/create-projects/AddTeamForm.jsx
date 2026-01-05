import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddTeamForm = ({ onSave, onCancel, defaultValues }) => {
  const [teamName, setTeamName] = useState('');
  const [workingType, setWorkingType] = useState('');

  /* 🔥 THIS IS THE KEY FIX */
  useEffect(() => {
    if (defaultValues) {
      setTeamName(defaultValues.name || '');
      setWorkingType(defaultValues.type || '');
    }
  }, [defaultValues]);

  const handleSubmit = () => {
    onSave({
      name: teamName,
      type: workingType,
    });
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Team Name</Form.Label>
        <Form.Control
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Working Status</Form.Label>
        <Form.Select
          value={workingType}
          onChange={(e) => setWorkingType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Completed">Completed</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Pending">Pending</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default AddTeamForm;
