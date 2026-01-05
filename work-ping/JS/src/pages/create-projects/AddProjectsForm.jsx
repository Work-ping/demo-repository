import { Button, Form } from 'react-bootstrap';

const AddProjectsForm = ({ onCancel }) => {
  return (
    <Form>
      {/* Project Name */}
      <Form.Group className="mb-3">
        <Form.Label>Project Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter project name"
        />
      </Form.Group>

      {/* Created Date */}
      <Form.Group className="mb-3">
        <Form.Label>Created Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      {/* Due Date */}
      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      {/* Assigned */}
      <Form.Group className="mb-3">
        <Form.Label>Assigned To</Form.Label>
        <Form.Control
          type="text"
          placeholder="Employee name"
        />
      </Form.Group>

      {/* Status */}
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select>
          <option>Pending</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </Form.Select>
      </Form.Group>

      {/* Priority */}
      <Form.Group className="mb-4">
        <Form.Label>Priority</Form.Label>
        <Form.Select>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </Form.Select>
      </Form.Group>

      {/* Actions */}
      <div className="d-flex justify-content-center gap-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary">
          Save Project
        </Button>
      </div>
    </Form>
  );
};

export default AddProjectsForm;
