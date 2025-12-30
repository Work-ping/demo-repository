import ComponentContainerCard from '@/components/ComponentContainerCard';
import CustomFlatpickr from '@/components/CustomFlatpickr';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import { Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormCheck, Row } from 'react-bootstrap';
import {useState} from 'react'
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { useForm } from 'react-hook-form';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import countryCodes from 'country-calling-code';

const EmployeeDetailsForm = () => {
    const [countryCode,setCountryCode]=useState('+91');
    const [Gender,setGender]=useState('Select Gender');
  const {
    control
  } = useForm();
  return <ComponentContainerCard id="basic" title="Add Basic Employee Details" description={<></>}>
      <div>
        <TextFormInput name="user" label="User" control={control} placeholder="Enter User Name" containerClassName="mb-3" />
        <TextFormInput name="email" type="email" label="Email" control={control} placeholder="Email" containerClassName="mb-3" />
        <div className="mb-3">
            <label className="form-label" htmlFor="contactnumber">
                Contact Number
            </label>
            <Dropdown className="form-group input-group">
                <DropdownToggle className="btn btn-light rounded-end-0 border arrow-none" type="button">
                <div className="icons-center">
                    {countryCode} <IconifyIcon icon="bx:chevron-down" className="ms-2" />
                </div>
                </DropdownToggle>
                <DropdownMenu style={{maxHeight:'300px',overflowY:'auto'}}>
                {countryCodes
                    .sort((a,b)=>a.country.localeCompare(b.country))
                    .map(c=>(
                    <DropdownItem
                        key={c.isoCode2}
                        onClick={()=>setCountryCode('+'+c.countryCodes[0])}
                    >
                        {c.country} (+{c.countryCodes[0]})
                    </DropdownItem>
                    ))}
                </DropdownMenu>
                <input type="number" className="form-control" id="contactnumber" placeholder="" />
            </Dropdown>
        </div>
        
        <div className="mb-3">
          <label htmlFor="example-palaceholder" className="form-label">
            DOB
          </label>
          <CustomFlatpickr className="form-control" placeholder="Date of Birth" options={{
                enableTime: false
              }} />
          
        </div>
        <TextAreaFormInput name="textarea" label="Address" control={control} rows={5} />
        <div className="mb-3">
            <label htmlFor="example-palaceholder" className="form-label">
                Gender
            </label>
            <Dropdown className="form-group input-group">
                <DropdownToggle className="btn btn-light rounded-end-0 border arrow-none" type="button">
                    <div className="icons-center">
                    {Gender}<IconifyIcon icon="bx:chevron-down" className="ms-2" />
                    </div>
                </DropdownToggle>
                    <DropdownMenu>
                    <li>
                        <DropdownItem href="#" onClick={()=>setGender('Male')}>Male</DropdownItem>
                    </li>
                    <li>
                        <DropdownItem href="#" onClick={()=>setGender('Female')}>Female</DropdownItem>
                    </li>
                    <li>
                        <DropdownItem href="#" onClick={()=>setGender('Other')}>Other</DropdownItem>
                    </li>
                </DropdownMenu> 
            </Dropdown>
        </div>
        <div className="mb-3">
          <label htmlFor="example-palaceholder" className="form-label">
            Date Of Joining
          </label>
          <CustomFlatpickr className="form-control" placeholder="Date of Joining" options={{
                enableTime: false
              }} />
          
        </div>
        <div className="mb-3">
            <label htmlFor="example-palaceholder" className="form-label">
                Role
            </label>
            <Dropdown className="form-group input-group">
                <DropdownToggle className="btn btn-light rounded-end-0 border arrow-none" type="button">
                    <div className="icons-center">
                    Select Role<IconifyIcon icon="bx:chevron-down" className="ms-2" />
                    </div>
                </DropdownToggle>
                    <DropdownMenu>
                    <li>
                        <DropdownItem href="#">Admin</DropdownItem>
                    </li>
                    <li>
                        <DropdownItem href="#">Developer</DropdownItem>
                    </li>
                    <li>
                        <DropdownItem href="#">Tester</DropdownItem>
                    </li>
                </DropdownMenu> 
            </Dropdown>
        </div>
      </div>
    </ComponentContainerCard>;
};
export default EmployeeDetailsForm;
