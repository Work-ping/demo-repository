import {
  Col,
  Row,
  Button,
  Card,
  CardBody,
  ProgressBar
} from 'react-bootstrap'
import { useState, useRef, } from 'react'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageMetaData from '@/components/PageTitle'
import { useNavigate } from 'react-router-dom'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import axiosClient from '@/helpers/httpClient'
const BulkUpload = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [allTasks, setAllTasks] = useState([])
  const [showTable, setShowTable] = useState(false)

  const fileInputRef = useRef(null)

  const formatSize = (size) => {
    if (size < 1024) return size + ' B'
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB'
    return (size / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...selected])
  }

  const handleRemoveFile = (index) => {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)

    if (updated.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select at least one file')
      return
    }

    const formData = new FormData()
    files.forEach((file) => formData.append('file', file))

    try {
      setLoading(true)
      setUploadProgress(0)
      console.log('Uploading files:', files)
      const res = await axiosClient.post(
        '/api/admin/add-employees/by-excel',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setUploadProgress(percent)
          },
        }
      )

      setAllTasks(res.data.data || [])
      setShowTable(true)

      setFiles([])
      if (fileInputRef.current) fileInputRef.current.value = ''

      alert('Upload Successful')
    } catch (err) {
      console.error(err)
      alert('Upload Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      
      <PageMetaData title="Employees-SpreadSheet" />

      <Row>
        <Col xl={12}>
          <ComponentContainerCard
           
            title={
            <div className="d-flex justify-content-between align-items-center">
              <span>Add  Employees Details By Excel-SpreadSheet</span>

              <Button
                variant="outline-primary"
                size="sm"
                onClick={() =>
                  navigate('/employees/add-employees/single-employee-form')
                }
              >
                <IconifyIcon icon="bx:upload" className="me-1" />
                By-Form
              </Button>
            </div>
          }
            description="Upload an Excel or CSV file containing employee details. Ensure the file follows the specified format for successful processing."
          >
             
            <input
              type="file"
              multiple
              accept=".csv,.xlsx"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {/* Drop Box */}
            <div
              className="border border-2 border-dashed rounded p-5 text-center bg-light"
              style={{ cursor: 'pointer' }}
              onClick={() => fileInputRef.current.click()}
            >
              <h5 className="fw-semibold mb-2">
                Drag & Drop Files Here
              </h5>
              <p className="text-muted mb-1">
                or click to browse files
              </p>
              <small className="text-muted">
                Supported formats: .csv, .xlsx
              </small>
            </div>

            {/* File Grid */}
            {files.length > 0 && (
              <Row className="g-3 mt-3">
                {files.map((file, index) => (
                  <Col xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card className="shadow-sm h-100">
                      <CardBody className="d-flex flex-column justify-content-between">
                        <div>
                          <h6 className="text-truncate" title={file.name}>
                            {file.name}
                          </h6>
                          <small className="text-muted">
                            {formatSize(file.size)}
                          </small>
                        </div>

                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="mt-3"
                          onClick={() => handleRemoveFile(index)}
                        >
                          Remove
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {/* Upload Button */}
            <div className="text-end mt-4">
              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={files.length === 0 || loading}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>

            {/* Progress Bar */}
            {loading && (
              <div className="mt-3">
                <ProgressBar
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                  striped
                  animated
                />
              </div>
            )}

            <div className="mt-4 p-3 border rounded bg-light">
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
                    <tr><td>2</td><td>UserName</td><td>DragoN28</td></tr>
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

        {/* 🔥 Optional Data Table After Upload */}
        {showTable && (
          <Col xl={12} className="mt-4">
            <Card>
              <CardBody>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th>UserID</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Aadhaar</th>
                        <th>Passport</th>
                        <th>Pan</th>
                        <th>Bank</th>
                        <th>Gender</th>
                        <th>Role</th>
                        <th>CountryCode</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTasks.map((task, idx) => (
                        <tr key={idx}>
                          <td>{task.userId}</td>
                          <td>{task.userName}</td>
                          <td>{task.email}</td>
                          <td>{task.phone}</td>
                          <td>{task.address}</td>
                          <td>{task.aadhaar}</td>
                          <td>{task.passport}</td>
                          <td>{task.pan}</td>
                          <td>{task.bank}</td>
                          <td>{task.gender}</td>
                          <td>{task.role}</td>
                          <td>{task.countryCode}</td>
                          <td>{task.image}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    </>
  )
}

export default BulkUpload
