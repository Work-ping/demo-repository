
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Row, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PageBreadcrumb from '@/components/layout/PageBreadcrumb';
import PageMetaData from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import AddProjectsForm from './AddProjectsForm';

const API_URL = '';

const CreateProjects = () => {
  const navigate = useNavigate();

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [editProject, setEditProject] = useState(null);

  const handleOpen = () => setShowProjectForm(true);
  const handleClose = () => {
    setEditProject(null);
    setShowProjectForm(false);
  };

  /* 🔹 FETCH PROJECTS FROM BACKEND */
  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAllTasks(data || []);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* 🔹 AFTER SAVE → REFRESH LIST */
  const handleProjectSaved = () => {
    fetchProjects();
    handleClose();
  };

  /* 🗑 DELETE PROJECT (BACKEND) */
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      fetchProjects();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <>
      <PageBreadcrumb subName="Employee" title="Projects" subLink="" />
      <PageMetaData title="Projects" />

      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex flex-wrap justify-content-between gap-3">
                <div className="search-bar">
                  <span>
                    <IconifyIcon icon="bx:search-alt" />
                  </span>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search Project..."
                  />
                </div>

                <Button
                  variant="primary"
                  className="d-inline-flex align-items-center"
                  onClick={handleOpen}
                >
                  <IconifyIcon icon="bx:plus" className="me-1" />
                  Create Project
                </Button>
              </div>
            </CardBody>

            <div className="table-responsive table-centered">
              <table className="table mb-0">
                <thead className="bg-light bg-opacity-50">
                  <tr>
                    <th>Project Title</th>
                    <th>Created Date</th>
                    <th>Due Date</th>
                    <th>Assigned</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {allTasks.map((task) => (
                    <tr key={task._id}>
                      <td>
                        <span
                          role="button"
                          className="fw-medium text-primary"
                          onClick={() =>
                            navigate('/create-teams', {
                              state: { projectName: task.task },
                            })
                          }
                        >
                          {task.task}
                        </span>
                      </td>

                      <td>{task.createdAt?.slice(0, 10)}</td>
                      <td>{task.dueDate?.slice(0, 10)}</td>
                      <td>{task.employee?.name}</td>

                      <td>
                        <span
                          className={`badge badge-soft-${
                            task.status === 'Pending'
                              ? 'primary'
                              : task.status === 'In-Progress'
                              ? 'warning'
                              : 'success'
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td
                        className={`text-${
                          task.priority === 'High'
                            ? 'danger'
                            : task.priority === 'Medium'
                            ? 'warning'
                            : 'success'
                        }`}
                      >
                        <IconifyIcon icon="bxs:circle" className="me-1" />
                        {task.priority}
                      </td>

                      <td>
                        <Button
                          variant="soft-secondary"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            setEditProject(task);
                            handleOpen();
                          }}
                        >
                          <IconifyIcon icon="bx:edit" />
                        </Button>

                        <Button
                          variant="soft-danger"
                          size="sm"
                          onClick={() => handleDelete(task._id)}
                        >
                          <IconifyIcon icon="bx:trash" />
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {allTasks.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No projects found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 🔹 SIDEBAR */}
          <Offcanvas
            show={showProjectForm}
            onHide={handleClose}
            placement="end"
            style={{
              top: '70px',
              height: 'calc(100vh - 70px)',
              width: window.innerWidth < 768 ? '100%' : '30%',
            }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                {editProject ? 'Edit Project' : 'Create Project'}
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <AddProjectsForm
                onCancel={handleClose}
                editData={editProject}
                onSuccess={handleProjectSaved}
              />
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </>
  );
};

export default CreateProjects;

