import ComponentContainerCard from '@/components/ComponentContainerCard'
import CustomFlatpickr from '@/components/CustomFlatpickr'
import PasswordFormInput from '@/components/form/PasswordFormInput'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import MaskedInput from 'react-text-mask-legacy'

// Yup Schema
const schema = yup.object({
  organizationName: yup.string().required('Organization Name is required'),
  organizationType: yup.string().required('Organization Type is required'),
  casualLeaves: yup
    .number()
    .typeError('Casual Leaves must be a number')
    .min(0, 'Minimum 0')
    .max(15, 'Maximum 15')
    .required('Casual Leaves is required'),
  ipAddress: yup
    .string()
    .matches(
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
      'Invalid IP Address'
    )
    .required('IP Address is required'),
  passKey: yup.string().min(6, 'Minimum 6 characters').required('Pass Key is required'),

  lat1: yup.number().required('Latitude is required'),
  lng1: yup.number().required('Longitude is required'),
  lat2: yup.number().required('Latitude is required'),
  lng2: yup.number().required('Longitude is required'),
  lat3: yup.number().required('Latitude is required'),
  lng3: yup.number().required('Longitude is required'),
  lat4: yup.number().required('Latitude is required'),
  lng4: yup.number().required('Longitude is required'),
})

const EmployeeDetailsForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <ComponentContainerCard id="basic" title="Organization Details" description={<></>}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextFormInput
          name="organizationName"
          label="Organization Name*"
          control={control}
          placeholder="Enter Organization Name"
          containerClassName="mb-3"
        />

        <TextFormInput
          name="organizationType"
          label="Organization Type*"
          control={control}
          placeholder="Enter Organization Type"
          containerClassName="mb-3"
        />

        <div className="mb-3">
          <label className="form-label">Casual Leaves*</label>
          <input
            type="number"
            className="form-control"
            {...register('casualLeaves')}
          />
          <small className="text-danger">{errors.casualLeaves?.message}</small>
        </div>

        <TextAreaFormInput
          containerClassName="mb-3"
          name="description"
          label="Description"
          control={control}
          rows={5}
        />

        <div className="mb-3">
          <label className="form-label">Organization IP Address*</label>
          <input
            className="form-control"
            placeholder="___.___.___.___"
            {...register('ipAddress')}
          />
          <small className="text-danger">{errors.ipAddress?.message}</small>
        </div>

        <PasswordFormInput
          control={control}
          name="passKey"
          containerClassName="mb-3"
          placeholder="Enter your passkey"
          id="password-id"
          label="Pass Key*"
        />

        {[
          ['lat1', 'lng1', 'First'],
          ['lat2', 'lng2', 'Second'],
          ['lat3', 'lng3', 'Third'],
          ['lat4', 'lng4', 'Fourth'],
        ].map(([lat, lng, label]) => (
          <div className="row mb-3" key={lat}>
            <div className="col-md-6">
              <label className="form-label">Latitude {label} Corner</label>
              <input type="number" step="any" className="form-control" {...register(lat)} />
              <small className="text-danger">{errors[lat]?.message}</small>
            </div>

            <div className="col-md-6">
              <label className="form-label">Longitude {label} Corner</label>
              <input type="number" step="any" className="form-control" {...register(lng)} />
              <small className="text-danger">{errors[lng]?.message}</small>
            </div>
          </div>
        ))}

        <div className="text-center mt-3">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </form>
    </ComponentContainerCard>
  )
}

export default EmployeeDetailsForm
