import { memo, Fragment } from 'react'

// router-dom
import { Link } from 'react-router-dom'

// react-bootstrap
import { Row, Col, Table, ProgressBar } from 'react-bootstrap'


// component
import Card from '../../../components/bootstrap/card'

// image
import table1 from '/src/assets/images/shapes/01.png'
import table2 from '/src/assets/images/shapes/02.png'
import table3 from '/src/assets/images/shapes/03.png'
import table4 from '/src/assets/images/shapes/04.png'
import table5 from '/src/assets/images/shapes/06.png'

const FixedTable = memo(() => {
  const table = [
    {
      image: table1,
      name: 'Soft UI XD Version',
      member: [
        {
          text: 'SP'
        },
        {
          text: 'PP'
        },
        {
          text: 'MM'
        }
      ],
      value: '$14000',
      color: 'info',
      class: 'text-info',
      status: 'pending',
      percent: 60,
      now: 60
    },
    {
      image: table2,
      name: 'Add Progress Track',
      value: '$3000',
      member: [
        {
          text: 'SP'
        },
        {
          text: 'PP'
        }
      ],
      color: 'danger',
      class: 'text-danger',
      status: 'pending',
      percent: 10,
      now: 10
    },
    {
      image: table3,
      name: 'Fix Platform Errors',
      value: 'Not set',
      member: [
        {
          text: 'SP'
        },
        {
          text: 'PP'
        }
      ],
      color: 'success',
      class: 'text-success',
      status: 'Completed',
      percent: 100,
      now: 100
    },
    {
      image: table4,
      name: 'Launch Our Mobile App',
      value: '$20500',
      member: [
        {
          text: 'SP'
        },
        {
          text: 'PP'
        },
        {
          text: 'MM'
        },
        {
          text: 'DP'
        }
      ],
      color: 'success',
      class: 'text-success',
      status: 'Completed',
      percent: 100,
      now: 100
    },
    {
      image: table5,
      name: 'Add the New Pricing Page',
      member: [
        {
          text: 'SP'
        }
      ],
      value: '$500',
      color: 'primary',
      class: 'text-primary',
      status: 'On Scheduling',
      percent: 25,
      now: 25
    },
    {
      image: table1,
      name: 'Redesign New Online Shop',
      member: [
        {
          text: 'SP'
        },
        {
          text: 'PP'
        }
      ],
      value: '$2000',
      color: 'warning',
      class: 'text-warning',
      status: 'Completed',
      percent: 40,
      now: 40
    },
  ]
  return (
    <Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Header.Title>
                <h4 className="card-title">Basic Table</h4>
              </Card.Header.Title>
            </Card.Header>
            <Card.Body className="table-fixed p-0">
              <div className="mt-4">
                <Table responsive striped className="mb-0 rounded border" role="grid">
                  <thead>
                    <tr>
                      <th>Companies</th>
                      <th>Members</th>
                      <th>Budget</th>
                      <th>Status</th>
                      <th>Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      table.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img className="rounded img-fluid avatar-40 me-3 bg-soft-primary"
                                  src={item.image} alt="profile" loading="lazy" />
                                <h6>{item.name}</h6>
                              </div>
                            </td>
                            <td>
                              <div className="iq-media-group iq-media-group-1">
                                {
                                  item.member.map((item1, index1) => {
                                    return (
                                      <Link key={index1} to="#" className="iq-media-1">
                                        <div className="icon iq-icon-box-3 rounded-pill">{item1.text}</div>
                                      </Link>
                                    )
                                  })
                                }
                              </div>
                            </td>
                            <td>{item.value}</td>
                            <td><div className={`${item.class}`}>{item.status}</div></td>
                            <td>
                              <div className="d-flex align-items-center mb-2">
                                <h6>{item.percent}%</h6>
                              </div>
                              <ProgressBar className="mb-3" now={item.now} variant={item.color} style={{ height: "6px" }} />
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
})

export default FixedTable