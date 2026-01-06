import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddProjectsForm = ({ onCancel, onSave, editData }) => {
  const [formData, setFormData] = useState({
    task: '',
    createdAt: '',
    dueDate: '',
    employee: { name: '' },
    status: 'Pending',
    priority: 'Low',
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Project
        </Button>
      </div>
    </Form>
  );
};

export default AddProjectsForm;
