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
import AddTeamMemberForm from './AddTeamMemberForm';

const API_URL = '';

const ViewTeamMembers = () => {
  const { state } = useLocation();

  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMember, setEditMember] = useState(null);

  /* 🔹 FETCH MEMBERS */
  const fetchMembers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log('MEMBERS FROM BACKEND 👉', data);
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('FETCH MEMBERS ERROR 👉', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpen = () => {
    setEditMember(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setEditMember(null);
    setShowForm(false);
  };

  /* 🔹 ADD or UPDATE MEMBER */
  const handleAddOrUpdate = async (member) => {
    try {
      if (editMember) {
        await fetch(`${API_URL}/${editMember._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(member)
        });
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(member)
        });
      }

      await fetchMembers(); // 🔥 refresh UI
      handleClose();
    } catch (error) {
      console.error('SAVE MEMBER ERROR 👉', error);
    }
  };

  /* 🔹 DELETE MEMBER */
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      await fetchMembers(); // 🔥 refresh UI
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
      <PageBreadcrumb subName="Teams" title="Team Members" subLink="http://localhost:5173/create-teams"/>
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
                  {members.map((member) => (
                    <tr key={member._id}>
                      <td>{member.userId}</td>
                      <td className="fw-medium">{member.userName}</td>
                      <td>{member.workingType}</td>

                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <Button
                            variant="soft-primary"
                            size="sm"
                            onClick={() => {
                              setEditMember(member);
                              setShowForm(true);
                            }}
                          >
                            <IconifyIcon icon="bx:edit" />
                          </Button>

                          <Button
                            variant="soft-danger"
                            size="sm"
                            onClick={() => handleDelete(member._id)}
                          >
                            <IconifyIcon icon="bx:trash" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {members.length === 0 && (
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
              <AddTeamMemberForm
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

export default ViewTeamMembers;
