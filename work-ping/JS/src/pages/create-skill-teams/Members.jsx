import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Offcanvas
} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import PageBreadcrumb from '@/components/layout/PageBreadcrumb';
import PageMetaData from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MembersForm from './MembersForm';

const API_URL = 'http://localhost:5000/api/admin/member';

const Members = () => {
  const { state } = useLocation(); 

  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}?teamId=${state.teamId}`);
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('FETCH MEMBERS ERROR 👉', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state?.teamId) {
      fetchMembers();
    }
  }, [state]);


  const handleOpen = () => {
    setEditMember(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setEditMember(null);
    setShowForm(false);
  };


  const handleAddOrUpdate = async (payload) => {
    try {
      if (editMember) {
    
        await fetch(`${API_URL}/${editMember._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(`${API_URL}/create-member`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            teamId: state.teamId
          })
        });
      }

      await fetchMembers();
      handleClose();
    } catch (error) {
      console.error('SAVE MEMBER ERROR 👉', error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      fetchMembers();
    } catch (error) {
      console.error('DELETE MEMBER ERROR 👉', error);
    }
  };

  if (!state) {
    return (
      <p className="text-center text-danger mt-5">
        No team selected. Please go back.
      </p>
    );
  }

  return (
    <>
      <PageBreadcrumb
        subName="Teams"
        title="Team Members"
        subLink="http://localhost:5174/skill-teams"
      />
      <PageMetaData title="Team Members" />

      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
                <h5 className="mb-0">
                  Members –
                  <span className="text-muted ms-1">
                    {state.TeamName}
                  </span>
                </h5>

                <Button variant="primary" onClick={handleOpen}>
                  + Add Member
                </Button>
              </div>
            </CardBody>

            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Working Type</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        Loading members...
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    members.map((member) => (
                      <tr key={member._id}>
                        <td>{member.userId}</td>
                        <td className="fw-medium">{member.userName}</td>
                        <td>{member.workingType}</td>

                        <td className="text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <Button
                              size="sm"
                              variant="soft-primary"
                              onClick={() => {
                                setEditMember(member);
                                setShowForm(true);
                              }}
                            >
                              <IconifyIcon icon="bx:edit" />
                            </Button>

                            <Button
                              size="sm"
                              variant="soft-danger"
                              onClick={() => handleDelete(member._id)}
                            >
                              <IconifyIcon icon="bx:trash" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}

                  {!loading && members.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
          <Offcanvas
            show={showForm}
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
                {editMember ? 'Edit Member' : 'Add Member'}
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <MembersForm
                onSave={handleAddOrUpdate}
                onCancel={handleClose}
                defaultValues={editMember}
              />
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </>
  );
};

export default Members;
