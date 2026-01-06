import { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Row, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PageBreadcrumb from '@/components/layout/PageBreadcrumb';
import PageMetaData from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import AddProjectsForm from './AddProjectsForm';

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

  useEffect(() => {
    (async () => {
      const data = await getAllTasks();
      setAllTasks(data || []);
    })();
  }, []);

  /* ✅ ADD or UPDATE PROJECT */
  const handleSaveProject = (project) => {
    if (editProject) {
      setAllTasks((prev) =>
        prev.map((item) =>
          item.id === editProject.id ? { ...project, id: editProject.id } : item
        )
      );
    } else {
      setAllTasks((prev) => [
        ...prev,
        { ...project, id: Date.now() },
      ]);
    }
    handleClose();
  };

  /* 🗑 DELETE */
  const handleDelete = (id) => {
    setAllTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <>
      <PageBreadcrumb subName="Employee" title="Projects" />
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
                    <tr key={task.id}>
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

                      <td>{task.createdAt}</td>
                      <td>{task.dueDate}</td>

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
                          onClick={() => handleDelete(task.id)}
                        >
                          <IconifyIcon icon="bx:trash" />
                        </Button>
                      </td>
                    </tr>
                  ))}
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
                onSave={handleSaveProject}
                editData={editProject}
              />
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </>
  );
};

export default CreateProjects;
