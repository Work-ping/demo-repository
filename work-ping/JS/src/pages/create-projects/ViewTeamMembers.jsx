import { useState } from 'react';
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

/* ---------- Default Members ---------- */
const DEFAULT_MEMBERS = [
  {
    userId: 'USR-101',
    userName: 'John Doe',
    workingType: 'Remote',
  },
  {
    userId: 'USR-102',
    userName: 'Priya',
    workingType: 'Hybrid',
  },
];

const ViewTeamMembers = () => {
  const { state } = useLocation();

  const [members, setMembers] = useState(DEFAULT_MEMBERS);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleOpen = () => {
    setEditIndex(null);
    setShowForm(true);
  };

  const handleClose = () => {
    setEditIndex(null);
    setShowForm(false);
  };

  const handleAddOrUpdate = (member) => {
    if (editIndex !== null) {
      setMembers(prev =>
        prev.map((m, i) => (i === editIndex ? member : m))
      );
    } else {
      setMembers(prev => [...prev, member]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setMembers(prev => prev.filter((_, i) => i !== index));
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
      <PageBreadcrumb subName="Teams" title="Team Members" />
      <PageMetaData title="Team Members" />

      <Row>
        <Col>
          <Card>
            <CardBody>
              {/* Header */}
             <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                <h5 className="mb-0">
                  Members –
                  <span className="text-muted ms-1">
                    {state.TeamName}
                  </span>
                </h5>

                <Button
                  variant="primary"
                  onClick={handleOpen}
                >
                  + Add Member
                </Button>
              </div>
            </CardBody>

            {/* Members Table */}
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
                  {members.map((member, index) => (
                    <tr key={index}>
                      <td>{member.userId}</td>
                      <td className="fw-medium">
                        {member.userName}
                      </td>
                      <td>{member.workingType}</td>

                      {/* Action Buttons */}
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2 flex-nowrap">
                          <Button
                            variant="soft-primary"
                            size="sm"
                            onClick={() => handleEdit(index)}
                          >
                            <IconifyIcon icon="bx:edit" className="fs-16" />
                          </Button>

                          <Button
                            variant="soft-danger"
                            size="sm"
                            onClick={() => handleDelete(index)}
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
            show={showForm}
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
                {editIndex !== null ? 'Edit Member' : 'Add Member'}
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <AddTeamMemberForm
                onSave={handleAddOrUpdate}
                onCancel={handleClose}
                defaultValues={
                  editIndex !== null ? members[editIndex] : null
                }
              />
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </>
  );
};

export default ViewTeamMembers;
