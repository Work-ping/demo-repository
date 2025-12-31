import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import DropzoneFormInput from '@/components/form/DropzoneFormInput';
import PageBreadcrumb from '@/components/layout/PageBreadcrumb';
import PageMetaData from '@/components/PageTitle';

const BulkUpload = () => {
  return (
    <>
      <PageBreadcrumb subName="Employees" title="Bulk Uploads" />
      <PageMetaData title="Bulk Uploads" />

      <Row>
        <Col xl={12}>
          <Card>
            <CardBody>
              <CardTitle as="h5" className="mb-1 anchor" id="overview">
                Overview
                <a
                  className="btn btn-sm btn-outline-success rounded-2 float-end"
                  href="https://www.npmjs.com/package/react-dropzone"
                  target="_blank"
                  rel="noreferrer"
                >
                  Official Website
                </a>
              </CardTitle>

              <p className="text-muted mb-3">
                Dropzone is a lightweight and powerful file upload library with drag and drop support.
              </p>
            </CardBody>
          </Card>

          <ComponentContainerCard
            id="default"
            title="Bulk Employee Upload"
            description="Upload employee data in bulk using CSV or Excel files."
          >
            <DropzoneFormInput
              iconProps={{
                icon: 'bx:cloud-upload',
                height: 36,
                width: 36
              }}
              text="Drop employee CSV/Excel file here or click to upload."
              helpText={
                <span className="text-muted fs-13">
                  Supported formats: <strong>.csv, .xlsx</strong>
                  <br />
                  (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                </span>
              }
              showPreview
            />
          </ComponentContainerCard>
        </Col>
      </Row>
    </>
  );
};

export default BulkUpload;
