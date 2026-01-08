import ComponentContainerCard from '@/components/ComponentContainerCard'
import CustomFlatpickr from '@/components/CustomFlatpickr'
import PasswordFormInput from '@/components/form/PasswordFormInput'
import { Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormCheck, Row } from 'react-bootstrap'
import { useState } from 'react'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { useForm } from 'react-hook-form'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import countryCodes from 'country-calling-code'
import MaskedInput from 'react-text-mask-legacy'

const EmployeeDetailsForm = () => {
  const [countryCode, setCountryCode] = useState('+91')
  const [Gender, setGender] = useState('Select Gender')
  const [search, setSearch] = useState('')
  const { control } = useForm()
  return (
    <ComponentContainerCard id="basic" title="Organization Details" description={<></>}>
      <div>
        <TextFormInput
          name="Organization Name"
          label="Organization Name"
          control={control}
          placeholder="Enter Organization Name"
          containerClassName="mb-3"
        />
        <TextFormInput
          name="Organization type"
          label="Organization Type"
          control={control}
          placeholder="Enter Organization Type"
          containerClassName="mb-3"
        />
        <div className="mb-3">
          <label className="form-label" htmlFor="contactnumber">
            Casual Leaves
          </label>
          <input type="number" className="form-control" placeholder="Enter casual Leaves" min={0} max={15} />
        </div>
        <TextAreaFormInput name="textarea" label="Description" control={control} rows={5} />
        
        <div className="mb-3">
            <label className="form-label" >
                Organization Ip Adress
            </label>
            <MaskedInput mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/]} placeholder="___.___.___.___" className="form-control" />
        </div>
      </div>
    </ComponentContainerCard>
  )
}
export default EmployeeDetailsForm
