import { useEffect, memo, Fragment } from 'react'
import { Row, Col, Card, Dropdown, Button, Form, InputGroup } from 'react-bootstrap'

//apexcharts
import Chart from "react-apexcharts";

// Redux Selector / Action
import { useSelector } from 'react-redux';
// Import selectors & action from setting store
import * as SettingSelector from '../../store/setting/selectors'


//router-dom
import { Link } from "react-router-dom"


//component
import CustomToggle from '../../components/dropdowns'
import ChoicesJs from '../../components/choices'

//select

const options3 = [
  { value: 'Enter Amount in BTC', label: 'Enter Amount in BTC' },
  { value: '100', label: '100' },
  { value: '200', label: '200' },
  { value: '500', label: '500' },
]
const options4 = [
  { value: 'Enter Amount in USD', label: 'Enter Amount in USD' },
  { value: '34,85.10', label: '34,85.10' },
  { value: '34,85.11', label: '34,85.11' },
  { value: '34,85.12', label: '34,85.12' },
]


const PreInsercao = memo((props) => {
  useSelector(SettingSelector.theme_color)

  const getVariableColor = () => {
    let prefix = getComputedStyle(document.body).getPropertyValue('--prefix') || 'bs-';
    if (prefix) {
      prefix = prefix.trim()
    }
    const color1 = getComputedStyle(document.body).getPropertyValue(`--${prefix}primary`);
    const color2 = getComputedStyle(document.body).getPropertyValue(`--${prefix}secondary`);
    const color3 = getComputedStyle(document.body).getPropertyValue(`--${prefix}primary-tint-20`);
    const color4 = getComputedStyle(document.body).getPropertyValue(`--${prefix}warning`);
    const color5 = getComputedStyle(document.body).getPropertyValue(`--${prefix}tertiray`);
    return {
      primary: color1.trim(),
      secondary: color2.trim(),
      primary_light: color3.trim(),
      warning: color4.trim(),
      tertiray: color5.trim(),
    };
  }
  const variableColors = getVariableColor();
  const colors = [variableColors.primary, variableColors.secondary, variableColors.tertiray];
  useEffect(() => {
    return () => colors
  })

  const chart1 = {
    options: {
      chart: {
        sparkline: {
          enabled: true
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: 2
      },
      legend: {
        show: false
      },
      colors: ['#1AA053'],
      grid: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },

      },
      yaxis: {
        labels: {
          show: false,
        },
      }
    },
    series: [{
      name: "Bitcoin",
      data: [10, 21, 15, 31, 29, 42, 39, 61, 41, 51, 32, 51, 51, 55, 60]
    }],
  }

  const chart2 = {
    options: {
      chart: {
        sparkline: {
          enabled: true
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: 2
      },
      legend: {
        show: false
      },
      colors: ['#1AA053'],
      grid: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },

      },
      yaxis: {
        labels: {
          show: false,
        },
      }
    },
    series: [{
      name: "Bitcoin",
      data: [10, 21, 15, 31, 29, 42, 39, 61, 41, 51, 32, 51, 51, 55, 60]
    }],
  }
  const chart3 = {
    options: {
      chart: {
        sparkline: {
          enabled: true
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: 2
      },
      legend: {
        show: false
      },
      colors: ['#C03221'],
      grid: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },

      },
      yaxis: {
        labels: {
          show: false,
        },
      }
    },
    series: [{
      name: "Bitcoin",
      data: [10, 21, 15, 31, 29, 42, 39, 61, 41, 51, 32, 51, 51, 55, 60]
    }],
  }
  const chart4 = {
    options: {
      chart: {
        sparkline: {
          enabled: true
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: 2
      },
      legend: {
        show: false
      },
      colors: ['#7016d0'],
      grid: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },

      },
      yaxis: {
        labels: {
          show: false,
        },
      }
    },
    series: [{
      name: "Bitcoin",
      data: [10, 21, 15, 31, 29, 42, 39, 61, 41, 51, 32, 51, 51, 55, 60]
    }],
  }
  const chart5 = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#7016d0',
            downward: '#08B1BA'
          }
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          minHeight: 20,
          maxHeight: 20
        }
      },
      grid: {
        show: true,
        strokeDashArray: 7,
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    },
    series: [{
      data: [{
        x: new Date(1538778600000),
        y: [6629.81, 6650.5, 6623.04, 6633.33]
      },
      {
        x: new Date(1538780400000),
        y: [6632.01, 6643.59, 6620, 6630.11]
      },
      {
        x: new Date(1538782200000),
        y: [6630.71, 6648.95, 6623.34, 6635.65]
      },
      {
        x: new Date(1538784000000),
        y: [6635.65, 6651, 6629.67, 6638.24]
      },
      {
        x: new Date(1538785800000),
        y: [6638.24, 6640, 6620, 6624.47]
      },
      {
        x: new Date(1538787600000),
        y: [6624.53, 6636.03, 6621.68, 6624.31]
      },
      {
        x: new Date(1538789400000),
        y: [6624.61, 6632.2, 6617, 6626.02]
      },
      {
        x: new Date(1538791200000),
        y: [6627, 6627.62, 6584.22, 6603.02]
      },
      {
        x: new Date(1538793000000),
        y: [6605, 6608.03, 6598.95, 6604.01]
      },
      {
        x: new Date(1538794800000),
        y: [6604.5, 6614.4, 6602.26, 6608.02]
      },
      {
        x: new Date(1538796600000),
        y: [6608.02, 6610.68, 6601.99, 6608.91]
      },
      {
        x: new Date(1538798400000),
        y: [6608.91, 6618.99, 6608.01, 6612]
      },
      {
        x: new Date(1538800200000),
        y: [6612, 6615.13, 6605.09, 6612]
      },
      {
        x: new Date(1538802000000),
        y: [6612, 6624.12, 6608.43, 6622.95]
      },
      {
        x: new Date(1538803800000),
        y: [6623.91, 6623.91, 6615, 6615.67]
      },
      {
        x: new Date(1538805600000),
        y: [6618.69, 6618.74, 6610, 6610.4]
      },
      {
        x: new Date(1538807400000),
        y: [6611, 6622.78, 6610.4, 6614.9]
      },
      {
        x: new Date(1538809200000),
        y: [6614.9, 6626.2, 6613.33, 6623.45]
      },
      {
        x: new Date(1538811000000),
        y: [6623.48, 6627, 6618.38, 6620.35]
      },
      {
        x: new Date(1538812800000),
        y: [6619.43, 6620.35, 6610.05, 6615.53]
      },
      {
        x: new Date(1538814600000),
        y: [6615.53, 6617.93, 6610, 6615.19]
      },
      {
        x: new Date(1538816400000),
        y: [6615.19, 6621.6, 6608.2, 6620]
      },
      {
        x: new Date(1538818200000),
        y: [6619.54, 6625.17, 6614.15, 6620]
      },
      {
        x: new Date(1538820000000),
        y: [6620.33, 6634.15, 6617.24, 6624.61]
      },
      {
        x: new Date(1538821800000),
        y: [6625.95, 6626, 6611.66, 6617.58]
      },
      {
        x: new Date(1538823600000),
        y: [6619, 6625.97, 6595.27, 6598.86]
      },
      {
        x: new Date(1538825400000),
        y: [6598.86, 6598.88, 6570, 6587.16]
      },
      {
        x: new Date(1538827200000),
        y: [6588.86, 6600, 6580, 6593.4]
      },
      {
        x: new Date(1538829000000),
        y: [6593.99, 6598.89, 6585, 6587.81]
      },
      {
        x: new Date(1538830800000),
        y: [6587.81, 6592.73, 6567.14, 6578]
      },
      {
        x: new Date(1538832600000),
        y: [6578.35, 6581.72, 6567.39, 6579]
      },
      {
        x: new Date(1538834400000),
        y: [6579.38, 6580.92, 6566.77, 6575.96]
      },
      {
        x: new Date(1538836200000),
        y: [6575.96, 6589, 6571.77, 6588.92]
      },
      {
        x: new Date(1538838000000),
        y: [6588.92, 6594, 6577.55, 6589.22]
      },
      {
        x: new Date(1538839800000),
        y: [6589.3, 6598.89, 6589.1, 6596.08]
      },
      {
        x: new Date(1538841600000),
        y: [6597.5, 6600, 6588.39, 6596.25]
      },
      {
        x: new Date(1538843400000),
        y: [6598.03, 6600, 6588.73, 6595.97]
      },
      {
        x: new Date(1538845200000),
        y: [6595.97, 6602.01, 6588.17, 6602]
      },
      {
        x: new Date(1538847000000),
        y: [6602, 6607, 6596.51, 6599.95]
      },
      {
        x: new Date(1538848800000),
        y: [6600.63, 6601.21, 6590.39, 6591.02]
      }

      ]
    }],
  }
  const chart6 = {
    options: {
      chart: {
        toolbar: {
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: 2,
      },
      colors: ['#c03221'],
      xaxis: {
        type: 'datetime',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          minHeight: 20,
          maxHeight: 20,
        },
      },
      yaxis: {
        tickAmount: 4,
        floating: false,

        labels: {
          minWidth: 20,
          maxWidth: 20,
          offsetY: -7,
          offsetX: 0,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false
        }
      },
      fill: {
        opacity: 0.5
      },
      tooltip: {
        x: {
          format: "yyyy",
        },
        fixed: {
          enabled: false,
          position: 'topRight'
        }
      },
      grid: {
        show: true,
        strokeDashArray: 7,
        yaxis: {
          lines: {
            offsetX: -30
          }
        },
      }
    },
    series: [{
      data: [{
        x: 1996,
        y: 500
      },
      {
        x: 1997,
        y: 400
      },
      {
        x: 1998,
        y: 429
      },
      {
        x: 1999,
        y: 342
      },
      {
        x: 2000,
        y: 448
      },
      {
        x: 2001,
        y: 234
      },
      {
        x: 2002,
        y: 325
      },
      {
        x: 2003,
        y: 316
      },
      {
        x: 2004,
        y: 218
      },
      {
        x: 2005,
        y: 430
      },
      {
        x: 2006,
        y: 355
      },
      {
        x: 2007,
        y: 466
      },
      {
        x: 2008,
        y: 337
      },
      {
        x: 2009,
        y: 452
      },
      {
        x: 2010,
        y: 377
      }
      ]

    }],
  }
  return (
    <Fragment>

      <Row>
        <Col lg="3" md="6">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  <svg className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_207_7366)">
                      <path d="M23.641 14.9019C22.0377 21.3339 15.521 25.2439 9.09824 23.6405C2.66605 22.0371 -1.24389 15.5208 0.359518 9.09805C1.96283 2.66605 8.47002 -1.24389 14.9022 0.359519C21.325 1.95346 25.2444 8.46983 23.641 14.9019Z" fill="url(#paint0_linear_207_7366)" />
                      <path d="M17.7131 10.5045C17.9475 8.91074 16.7381 8.04824 15.0693 7.47637L15.6131 5.31074L14.3006 4.98262L13.7756 7.09199C13.4287 7.00762 13.0725 6.92324 12.7162 6.84824L13.2412 4.72949L11.9287 4.40137L11.3943 6.55762C11.1037 6.49199 10.8225 6.42637 10.5506 6.36074V6.35137L8.73184 5.90137L8.38496 7.30762C8.38496 7.30762 9.35996 7.53262 9.34121 7.54199C9.87559 7.67324 9.96934 8.02949 9.95059 8.31074L9.33184 10.7764C9.36934 10.7857 9.41621 10.7951 9.47246 10.8232C9.42559 10.8139 9.37871 10.8045 9.33184 10.7857L8.46934 14.2357C8.40371 14.3951 8.23496 14.6389 7.86934 14.5451C7.87871 14.5639 6.91309 14.3107 6.91309 14.3107L6.25684 15.8201L7.97246 16.2514C8.29121 16.3357 8.60059 16.4107 8.90996 16.4951L8.36621 18.6795L9.67871 19.0076L10.2225 16.842C10.5787 16.9357 10.935 17.0295 11.2725 17.1139L10.7381 19.2701L12.0506 19.5982L12.5943 17.4139C14.8443 17.8357 16.5318 17.667 17.235 15.6326C17.8068 14.0014 17.2068 13.0545 16.0256 12.4357C16.8975 12.2389 17.5443 11.667 17.7131 10.5045ZM14.7037 14.7232C14.3006 16.3545 11.5443 15.4732 10.6537 15.2482L11.3756 12.3514C12.2662 12.5764 15.135 13.017 14.7037 14.7232ZM15.1162 10.4764C14.7412 11.967 12.4537 11.2076 11.7131 11.0201L12.3693 8.39512C13.11 8.58262 15.5006 8.92949 15.1162 10.4764Z" fill="white" />
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_207_7366" x1="11.9935" y1="-0.00575999" x2="11.9935" y2="23.9976" gradientUnits="userSpaceOnUse">
                        <stop offset="1" stopColor="#F9AA4B" />
                        <stop offset="1" stopColor="#F7931A" />
                      </linearGradient>
                      <clipPath id="clip0_207_7366">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <h6 className="mb-0">Dados</h6>
                </div>

              </div>
              <div className="d-flex align-items-center">
                  <h3> Dados da escola</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3" md="6">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" fill="#E9ECEF" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.6596 5.3999H7.40015V11.0393H4.80078V12.9191H7.40015V18.5585H11.6596C13.9078 18.5585 14.3923 18.3238 15.3612 17.8543C15.4364 17.8179 15.5145 17.78 15.5966 17.7408C16.7364 17.1956 17.6221 16.428 18.2539 15.438C18.8856 14.448 19.2015 13.2951 19.2015 11.9792C19.2015 10.6633 18.8856 9.5104 18.2539 8.52036C17.6221 7.53033 16.7364 6.76276 15.5966 6.21761C14.4569 5.67247 13.1445 5.3999 11.6596 5.3999ZM10.5657 12.9191V16.0583H11.5035C12.8712 16.0583 13.9621 15.6918 14.7763 14.9587C15.5904 14.2255 15.9974 13.2324 15.9974 11.9792C15.9974 10.726 15.5904 9.73283 14.7763 8.99971C13.9621 8.26658 12.8712 7.90002 11.5035 7.90002H10.5657V11.0393H13.5932V12.9191H10.5657Z" fill="#7016d0" />
                  </svg>
                  <h6 className="mb-0 ms-2">Dash</h6>
                </div>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray" size="sm" id="dropdownMenuButton38">
                    <svg width="22" height="5" viewBox="0 0 22 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.6788 5C20.9595 5 22 3.96222 22 2.68866C22 1.41318 20.9595 0.373465 19.6788 0.373465C18.3981 0.373465 17.3576 1.41318 17.3576 2.68866C17.3576 3.96222 18.3981 5 19.6788 5ZM11.0005 5C12.2812 5 13.3217 3.96222 13.3217 2.68866C13.3217 1.41318 12.2812 0.373465 11.0005 0.373465C9.71976 0.373465 8.67929 1.41318 8.67929 2.68866C8.67929 3.96222 9.71976 5 11.0005 5ZM4.64239 2.68866C4.64239 3.96222 3.60192 5 2.3212 5C1.04047 5 0 3.96222 0 2.68866C0 1.41318 1.04047 0.373465 2.3212 0.373465C3.60192 0.373465 4.64239 1.41318 4.64239 2.68866Z" fill="currentColor"></path>
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item to='#'>Year</Dropdown.Item>
                    <Dropdown.Item to='#'>Month</Dropdown.Item>
                    <Dropdown.Item to='#'>Week</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h3>$34.850,10</h3>
                  <small className="text-success">+ 0.8%</small><small className="ms-2">LTC/USDT</small>
                </div>
                <Chart options={chart2.options} series={chart2.series} type="line" height="80px"></Chart>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3" md="6">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="12" fill="#E9ECEF" />
                    <g clipPath="url(#clip0_223_7456)">
                      <path d="M12.2759 3L12.1553 3.41007V15.3094L12.2759 15.4298L17.7995 12.1649L12.2759 3Z" fill="#0B0B50" />
                      <path d="M12.2755 3L6.75195 12.1649L12.2755 15.4299V9.6543V3Z" fill="#E1E6EF" />
                      <path d="M12.276 16.4757L12.208 16.5586V20.7974L12.276 20.996L17.8028 13.2124L12.276 16.4757Z" fill="#0B0B50" />
                      <path d="M12.2755 20.996V16.4757L6.75195 13.2124L12.2755 20.996Z" fill="#E1E6EF" />
                      <path d="M12.2764 15.4298L17.7998 12.1649L12.2764 9.6543V15.4298Z" fill="currentColor" />
                      <path d="M6.75195 12.1649L12.2754 15.4298V9.6543L6.75195 12.1649Z" fill="#0B0B50" />
                    </g>
                    <defs>
                      <clipPath id="clip0_223_7456">
                        <rect width="11.055" height="18" fill="white" transform="translate(6.75 3)" />
                      </clipPath>
                    </defs>
                  </svg>
                  <h6 className="mb-0 ms-2">Etherum</h6>
                </div>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray" size="sm" id="dropdownMenuButton39">
                    <svg width="22" height="5" viewBox="0 0 22 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.6788 5C20.9595 5 22 3.96222 22 2.68866C22 1.41318 20.9595 0.373465 19.6788 0.373465C18.3981 0.373465 17.3576 1.41318 17.3576 2.68866C17.3576 3.96222 18.3981 5 19.6788 5ZM11.0005 5C12.2812 5 13.3217 3.96222 13.3217 2.68866C13.3217 1.41318 12.2812 0.373465 11.0005 0.373465C9.71976 0.373465 8.67929 1.41318 8.67929 2.68866C8.67929 3.96222 9.71976 5 11.0005 5ZM4.64239 2.68866C4.64239 3.96222 3.60192 5 2.3212 5C1.04047 5 0 3.96222 0 2.68866C0 1.41318 1.04047 0.373465 2.3212 0.373465C3.60192 0.373465 4.64239 1.41318 4.64239 2.68866Z" fill="currentColor"></path>
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item to='#'>Year</Dropdown.Item>
                    <Dropdown.Item to='#'>Month</Dropdown.Item>
                    <Dropdown.Item to='#'>Week</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h3> $34.850,10</h3>
                  <small className="text-danger">- 0.8%</small><small className="ms-2">ETH/USDT</small>
                </div>
                <Chart options={chart3.options} series={chart3.series} type="line" height="80px"></Chart>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="3" md="6">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="currentColor" />
                    <path d="M15.1875 4.5H11.4375L9.09375 12.2273L7.21875 12.6818L6.75 14.5L8.625 14.0455L6.75 19.5H17.0625L18 16.7727H11.4375L12.375 13.5909L15.1875 12.2273L15.6562 10.4091L13.3125 11.3182L15.1875 4.5Z" fill="white" />
                  </svg>
                  <h6 className="mb-0 ms-2">LiteCoin</h6>
                </div>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray" size="sm" id="dropdownMenuButton40">
                    <svg width="22" height="5" viewBox="0 0 22 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.6788 5C20.9595 5 22 3.96222 22 2.68866C22 1.41318 20.9595 0.373465 19.6788 0.373465C18.3981 0.373465 17.3576 1.41318 17.3576 2.68866C17.3576 3.96222 18.3981 5 19.6788 5ZM11.0005 5C12.2812 5 13.3217 3.96222 13.3217 2.68866C13.3217 1.41318 12.2812 0.373465 11.0005 0.373465C9.71976 0.373465 8.67929 1.41318 8.67929 2.68866C8.67929 3.96222 9.71976 5 11.0005 5ZM4.64239 2.68866C4.64239 3.96222 3.60192 5 2.3212 5C1.04047 5 0 3.96222 0 2.68866C0 1.41318 1.04047 0.373465 2.3212 0.373465C3.60192 0.373465 4.64239 1.41318 4.64239 2.68866Z" fill="currentColor"></path>
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item to='#'>Year</Dropdown.Item>
                    <Dropdown.Item to='#'>Month</Dropdown.Item>
                    <Dropdown.Item to='#'>Week</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h3> $34.850,10</h3>
                  <small className="text-danger">- 0.8%</small><small className="ms-2">(LTC/USDT)</small>
                </div>
                <Chart options={chart4.options} series={chart4.series} type="line" height="80px"></Chart>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
     

    </Fragment>
  )
}
)

Crypto.displayName = "PreInsercao"
export default PreInsercao
