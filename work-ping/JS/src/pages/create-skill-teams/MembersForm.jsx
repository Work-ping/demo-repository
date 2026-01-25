import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const MembersForm = ({ onSave, onCancel, defaultValues }) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [workingType, setWorkingType] = useState('');

  useEffect(() => {
    if (defaultValues) {
      setUserId(defaultValues.userId || '');
      setUserName(defaultValues.userName || '');
      setWorkingType(defaultValues.workingType || '');
    } else {
      setUserId('');
      setUserName('');
      setWorkingType('');
    }
  }, [defaultValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) return;

    onSave({
      userId,
      userName,
      workingType
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>User ID *</Form.Label>
        <Form.Control
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="USR-103"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>User Name *</Form.Label>
        <Form.Control
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter user name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Working Type *</Form.Label>
        <Form.Select
          value={workingType}
          onChange={(e) => setWorkingType(e.target.value)}
          required
        >
          <option value="">Select working type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Intern">Intern</option>
          <option value="Contract">Contract</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex gap-2">
        <Button type="submit" variant="primary">
          {defaultValues ? 'Update' : 'Save'}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default MembersForm;
