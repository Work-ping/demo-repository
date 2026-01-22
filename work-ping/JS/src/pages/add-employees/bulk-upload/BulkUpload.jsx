import { Col, Row, Button } from 'react-bootstrap'
import { useState } from 'react'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import DropzoneFormInput from '@/components/form/DropzoneFormInput'
import PageBreadcrumb from '@/components/layout/PageBreadcrumb'
import PageMetaData from '@/components/PageTitle'

const BulkUpload = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  
  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select at least one file')
      return
    }

    const formData = new FormData()
    files.forEach((f) => formData.append('files', f))

    try {
      setLoading(true)
      const res = await fetch('http://localhost:5000/api/employees/bulk-upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      console.log(data)
      alert('Files uploaded successfully')
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageBreadcrumb subName="Employees" title="Employees-SpreadSheet" />
      <PageMetaData title="Employees-SpreadSheet" />

      <Row>
        <Col xl={12}>
          <ComponentContainerCard
            id="default"
            title="Employees-SpreadSheet"
            description="Upload Employees-SpreadSheet data using CSV or Excel files."
          >
            <DropzoneFormInput
              iconProps={{
                icon: 'bx:cloud-upload',
                height: 36,
                width: 36,
              }}
              text="Drop Employee-SpreadSheet CSV/Excel file here or click to upload."
              helpText={
                <span className="text-muted fs-13">
                  Supported formats: <strong>.csv, .xlsx</strong>
                </span>
              }
              showPreview
              onFileUpload={(list) => {
                const arr = Array.isArray(list) ? list : [list]
                setFiles(arr)
              }}
            />

            <div className="text-end mt-3">
              <Button
                type="button"
                onClick={handleUpload}
                disabled={files.length === 0 || loading}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            <div className="mt-3 p-3 border rounded bg-light">
              <h6 className="mb-2">📌 File Format Instructions</h6>
              <p className="text-muted mb-2">
                Your Excel / CSV file must contain the following columns in the same order:
              </p>

              <div className="table-responsive">
                <table className="table table-sm table-bordered mb-0">
                  <thead className="table-secondary">
                    <tr>
                      <th>#</th>
                      <th>Column Label</th>
                      <th>Example Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>1</td><td>UserId</td><td>1</td></tr>
                    <tr><td>2</td><td>UserNmae</td><td>DragoN28</td></tr>
                    <tr><td>3</td><td>Email</td><td>example@gmail.com</td></tr>
                    <tr><td>4</td><td>Phone</td><td>07013874687</td></tr>
                    <tr><td>5</td><td>Address</td><td>Jetla Pedda Kapu Street</td></tr>
                    <tr><td>6</td><td>Aadhaar</td><td>123412341234</td></tr>
                    <tr><td>7</td><td>Passport</td><td>P1234567</td></tr>
                    <tr><td>8</td><td>Pan</td><td>ABCDE1234F</td></tr>
                    <tr><td>9</td><td>Bank</td><td>1234567890</td></tr>
                    <tr><td>10</td><td>Gender</td><td>Male / Female</td></tr>
                    <tr><td>11</td><td>Role</td><td>Admin / Employee</td></tr>
                    <tr><td>12</td><td>CountryCode</td><td>+91</td></tr>
                    <tr><td>13</td><td>Image</td><td>image_url_or_name</td></tr>
                  </tbody>
                </table>
              </div>

              <small className="text-muted d-block mt-2">
                ⚠️ Make sure column names match exactly. Do not change spelling or order.
              </small>
            </div>
          </ComponentContainerCard>
        </Col>
      </Row>
    </>
  )
}

export default BulkUpload
