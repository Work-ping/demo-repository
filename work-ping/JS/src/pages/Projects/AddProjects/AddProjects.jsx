import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Form, Card, CardBody, Row, Col } from 'react-bootstrap'

import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'


const schema = yup.object({
  name: yup.string().required('Name is required'),
  assignedDate: yup.string().required('Assigned Date is required'),
  dueDate: yup.string().required('Due Date is required'),
  contractedBy: yup.string().required('Contracted By is required'),
  organizationId: yup.string().required('Organization ID is required'),
  description: yup.string().required('Description is required'),
})

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = data => {
    console.log('FORM DATA:', data)
  }

  return (
    <>
      <PageBreadcrumb subName="Projects" title="Create Projects" />
      <PageMetaData title="Create Projects" />

      <Row className="justify-content-center">
        <Col xl={11} lg={10}>
          <Card>
            <CardBody>
              <Form className="row g-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-6">
                  <div className="row g-3">

                    <div className="col-12">
                      <Form.Label>Name*</Form.Label>
                      <Form.Control {...register('name')} />
                      <small className="text-danger">{errors.name?.message}</small>
                    </div>

                    <div className="col-12">
                      <Form.Label>Assigned Date*</Form.Label>
                      <Form.Control type="date" {...register('assignedDate')} />
                      <small className="text-danger">{errors.assignedDate?.message}</small>
                    </div>

                    <div className="col-12">
                      <Form.Label>Due Date*</Form.Label>
                      <Form.Control type="date" {...register('dueDate')} />
                      <small className="text-danger">{errors.dueDate?.message}</small>
                    </div>

                    <div className="col-12">
                      <Form.Label>Contracted By*</Form.Label>
                      <Form.Control {...register('contractedBy')} />
                      <small className="text-danger">{errors.contractedBy?.message}</small>
                    </div>

                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row g-3">

                    <div className="col-12">
                      <Form.Label>Organization ID*</Form.Label>
                      <Form.Control {...register('organizationId')} />
                      <small className="text-danger">{errors.organizationId?.message}</small>
                    </div>

                    <div className="col-12">
                      <Form.Label>Description*</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={8}
                        {...register('description')}
                      />
                      <small className="text-danger">{errors.description?.message}</small>
                    </div>

                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center gap-4">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => reset()}
                  >
                    Clear
                  </Button>

                  <Button type="submit">
                    Submit
                  </Button>
                </div>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default TaskForm
