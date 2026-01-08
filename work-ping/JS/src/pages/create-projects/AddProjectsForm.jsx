
import { useEffect, useState } from 'react';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';

const AddProjectsForm = ({ onCancel, editData }) => {
  const [formData, setFormData] = useState({
    task: '',
    createdAt: '',
    dueDate: '',
    employee: { name: '' },
    status: 'Pending',
    priority: 'Low',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to save project');
      }

      await res.json();
      setSuccess(true);

      // Optional: reset form
      setFormData({
        task: '',
        createdAt: '',
        dueDate: '',
        employee: { name: '' },
        status: 'Pending',
        priority: 'Low',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Project saved successfully</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Project Title</Form.Label>
        <Form.Control
          value={formData.task}
          onChange={(e) =>
            setFormData({ ...formData, task: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Created Date</Form.Label>
        <Form.Control
          type="date"
          value={formData.createdAt}
          onChange={(e) =>
            setFormData({ ...formData, createdAt: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Assigned To</Form.Label>
        <Form.Control
          value={formData.employee.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              employee: { name: e.target.value },
            })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
        >
          <option>Pending</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Priority</Form.Label>
        <Form.Select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-center gap-4">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Save Project'}
        </Button>
      </div>
    </Form>
  );
};

export default AddProjectsForm;

