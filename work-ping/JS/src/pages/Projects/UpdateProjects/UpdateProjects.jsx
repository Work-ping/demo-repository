import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Form, Card, CardBody, Row, Col } from 'react-bootstrap'
import ComponentContainerCard from '@/components/ComponentContainerCard'


const schema = yup.object({
  name: yup.string().required('Name is required'),
  assignedDate: yup.string().required('Assigned Date is required'),
  dueDate: yup.string().required('Due Date is required'),
  contractedBy: yup.string().required('Contracted By is required'),
  organizationId: yup.string().required('Organization ID is required'),
  description: yup.string().required('Description is required'),
})


const projectData = {
  name: 'Website Redesign',
  assignedDate: '2024-09-01',
  dueDate: '2024-10-15',
  contractedBy: 'ABC Corp',
  organizationId: 'ORG-102',
  description: 'Redesign the corporate website with modern UI.',
}

const TaskForm = () => {
  const [isEditMode, setIsEditMode] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: projectData,
  })

  const onSubmit = data => {
    console.log('UPDATED DATA:', data)
    setIsEditMode(false)
  }

  const handleCancel = () => {
    reset(projectData) 
    setIsEditMode(false)
  }

  return (
       <ComponentContainerCard id="basic">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4>Project Project</h4>
                {!isEditMode && (
                  <Button onClick={() => setIsEditMode(true)}>
                    Edit
                  </Button>
                )}
              </div>

              <Form className="row g-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-6">
                  <div className="row g-3">

                    <div className="col-12">
                      <Form.Label>Name*</Form.Label>
                      <Form.Control
                        disabled={!isEditMode}
                        {...register('name')}
                      />
                      <small className="text-danger">{errors.name?.message}</small>
                    </div>

                    <div className="col-12">
                      <Form.Label>Assigned Date*</Form.Label>
                      <Form.Control
                        type="date"
                        disabled={!isEditMode}
                        {...register('assignedDate')}
                      />
                    </div>

                    <div className="col-12">
                      <Form.Label>Due Date*</Form.Label>
                      <Form.Control
                        type="date"
                        disabled={!isEditMode}
                        {...register('dueDate')}
                      />
                    </div>

                    <div className="col-12">
                      <Form.Label>Contracted By*</Form.Label>
                      <Form.Control
                        disabled={!isEditMode}
                        {...register('contractedBy')}
                      />
                    </div>

                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row g-3">

                    <div className="col-12">
                      <Form.Label>Organization ID*</Form.Label>
                      <Form.Control
                        disabled={!isEditMode}
                        {...register('organizationId')}
                      />
                    </div>

                    <div className="col-12">
                      <Form.Label>Description*</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={9}
                        disabled={!isEditMode}
                        {...register('description')}
                      />
                    </div>

                  </div>
                </div>
                {isEditMode && (
                  <div className="col-12 d-flex justify-content-center gap-4">
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>

                    <Button type="submit">
                      Save
                    </Button>
                  </div>
                )}

              </Form>

       </ComponentContainerCard>
  )
}

export default TaskForm
