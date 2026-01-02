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

const VerifiedIds = () => {
  const { control } = useForm()
  return (
    <ComponentContainerCard id="basic" title="Add Basic Employee Details" description={<></>}>
        <TextFormInput name="Aadhaar" label="
        Aadhaar Id" control={control} placeholder="Enter Aadhaar Id" containerClassName="mb-3" />
        <TextFormInput name="Passport" type="text" label="Passport Id" control={control} placeholder="Enter Passport Id" containerClassName="mb-3" />
        <TextFormInput name="PAN" type="text" label="PAN Id" control={control} placeholder="Enter PAN Id" containerClassName="mb-3" />
        <TextFormInput name="Bank" type="text" label="Bank Id" control={control} placeholder="Enter Bank Id" containerClassName="mb-3" />
    </ComponentContainerCard>
  )
}
export default VerifiedIds;
