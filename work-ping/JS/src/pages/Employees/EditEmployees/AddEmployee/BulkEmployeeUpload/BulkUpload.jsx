import {
  Col,
  Row,
  Button,
  Card,
  CardBody,
  ProgressBar
} from 'react-bootstrap'
import { useState, useRef } from 'react'
import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageMetaData from '@/components/PageTitle'
import { useNavigate } from 'react-router-dom'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import axiosClient from '@/helpers/httpClient'

const BulkUpload = () => {
  const navigate = useNavigate()

  const [file, setFile] = useState(null) // ✅ single file
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
    const selectedFile = e.target.files[0] // ✅ only first file
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      setLoading(true)
      setUploadProgress(0)
      console.log('Uploading file:', file)
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

      setFile(null)
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
                <span>Add Employees Details By Excel-SpreadSheet</span>

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
            description="Upload an Excel or CSV file containing employee details."
          >
            {/* Hidden File Input */}
            <input
              type="file"
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
                Click to Select File
              </h5>
              <p className="text-muted mb-1">
                Supported formats: .csv, .xlsx
              </p>
            </div>

            {/* File Preview Card */}
            {file && (
              <Card className="shadow-sm mt-3">
                <CardBody className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">{file.name}</h6>
                    <small className="text-muted">
                      {formatSize(file.size)}
                    </small>
                  </div>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleRemoveFile}
                  >
                    Remove
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* Upload Button */}
            <div className="text-end mt-4">
              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={!file || loading}
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

            {/* File Format Instructions */}
            <div className="mt-4 p-3 border rounded bg-light">
              <h6 className="mb-2">📌 File Format Instructions</h6>
              <p className="text-muted mb-2">
                Your Excel / CSV file must contain the following columns in the same order.
              </p>
            </div>
          </ComponentContainerCard>
        </Col>

        {/* Data Table After Upload */}
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
