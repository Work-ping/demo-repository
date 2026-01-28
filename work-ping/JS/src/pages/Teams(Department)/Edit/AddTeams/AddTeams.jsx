import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, Col, Row, Button } from 'react-bootstrap';
import PageBreadcrumb from '@/components/layout/PageBreadcrumb';
import PageMetaData from '@/components/PageTitle';
import TeamsForm from './TeamsForm';

const API_URL = 'http://localhost:5000/api/admin/team';

const CreateTeam = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const editTeam = state?.team || null;

  const handleSave = async (payload) => {
    try {
      if (editTeam) {
        await fetch(`${API_URL}/${editTeam._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(`${API_URL}/create-team`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    } catch (error) {
      console.error('SAVE TEAM ERROR 👉', error);
    }
  };

  return (
    <>
      <PageBreadcrumb
        subName="Projects"
        title={editTeam ? 'Edit Team' : 'Create Team'}
      />
      <PageMetaData title="Team Form" />

      <Row className="justify-content-center">
        <Col xl={11} lg={10}>
          <Card>
            <CardBody>
              <TeamsForm
                onSave={handleSave}
                onCancel={() => navigate('')}
                defaultValues={editTeam}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateTeam;
