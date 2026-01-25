import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const TeamsForm = ({ onSave, onCancel, defaultValues }) => {
  const [teamName, setTeamName] = useState('');
  const [teamCount, setTeamCount] = useState('');

  useEffect(() => {
    if (defaultValues) {
      setTeamName(defaultValues.name || '');
      setTeamCount(defaultValues.teamCount || '');
    } else {
      setTeamName('');
      setTeamCount('');
    }
  }, [defaultValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;

    onSave({
      name: teamName,
      teamCount
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Team Name</Form.Label>
        <Form.Control
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
          required
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {defaultValues ? 'Update' : 'Save'}
        </Button>
      </div>
    </Form>
  );
};

export default TeamsForm;
