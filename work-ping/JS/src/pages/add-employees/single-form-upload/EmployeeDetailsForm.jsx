import ComponentContainerCard from '@/components/ComponentContainerCard';
import CustomFlatpickr from '@/components/CustomFlatpickr';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import { Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormCheck, Row } from 'react-bootstrap';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { useForm } from 'react-hook-form';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
const BasicExamples = () => {
  const {
    control
  } = useForm();
  return <ComponentContainerCard id="basic" title="Add Basic Employee Details" description={<>
          Give textual form controls like <code>&lt;input&gt;</code>s and <code>&lt;textarea&gt;</code>s an upgrade with custom styles, sizing, focus
          states, and more.
        </>}>
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
                    U.S.A <IconifyIcon icon="bx:chevron-down" className="ms-2" />
                </div>
                </DropdownToggle>
                <DropdownMenu>
                <li>
                    <DropdownItem href="#">U.S.A</DropdownItem>
                </li>
                <li>
                    <DropdownItem href="#">India</DropdownItem>
                </li>
                <li>
                    <DropdownItem href="#">Iraq</DropdownItem>
                </li>
                <li>
                    <DropdownItem href="#">South Africa</DropdownItem>
                </li>
                <li>
                    <DropdownItem href="#">France</DropdownItem>
                </li>
                </DropdownMenu>
                <input type="number" className="form-control" id="contactnumber" placeholder="+0(222)000-0000" />
            </Dropdown>
        </div>
        
        <div className="mb-3">
          <label htmlFor="example-palaceholder" className="form-label">
            DOB
          </label>
          <CustomFlatpickr className="form-control" placeholder="Basic datepicker" options={{
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
                    Select Gender<IconifyIcon icon="bx:chevron-down" className="ms-2" />
                    </div>
                </DropdownToggle>
                    <DropdownMenu>
                    <li>
                        <DropdownItem href="#">Male</DropdownItem>
                    </li>
                    <li>
                        <DropdownItem href="#">Female</DropdownItem>
                    </li>
                    <li>
                        <DropdownItem href="#">Other</DropdownItem>
                    </li>
                </DropdownMenu> 
            </Dropdown>
        </div>
        <div className="mb-3">
          <label htmlFor="example-palaceholder" className="form-label">
            Date Of Joining
          </label>
          <CustomFlatpickr className="form-control" placeholder="Basic datepicker" options={{
                enableTime: false
              }} />
          
        </div>
      </div>
    </ComponentContainerCard>;
};
export default BasicExamples;
