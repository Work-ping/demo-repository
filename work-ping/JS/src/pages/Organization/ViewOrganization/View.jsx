import { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const TODO = () => {

  const navigate = useNavigate()
  const itemsPerPage = 10

  const [tasks, setTasks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchTasks = async (page) => {
    setLoading(true)
    try {
      const response = await fetch(
        `http://localhost:5000/api/companies?page=${page}&limit=${itemsPerPage}`
      )
      const result = await response.json()

      setTasks(result.data)
      setTotalPages(result.totalPages)
      setTotalRecords(result.totalRecords)
    } catch (error) {
      console.error('Error fetching companies:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks(currentPage)
  }, [currentPage])

  return (
    <>
      <Row>
        <Col>
          <Card>

            <div className="table-responsive table-centered">
              <table className="table text-nowrap mb-0">
                <thead className="bg-light bg-opacity-50">
                  <tr>
                    <th>Name</th>
                    <th>Geo Fencing</th>
                    <th>CL Days</th>
                    <th>Type</th>
                    <th>IP Address</th>
                    <th>Founded At</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    tasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.geoFencing}</td>
                        <td>{task.clDays}</td>
                        <td>{task.type}</td>
                        <td>{task.ipAddress}</td>
                        <td>{new Date(task.foundedAt).toDateString()}</td>
                        <td>
                          <Button
                            variant="soft-secondary"
                            size="sm"
                            className="me-2"
                            onClick={() =>
                              navigate(`/organization/update-organization/${task.id}`)
                            }
                          >
                            <IconifyIcon icon="bx:edit" />
                          </Button>

                          <Button variant="soft-danger" size="sm">
                            <IconifyIcon icon="bx:trash" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

           
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default TODO
