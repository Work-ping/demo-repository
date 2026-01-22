import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'react-bootstrap'

import ComponentContainerCard from '@/components/ComponentContainerCard'
import TextFormInput from '@/components/form/TextFormInput'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import CustomFlatpickr from '@/components/CustomFlatpickr'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import countryCodes from 'country-calling-code'
import FaceEmbeddings from './FaceEmbeddings'

const AddEmployee = () => {
  const [step, setStep] = useState(0)
  const [countryCode, setCountryCode] = useState('+91')
  const [gender, setGender] = useState('')
  const [role, setRole] = useState('')
  const [search, setSearch] = useState('')
  const [faceEmbedding, setFaceEmbedding] = useState(null)

  const { control, setValue, getValues } = useForm()

  const goNext = () => {
    setValue('gender', gender)
    setValue('role', role)
    setValue('countryCode', countryCode)
    setStep(1)
  }

  const submitForm = () => {
    const data = getValues()
    data.phone = countryCode + (data.phone || '')
    data.gender = gender
    data.role = role
    data.faceEmbedding = faceEmbedding?.hash
    data.faceSource = faceEmbedding?.source

    console.log('SUBMITTED DATA:', data)
  }

  return (
    <>
      {step === 0 && (
        <ComponentContainerCard title="Add Basic Employee Details">
          <TextFormInput
            name="userId"
            label="User Id"
            placeholder="Enter User Id"
            control={control}
          />

          <TextFormInput
            name="user"
            label="User Name"
            placeholder="Enter User Name"
            control={control}
          />

          <TextFormInput
            name="email"
            label="Email"
            placeholder="Enter Email"
            control={control}
          />

          <label className="form-label">Contact Number</label>
          <Dropdown className="input-group mb-3">
            <DropdownToggle className="btn btn-light rounded-end-0 border arrow-none">
              <div className="icons-center">
                {countryCode}
                <IconifyIcon icon="bx:chevron-down" className="ms-2" />
              </div>
            </DropdownToggle>

            <DropdownMenu style={{ width: 280 }}>
              <input
                className="form-control m-2"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div style={{ maxHeight: 240, overflowY: 'auto' }}>
                {countryCodes
                  .filter(c =>
                    c.country.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(c => (
                    <DropdownItem
                      key={c.isoCode2}
                      onClick={() => {
                        setCountryCode('+' + c.countryCodes[0])
                        setSearch('')
                      }}
                    >
                      {c.country} (+{c.countryCodes[0]})
                    </DropdownItem>
                  ))}
              </div>
            </DropdownMenu>

            <TextFormInput
              name="phone"
              placeholder="Phone number"
              control={control}
            />
          </Dropdown>

          <label className="form-label">Date of Birth</label>
          <CustomFlatpickr
            className="form-control mb-3"
            options={{ enableTime: false }}
            onChange={(d) => setValue('dob', d[0])}
          />

          <TextAreaFormInput
            name="address"
            label="Address"
            placeholder="Enter Address"
            rows={4}
            control={control}
          />

          <label className="form-label">Gender</label>
          <Dropdown className="mb-3">
            <DropdownToggle className="btn btn-light rounded-end-0 border arrow-none">
              <div className="icons-center">
                {gender || 'Select Gender'}
                <IconifyIcon icon="bx:chevron-down" className="ms-2" />
              </div>
            </DropdownToggle>
            <DropdownMenu>
              {['Male', 'Female', 'Other'].map(g => (
                <DropdownItem key={g} onClick={() => setGender(g)}>
                  {g}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <label className="form-label">Date of Joining</label>
          <CustomFlatpickr
            className="form-control mb-3"
            options={{ enableTime: false }}
            onChange={(d) => setValue('doj', d[0])}
          />

          <label className="form-label">Role</label>
          <Dropdown className="mb-3">
            <DropdownToggle className="btn btn-light rounded-end-0 border arrow-none">
              <div className="icons-center">
                {role || 'Select Role'}
                <IconifyIcon icon="bx:chevron-down" className="ms-2" />
              </div>
            </DropdownToggle>
            <DropdownMenu>
              {['Admin', 'Developer', 'Tester'].map(r => (
                <DropdownItem key={r} onClick={() => setRole(r)}>
                  {r}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <TextFormInput
            name="aadhaar"
            label="Aadhaar Id"
            placeholder="12 digit Aadhaar"
            control={control}
          />

          <TextFormInput
            name="passport"
            label="Passport Id"
            placeholder="Enter Passport Id"
            control={control}
          />

          <TextFormInput
            name="pan"
            label="PAN Id"
            placeholder="ABCDE1234F"
            control={control}
          />

          <TextFormInput
            name="bank"
            label="Bank Id"
            placeholder="Enter Bank Id"
            control={control}
          />

          <div className="d-flex justify-content-end mt-4">
            <Button className="rounded-pill" onClick={goNext}>
              Next
            </Button>
          </div>
        </ComponentContainerCard>
      )}

      {step === 1 && (
        <>
          <FaceEmbeddings
            onCapture={(data) => {
              setFaceEmbedding(data)
              console.log(
                `FACE HASH RECEIVED FROM ${data.source.toUpperCase()}:`,
                data.hash
              )
            }}
          />

          <div className="d-flex justify-content-between mt-3">
            <Button onClick={() => setStep(0)}>Previous</Button>
            <Button variant="success" onClick={submitForm}>
              Submit
            </Button>
          </div>
        </>
      )}
    </>
  )
}

export default AddEmployee
