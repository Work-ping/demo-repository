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
import TeamsForm from './TeamsForm';


const API_URL = 'http://localhost:5000/api/teams';

const Teams = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const projectName = state?.projectName || 'All Projects';

  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teams, setTeams] = useState([]);
  const [editTeam, setEditTeam] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setTeams(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('FETCH TEAMS ERROR 👉', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  /* 🔹 OPEN / CLOSE FORM */
  const handleOpen = () => {
    setEditTeam(null);
    setShowTeamForm(true);
  };

  const handleClose = () => {
    setEditTeam(null);
    setShowTeamForm(false);
  };


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

      await fetchTeams();
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
      fetchTeams();
    } catch (error) {
      console.error('DELETE TEAM ERROR 👉', error);
    }
  };

  return (
    <>
      <PageBreadcrumb subName="Projects" title="Teams" subLink="" />
      <PageMetaData title="Teams" />

      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  Teams – <span className="text-muted">{projectName}</span>
                </h5>

                <Button variant="primary" onClick={handleOpen}>
                  + Create Team
                </Button>
              </div>
            </CardBody>

            {/* 🔹 TEAM TABLE */}
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Team Name</th>
                    <th>Team Count</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        Loading teams...
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    teams.map((team) => (
                      <tr key={team._id}>
                        <td>
                          <span
                            role="button"
                            className="fw-medium text-primary"
                            onClick={() =>
                              navigate('/view-members', {
                                state: { TeamName: team.name }
                              })
                            }
                          >
                            {team.name}
                          </span>
                        </td>

                        <td>{team.teamCount}</td>

                        <td className="text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => {
                                setEditTeam(team);
                                setShowTeamForm(true);
                              }}
                            >
                              <IconifyIcon icon="bx:edit" />
                            </Button>

                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleDeleteTeam(team._id)}
                            >
                              <IconifyIcon icon="bx:trash" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}

                  {!loading && teams.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        No teams created yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 🔹 OFFCANVAS FORM */}
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
              <TeamsForm
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

export default Teams;
