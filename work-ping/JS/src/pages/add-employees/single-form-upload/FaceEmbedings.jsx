import { Card, CardBody } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageBreadcrumb from '@/components/layout/PageBreadcrumb';
import PageMetaData from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
const IconMoon = () => {
  return <>
        <IconifyIcon icon="iconamoon:camera-image" className="fs-2" />
        <IconifyIcon icon="iconamoon:file-add-duotone" className="fs-2" />
      
    </>;
};
export default IconMoon;