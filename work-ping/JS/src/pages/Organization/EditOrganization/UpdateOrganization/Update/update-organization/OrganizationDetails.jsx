import ComponentContainerCard from '@/components/ComponentContainerCard'
import PasswordFormInput from '@/components/form/PasswordFormInput'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import MaskedInput from 'react-text-mask-legacy'

const organizationTempData = {
  1: {
    organizationName: 'TechNova Solutions',
    organizationType: 'IT Services',
    casualLeaves: 12,
    description: 'A technology services organization focused on software development and consulting.',
    ipAddress: '192.168.1.100',
    passKey: 'TN@2026',
    firstCorner: { latitude: 17.385044, longitude: 78.486671 },
    secondCorner: { latitude: 17.3855, longitude: 78.4872 },
    thirdCorner: { latitude: 17.3848, longitude: 78.4876 },
    fourthCorner: { latitude: 17.3843, longitude: 78.4869 }
  }
}

const schema = yup.object({
  organizationName: yup.string().required(),
  organizationType: yup.string().required(),
  casualLeaves: yup.number().required(),
  ipAddress: yup.string().required(),
  passKey: yup.string().required()
})

const EmployeeDetailsForm = () => {
  const { orgId } = useParams()
  const orgData = organizationTempData[orgId]
  const [edit, setEdit] = useState({})

  const toggleEdit = (field) =>
    setEdit((p) => ({ ...p, [field]: !p[field] }))

  const { control, register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      organizationName: orgData.organizationName,
      organizationType: orgData.organizationType,
      casualLeaves: orgData.casualLeaves,
      description: orgData.description,
      ipAddress: orgData.ipAddress,
      passKey: orgData.passKey,
      lat1: orgData.firstCorner.latitude,
      lng1: orgData.firstCorner.longitude,
      lat2: orgData.secondCorner.latitude,
      lng2: orgData.secondCorner.longitude,
      lat3: orgData.thirdCorner.latitude,
      lng3: orgData.thirdCorner.longitude,
      lat4: orgData.fourthCorner.latitude,
      lng4: orgData.fourthCorner.longitude
    }
  })

  const onSubmit = (data) => console.log(data)

  const EditBtn = ({ field }) => (
    <Button
      variant={edit[field] ? 'outline-danger' : 'outline-primary'}
      className="px-3"
      onClick={() => toggleEdit(field)}
    >
      {edit[field] ? 'Lock' : 'Edit'}
    </Button>
  )

  return (
    <ComponentContainerCard title="Organization Details">
      <form onSubmit={handleSubmit(onSubmit)}>

        {[
          ['organizationName', 'Organization Name*'],
          ['organizationType', 'Organization Type*']
        ].map(([name, label]) => (
          <div className="mb-3">
            <label className="form-label">{label}</label>
            <div className="d-flex gap-2">
              <div className="flex-grow-1">
                <TextFormInput name={name} control={control} disabled={!edit[name]} />
              </div>
              <EditBtn field={name} />
            </div>
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Casual Leaves*</label>
          <div className="d-flex gap-2">
            <input
              type="number"
              className="form-control"
              disabled={!edit.casualLeaves}
              {...register('casualLeaves')}
            />
            <EditBtn field="casualLeaves" />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <div className="d-flex gap-2">
            <div className="flex-grow-1">
              <TextAreaFormInput
                name="description"
                control={control}
                disabled={!edit.description}
              />
            </div>
            <EditBtn field="description" />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Organization IP Address</label>
          <div className="d-flex gap-2">
            <Controller
              name="ipAddress"
              control={control}
              render={({ field }) => (
                <MaskedInput
                  {...field}
                  disabled={!edit.ipAddress}
                  className="form-control"
                  mask={[
                    /\d/, /\d/, /\d/, '.',
                    /\d/, /\d/, /\d/, '.',
                    /\d/, /\d/, /\d/, '.',
                    /\d/, /\d/, /\d/
                  ]}
                />
              )}
            />
            <EditBtn field="ipAddress" />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Pass Key*</label>
          <div className="d-flex gap-2">
            <div className="flex-grow-1">
              <PasswordFormInput name="passKey" control={control} disabled={!edit.passKey} />
            </div>
            <EditBtn field="passKey" />
          </div>
        </div>

       
        {[
          ['lat1', 'lng1', 'First'],
          ['lat2', 'lng2', 'Second'],
          ['lat3', 'lng3', 'Third'],
          ['lat4', 'lng4', 'Fourth']
        ].map(([lat, lng, label]) => (
          <div className="mb-3" key={lat}>
            <label className="form-label">{label} Corner</label>
            <div className="d-flex gap-2">
              <input
                type="number"
                step="any"
                className="form-control"
                placeholder={`Latitude ${label}`}
                disabled={!edit[lat]}
                {...register(lat)}
              />
              <input
                type="number"
                step="any"
                className="form-control"
                placeholder={`Longitude ${label}`}
                disabled={!edit[lat]}
                {...register(lng)}
              />
              <EditBtn field={lat} />
            </div>
          </div>
        ))}

        <div className="text-center mt-4">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>

      </form>
    </ComponentContainerCard>
  )
}

export default EmployeeDetailsForm
