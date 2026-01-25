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
  
    if (!e.currentTarget.checkValidity()) {
      return;
    }

    e.preventDefault();

    onSave({
      userId,
      userName,
      workingType,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* User ID */}
      <Form.Group className="mb-3">
        <Form.Label>User ID</Form.Label>
        <Form.Control
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="USR-103"
          required
        />
      </Form.Group>

      {/* User Name */}
      <Form.Group className="mb-3">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter user name"
          required
        />
      </Form.Group>
      <div className="d-flex gap-2">
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default MembersForm;
