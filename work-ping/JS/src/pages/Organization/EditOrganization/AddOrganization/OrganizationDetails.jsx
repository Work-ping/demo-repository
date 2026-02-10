import ComponentContainerCard from '@/components/ComponentContainerCard'
import { Button, Form } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import MaskedInput from 'react-text-mask-legacy'


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
  
})

const EmployeeDetailsForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    shouldFocusError: false,
  })

  const onSubmit = async (data) => {
    const newData = {
      name: data.organizationName,
      type: data.organizationType,
      clDays: data.casualLeaves,
      description: data.description,
      IPWhitelist: data.ipAddress,
      geoFence: [
        { lat: data.lat1, lng: data.lng1 },
        { lat: data.lat2, lng: data.lng2 },
        { lat: data.lat3, lng: data.lng3 },
        { lat: data.lat4, lng: data.lng4 },
      ],
    }

    console.log('Organization Details Submitted:', newData)

    await fetch('http://localhost:5000/api/admin/organization/add-organization', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    })
  }

  return (
    <ComponentContainerCard id="basic" title="Organization Details">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">

         
          <div className="col-md-4 mb-3">
            <Form.Label>Organization Name*</Form.Label>
            <Form.Control placeholder="Enter Organization Name" {...register('organizationName')} />
            <small className="text-danger">{errors.organizationName?.message}</small>
          </div>

         
          <div className="col-md-4 mb-3">
            <Form.Label>Organization Type*</Form.Label>
            <Form.Control placeholder="Enter Organization Type" {...register('organizationType')} />
            <small className="text-danger">{errors.organizationType?.message}</small>
          </div>

          
          <div className="col-md-4 mb-3">
            <Form.Label>Casual Leaves*</Form.Label>
            <Form.Control placeholder="Enter Casual Leaves" type="number" {...register('casualLeaves')} />
            <small className="text-danger">{errors.casualLeaves?.message}</small>
          </div>

          
          <div className="col-md-4 mb-3">
            <Form.Label>Organization IP Address*</Form.Label>
            <Controller
              name="ipAddress"
              control={control}
              render={({ field }) => (
                <MaskedInput
                  {...field}
                  mask={[
                    /\d/, /\d/, /\d/, '.',
                    /\d/, /\d/, /\d/, '.',
                    /\d/, /\d/, /\d/, '.',
                    /\d/, /\d/, /\d/
                  ]}
                  className="form-control"
                  placeholder="___.___.___.___"
                />
              )}
            />
            <small className="text-danger">{errors.ipAddress?.message}</small>
          </div>

         
         

         
          {/* {[
            ['lat1', 'lng1', 'First'],
            ['lat2', 'lng2', 'Second'],
            ['lat3', 'lng3', 'Third'],
            ['lat4', 'lng4', 'Fourth'],
          ].map(([lat, lng, label]) => (
            <>
              <div className="col-md-4 mb-3" key={lat}>
                <Form.Label>Latitude {label}</Form.Label>
                <Form.Control type="number" step="any" {...register(lat)} />
              </div>

              <div className="col-md-4 mb-3">
                <Form.Label>Longitude {label}</Form.Label>
                <Form.Control type="number" step="any" {...register(lng)} />
              </div>
            </>
          ))} */}

  
          <div className="col-12 mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={4} {...register('description')} />
          </div>

         
          <div className="col-12 text-center mt-3">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>

        </div>
      </Form>
    </ComponentContainerCard>
  )
}

export default EmployeeDetailsForm
