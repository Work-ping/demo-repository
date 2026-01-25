import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ComponentContainerCard from '@/components/ComponentContainerCard'
import TextFormInput from '@/components/form/TextFormInput'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import CustomFlatpickr from '@/components/CustomFlatpickr'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import countryCodes from 'country-calling-code'
import FaceEmbeddings from './FaceEmbeddings'

/* ===================== DATA ===================== */

const employeeDetailsObject = {
  '1': {
    userId: 'EMP-001',
    user: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    countryCode: '+91',
    dob: new Date('1998-05-10'),
    address: 'Hyderabad',
    gender: 'Male',
    role: 'Developer',
    aadhaar: '123456789012',
    passport: 'P1234567',
    pan: 'ABCDE1234F',
    bank: 'HDFC123',
    doj: new Date('2022-01-15'),
  },
}

/* ===================== VALIDATION ===================== */

const schema = yup.object({
  userId: yup.string().required(),
  user: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^[0-9]{10}$/).required(),
  aadhaar: yup.string().matches(/^[0-9]{12}$/).required(),
  pan: yup
    .string()
    .nullable()
    .transform(v => (v === '' ? null : v))
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { excludeEmptyString: true }),
})

/* ===================== HELPERS ===================== */

const EditableWrapper = ({ editable, children }) => (
  <div
    style={{
      pointerEvents: editable ? 'auto' : 'none',
      opacity: editable ? 1 : 0.6,
    }}
  >
    {children}
  </div>
)

const CountryCodeDropdown = ({
  value,
  onChange,
  editable,
  search,
  setSearch,
}) => (
  <EditableWrapper editable={editable}>
    <Dropdown>
      <DropdownToggle className="btn btn-light border arrow-none">
        {value}
        <IconifyIcon icon="bx:chevron-down" className="ms-2" />
      </DropdownToggle>

      <DropdownMenu style={{ width: 280, padding: 0 }}>
        <div style={{ padding: 8 }}>
          <input
            className="form-control"
            placeholder="Search country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onClick={e => e.stopPropagation()}
          />
        </div>

        <div
          style={{
            maxHeight: 220,
            overflowY: 'auto',
            borderTop: '1px solid #eee',
          }}
        >
          {countryCodes
            .filter(c =>
              c.country.toLowerCase().includes(search.toLowerCase())
            )
            .map(c => (
              <DropdownItem
                key={c.isoCode2}
                onClick={() => {
                  onChange('+' + c.countryCodes[0])
                  setSearch('')
                }}
              >
                {c.country} (+{c.countryCodes[0]})
              </DropdownItem>
            ))}
        </div>
      </DropdownMenu>
    </Dropdown>
  </EditableWrapper>
)

/* ===================== COMPONENT ===================== */

const UpdateEmployee = () => {
  const { empId } = useParams()

  const [step, setStep] = useState(0)
  const [countryCode, setCountryCode] = useState('+91')
  const [gender, setGender] = useState('')
  const [role, setRole] = useState('')
  const [dob, setDob] = useState(null)
  const [dateOfJoining, setDateOfJoining] = useState(null)
  const [faceEmbedding, setFaceEmbedding] = useState(null)
  const [isEditing, setIsEditing] = useState({})
  const [search, setSearch] = useState('')

  const { control, setValue, getValues, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  })

  useEffect(() => {
    const emp = employeeDetailsObject[empId]
    if (!emp) return

    Object.entries(emp).forEach(([k, v]) => setValue(k, v))
    setCountryCode(emp.countryCode)
    setDob(emp.dob)
    setDateOfJoining(emp.doj)
    setGender(emp.gender)
    setRole(emp.role)
  }, [empId])

  const toggleEdit = field =>
    setIsEditing(p => ({ ...p, [field]: !p[field] }))

  const goNext = handleSubmit(() => {
    if (!dob || !gender || !role || !dateOfJoining) {
      toast.error('Please fill all required fields')
      return
    }
    setStep(1)
  })

  const submitForm = () => {
    const data = getValues()
    data.phone = countryCode + data.phone
    data.gender = gender
    data.role = role
    data.dob = dob
    data.doj = dateOfJoining
    data.faceEmbedding = faceEmbedding?.hash
    data.faceSource = faceEmbedding?.source
    console.log('SUBMITTED DATA:', data)
  }

  const renderInput = (name, label, props = {}) => (
    <div className="d-flex align-items-end gap-2 mb-3">
      <div className="flex-grow-1">
        <TextFormInput
          name={name}
          label={label}
          control={control}
          disabled={!isEditing[name]}
          {...props}
        />
      </div>
      <Button variant="outline-primary" onClick={() => toggleEdit(name)}>
        {isEditing[name] ? 'Lock' : 'Edit'}
      </Button>
    </div>
  )

  return (
    <>
      <ToastContainer />

      {step === 0 && (
        <ComponentContainerCard title="Update Employee Details">
          {renderInput('userId', 'User Id*')}
          {renderInput('user', 'User Name*')}
          <label className="form-label">Gender*</label>
          <div className="d-flex gap-2 mb-3">
            <EditableWrapper editable={isEditing.gender}>
              <Dropdown>
                <DropdownToggle className="btn btn-light border arrow-none">
                  {gender || 'Select Gender'}
                  <IconifyIcon icon="bx:chevron-down" className="ms-2" />
                </DropdownToggle>
                <DropdownMenu>
                  {['Male', 'Female', 'Other'].map(g => (
                    <DropdownItem key={g} onClick={() => setGender(g)}>
                      {g}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </EditableWrapper>
            <Button variant="outline-primary" onClick={() => toggleEdit('gender')}>
              {isEditing.gender ? 'Lock' : 'Edit'}
            </Button>
          </div>
          
          <label className="form-label">Date of Birth*</label>
          <div className="d-flex gap-2 mb-3">
            <EditableWrapper editable={isEditing.dob}>
              <CustomFlatpickr
                className="form-control"
                value={dob}
                options={{ enableTime: false }}
                onChange={d => setDob(d?.[0] || null)}
              />
            </EditableWrapper>
            <Button variant="outline-primary" onClick={() => toggleEdit('dob')}>
              {isEditing.dob ? 'Lock' : 'Edit'}
            </Button>
          </div>

          {renderInput('email', 'Email*')}

          <label className="form-label">Contact Number*</label>
          <div className="d-flex align-items-start gap-2 mb-3">
            <CountryCodeDropdown
              value={countryCode}
              onChange={setCountryCode}
              editable={isEditing.phone}
              search={search}
              setSearch={setSearch}
            />

            <div className="flex-grow-1">
              <TextFormInput
                name="phone"
                control={control}
                disabled={!isEditing.phone}
              />
            </div>

            <Button
              variant="outline-primary"
              onClick={() => toggleEdit('phone')}
            >
              {isEditing.phone ? 'Lock' : 'Edit'}
            </Button>
          </div>

          {renderInput('address', 'Address', { rows: 4 })}


          <label className="form-label">Date of Joining*</label>
          <div className="d-flex gap-2 mb-3">
            <EditableWrapper editable={isEditing.doj}>
              <CustomFlatpickr
                className="form-control"
                value={dateOfJoining}
                options={{ enableTime: false }}
                onChange={d => setDateOfJoining(d?.[0] || null)}
              />
            </EditableWrapper>
            <Button variant='outline-primary' onClick={() => toggleEdit('doj')}>
              {isEditing.doj ? 'Lock' : 'Edit'}
            </Button>
          </div>

          <label className="form-label">Role*</label>
          <div className="d-flex gap-2 mb-3">
            <EditableWrapper editable={isEditing.role}>
              <Dropdown>
                <DropdownToggle className="btn btn-light border arrow-none">
                  {role || 'Select Role'}
                  <IconifyIcon icon="bx:chevron-down" className="ms-2" />
                </DropdownToggle>
                <DropdownMenu>
                  {['Admin', 'Developer', 'Tester'].map(r => (
                    <DropdownItem key={r} onClick={() => setRole(r)}>
                      {r}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </EditableWrapper>
            <Button variant='outline-primary' onClick={() => toggleEdit('role')}>
              {isEditing.role ? 'Lock' : 'Edit'}
            </Button>
          </div>

          {renderInput('aadhaar', 'Aadhaar Id*')}
          {renderInput('passport', 'Passport Id')}
          {renderInput('pan', 'PAN Id')}
          {renderInput('bank', 'Bank Id')}

          <div className="d-flex justify-content-end">
            <Button className='rounded-pill' variant="primary" onClick={goNext}>
              Next
            </Button>
          </div>
        </ComponentContainerCard>
      )}

      {step === 1 && (
        <>
          <FaceEmbeddings onCapture={setFaceEmbedding} />
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

export default UpdateEmployee
