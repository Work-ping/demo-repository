import { useState } from 'react';
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

/* ---------- Default Teams ---------- */
const DEFAULT_TEAMS = [
  { name: 'Frontend Team', type: 'Completed' },
  { name: 'Backend Team', type: 'In-Progress' },
];

const CreateTeams = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teams, setTeams] = useState(DEFAULT_TEAMS);
  const [editIndex, setEditIndex] = useState(null);

  const handleOpen = () => {
    setEditIndex(null);
    setShowTeamForm(true);
  };

  const handleClose = () => {
    setEditIndex(null);
    setShowTeamForm(false);
  };

  const handleAddOrUpdateTeam = (team) => {
    if (editIndex !== null) {
      setTeams(prev =>
        prev.map((t, i) => (i === editIndex ? team : t))
      );
    } else {
      setTeams(prev => [...prev, team]);
    }
    handleClose();
  };

  const handleEditTeam = (index) => {
    setEditIndex(index);
    setShowTeamForm(true);
  };

  const handleDeleteTeam = (index) => {
    setTeams(prev => prev.filter((_, i) => i !== index));
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
      <PageBreadcrumb subName="Projects" title="Teams" />
      <PageMetaData title="Teams" />

      <Row>
        <Col>
          <Card>
            <CardBody>
              {/* Header */}
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                <h5 className="mb-0">
                  Teams –{' '}
                  <span className="text-muted">
                    {state.projectName}
                  </span>
                </h5>

                <Button
                  variant="primary"
                  onClick={handleOpen}>
                  + Create Team
                </Button>
              </div>
            </CardBody>

            {/* Teams Table */}
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
                  {teams.map((team, index) => (
                    <tr key={index}>
                      <td>
                        <span
                          role="button"
                          className="fw-medium text-primary"
                          onClick={() =>
                            navigate('/view-users', {
                              state: { TeamName: team.name },
                            })
                          }
                        >
                          {team.name}
                        </span>
                      </td>

                      <td>{team.type}</td>

                      {/* Action Buttons */}
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2 flex-nowrap">
                          <Button
                            variant="soft-primary"
                            size="sm"
                            onClick={() => handleEditTeam(index)}
                          >
                            <IconifyIcon icon="bx:edit" className="fs-16" />
                          </Button>

                          <Button
                            variant="soft-danger"
                            size="sm"
                            onClick={() => handleDeleteTeam(index)}
                          >
                            <IconifyIcon icon="bx:trash" className="fs-16" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Offcanvas */}
          <Offcanvas
            show={showTeamForm}
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
                {editIndex !== null ? 'Edit Team' : 'Create Team'}
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <AddTeamForm
                onSave={handleAddOrUpdateTeam}
                onCancel={handleClose}
                defaultValues={
                  editIndex !== null ? teams[editIndex] : null
                }
              />
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </>
  );
};

export default CreateTeams;
