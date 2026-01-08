import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Offcanvas
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import PageBreadcrumb from '@/components/layout/PageBreadcrumb';
import PageMetaData from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import AddTeamForm from './AddTeamForm';

const API_URL = '';

const CreateTeams = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teams, setTeams] = useState([]);
  const [editTeam, setEditTeam] = useState(null);

  /* 🔹 FETCH TEAMS (FIXED) */
  const fetchTeams = async () => {
    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error('Failed to fetch teams');
      }

      const data = await res.json();
      console.log('TEAMS FROM BACKEND 👉', data); // 🔥 debug

      setTeams(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('FETCH TEAMS ERROR 👉', error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleOpen = () => {
    setEditTeam(null);
    setShowTeamForm(true);
  };

  const handleClose = () => {
    setEditTeam(null);
    setShowTeamForm(false);
  };

  /* 🔹 CREATE or UPDATE TEAM */
  const handleAddOrUpdateTeam = async (team) => {
    try {
      if (editTeam) {
        await fetch(`${API_URL}/${editTeam._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(team)
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(team)
        });
      }

      await fetchTeams(); // 🔥 IMPORTANT
      handleClose();
    } catch (error) {
      console.error('SAVE TEAM ERROR 👉', error);
    }
  };

  /* 🔹 DELETE TEAM */
  const handleDeleteTeam = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      await fetchTeams(); // 🔥 IMPORTANT
    } catch (error) {
      console.error('DELETE TEAM ERROR 👉', error);
    }
  };

  if (!state) {
    return (
      <p className="text-center text-danger mt-5">
        No project selected. Please go back.
      </p>
    );
  }

  return (
    <>
      <PageBreadcrumb subName="Projects" title="Teams" subLink="http://localhost:5173/create-projects"/>
      <PageMetaData title="Teams" />

      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
                <h5 className="mb-0">
                  Teams – <span className="text-muted">{state.projectName}</span>
                </h5>

                <Button variant="primary" onClick={handleOpen}>
                  + Create Team
                </Button>
              </div>
            </CardBody>

            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Team Name</th>
                    <th>Status</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {teams.map((team) => (
                    <tr key={team._id}>
                      <td>
                        <span
                          role="button"
                          className="fw-medium text-primary"
                          onClick={() =>
                            navigate('/view-users', {
                              state: { TeamName: team.name }
                            })
                          }
                        >
                          {team.name}
                        </span>
                      </td>

                      <td>{team.type}</td>

                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <Button
                            variant="soft-primary"
                            size="sm"
                            onClick={() => {
                              setEditTeam(team);
                              setShowTeamForm(true);
                            }}
                          >
                            <IconifyIcon icon="bx:edit" />
                          </Button>

                          <Button
                            variant="soft-danger"
                            size="sm"
                            onClick={() => handleDeleteTeam(team._id)}
                          >
                            <IconifyIcon icon="bx:trash" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {teams.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        No teams found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <Offcanvas
            show={showTeamForm}
            onHide={handleClose}
            placement="end"
            style={{
              top: '70px',
              height: 'calc(100vh - 70px)',
              width: window.innerWidth < 768 ? '100%' : '30%'
            }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                {editTeam ? 'Edit Team' : 'Create Team'}
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <AddTeamForm
                onSave={handleAddOrUpdateTeam}
                onCancel={handleClose}
                defaultValues={editTeam}
              />
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </>
  );
};

export default CreateTeams;
