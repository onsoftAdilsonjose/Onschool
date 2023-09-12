import { useEffect, memo, Fragment } from 'react'
import { Row, Col, Card, Dropdown, Button, Badge, Container } from 'react-bootstrap'

//apexcharts
import Chart from "react-apexcharts";

// Redux Selector / Action
import { useSelector } from 'react-redux';
// Import selectors & action from setting store
import * as SettingSelector from '../../store/setting/selectors'

//Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";


//component
import CustomToggle from '../../components/dropdowns'

//Image
import shap1 from '../../assets/images/shapes/07.png';
import shap2 from '../../assets/images/shapes/08.png';
import shap3 from '../../assets/images/shapes/09.png';
import shap4 from '../../assets/images/shapes/10.png';
import shap5 from '../../assets/images/shapes/11.png';
import shap6 from '../../assets/images/shapes/12.png';
import shap7 from '../../assets/images/shapes/13.png';
import shap8 from '../../assets/images/shapes/14.png';
import shap9 from '../../assets/images/shapes/15.png';
import shap10 from '../../assets/images/shapes/16.png';
import shap11 from '../../assets/images/shapes/17.png';



const Ecommerce = memo((props) => {
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
                stacked: true,
                toolbar: {
                    show: false,
                },
            },
            colors: colors,
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "28%",
                    borderRadius: 5,
                },
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 3,
                colors: ["transparent"],
            },
            grid: {
                show: true,
                strokeDashArray: 7,
            },
            xaxis: {
                categories: ["June", "July", "Aug", "Sep", "Nov", "Dec"],
                labels: {
                    minHeight: 20,
                    maxHeight: 20,
                    style: {
                        colors: "#4E4E4E",
                    },
                },
            },
            yaxis: {
                labels: {
                    minWidth: 20,
                    maxWidth: 20,
                    style: {
                        colors: "#4E4E4E",
                    },
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands";
                    },
                },
            },
            responsive: [
                {
                    breakpoint: 1025,
                    options: {
                        chart: {
                            height: 280,
                        },
                    },
                },
            ],
        },
        series: [
            {
                name: "Successful deals",
                data: [30, 50, 35, 60, 40, 60],
            },
            {
                name: "Failed deals",
                data: [40, 50, 55, 50, 30, 80],
            },
        ],
    }
    const chart2 = {
        options: {
            colors: colors,
            plotOptions: {
                radialBar: {
                    inverseOrder: false,
                    endAngle: 360,
                    hollow: {
                        margin: 5,
                        size: '50%',
                        background: 'transparent',
                        imageWidth: 180,
                        imageHeight: 180,
                        imageClipped: true,
                        position: 'front',
                        dropShadow: {
                            enabled: false,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    track: {
                        show: true,
                        background: '#EEEEEE',
                        strokeWidth: '70%',
                        opacity: 1,
                        margin: 6,
                        dropShadow: {
                            enabled: false,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    dataLabels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '16px',
                            fontWeight: 600,
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '14px',
                            fontWeight: 400,
                            offsetY: 16,
                            formatter: function (val) {
                                return val + '%'
                            }
                        },
                    }
                }
            },
        },
        series: [50, 30, 20],
    }
    return (
        <Fragment>
            <Container>
                <Row>
                    <Col lg="8" md="7">
                        <Row>
                            <Col lg="12">
                                <Card className='card-block card-stretch card-height'>
                                    <Card.Header>
                                        <div className="flex-wrap  d-flex justify-content-between">
                                            <div className="header-title">
                                                <h4>Revenue</h4>
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray dropdown-toggle" size="sm" id="dropdownMenuButton30">
                                                    Sort by: <small>This Month</small>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item to='#'>This Week</Dropdown.Item>
                                                    <Dropdown.Item to='#'>This Month</Dropdown.Item>
                                                    <Dropdown.Item to='#'>This Year</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Card.Header>

                                    <div className="card-body">
                                        <Chart options={chart1.options} series={chart1.series} type="bar" height="270" className="eccomerce-chart-01"></Chart>
                                    </div>
                                </Card>
                            </Col>
                            <Col lg="5">
                                <Card>
                                    <Card.Header>
                                        <div className="flex-wrap d-flex align-items-center justify-content-between">
                                            <div className="header-title">
                                                <h4 className="card-title">Customer Gender</h4>
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray dropdown-toggle" size="sm" id="dropdownMenuButton31">
                                                    Sort by: <small>This Month</small>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item to='#'>This Week</Dropdown.Item>
                                                    <Dropdown.Item to='#'>This Month</Dropdown.Item>
                                                    <Dropdown.Item to='#'>This Year</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="flex-wrap d-flex align-items-center justify-content-between">
                                            <Chart options={chart2.options} series={chart2.series} type="radialBar" height="180" className="col-lg-12 col-xl-12 col-xxl-6 eccomerce-chart-02"></Chart>
                                            <div className="d-grid gap-3 col-lg-12 col-xl-12 col-xxl-6">
                                                <div className="d-flex align-items-start">
                                                    <svg className="mt-2 text-primary" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="currentColor">
                                                        <g><circle cx="12" cy="12" r="8" fill="currentColor"></circle></g>
                                                    </svg>
                                                    <div className="ms-2">
                                                        <span className="mb-3">Current Customers:</span>
                                                        <h6 className="mb-0">60%</h6>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-start">
                                                    <svg className="mt-2 text-info" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="currentColor">
                                                        <g><circle cx="12" cy="12" r="8" fill="currentColor"></circle></g>
                                                    </svg>
                                                    <div className="ms-2">
                                                        <span className="mb-3">New Customers:</span>
                                                        <h6 className="mb-0">20%</h6>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-start">
                                                    <svg className="mt-2 text-tertiray" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="currentColor">
                                                        <g><circle cx="12" cy="12" r="8" fill="currentColor"></circle></g>
                                                    </svg>
                                                    <div className="ms-2">
                                                        <span className="mb-3">Retargeted Customers:</span>
                                                        <h6 className="mb-0">20%</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg="7">
                                <Card>
                                    <Card.Header>
                                        <div className="flex-wrap d-flex align-items-center justify-content-between">
                                            <div className="header-title">
                                                <h4 className="card-title">Top Rated</h4>
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray dropdown-toggle" size="sm" id="dropdownMenuButton32">
                                                    See All Reviews
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item to='#'>This Week</Dropdown.Item>
                                                    <Dropdown.Item to='#'>This Month</Dropdown.Item>
                                                    <Dropdown.Item to='#'>This Year</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Card.Header>
                                    <Card.Body id="qui-dashboard">
                                        <Swiper slidesPerView={3}
                                            spaceBetween={32}
                                            modules={[Pagination]}
                                            loop={true}
                                            pagination={{
                                                el: '.swiper-pagination-dot',
                                                clickable: true,
                                            }}
                                            breakpoints={{
                                                320: { slidesPerView: 1 },
                                                550: { slidesPerView: 1 },
                                                991: { slidesPerView: 2 },
                                                1400: { slidesPerView: 2 },
                                                1500: { slidesPerView: 3 },
                                                1920: { slidesPerView: 3 },
                                                2040: { slidesPerView: 3 },
                                                2440: { slidesPerView: 3 }
                                            }}>

                                            <SwiperSlide>
                                                <Card className="border mb-lg-0 shadow-none ">
                                                    <Card.Body className=" p-3">
                                                        <div className="text-center">
                                                            <img src={shap1} alt="" className="img-fluid" loading="lazy" />
                                                        </div>
                                                        <p className="mb-2 mt-3">Product 1</p>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <h5 className="mb-0 counter ">$56.00</h5>
                                                            <p className="mb-0 d-flex align-items-center">
                                                                <svg className="me-2" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M7.11019 0.446009L8.50174 3.24243C8.60426 3.44503 8.79993 3.58573 9.0256 3.617L12.1513 4.07223C12.3338 4.09787 12.4995 4.19416 12.6114 4.34111C12.722 4.48619 12.7695 4.67003 12.7426 4.85075C12.7208 5.00082 12.6501 5.13965 12.542 5.24595L10.2771 7.44144C10.1115 7.59464 10.0364 7.82163 10.0765 8.04362L10.6341 11.1302C10.6935 11.5029 10.4465 11.8543 10.0765 11.925C9.92392 11.9494 9.76763 11.9237 9.6301 11.8537L6.84201 10.4011C6.63509 10.2966 6.39066 10.2966 6.18374 10.4011L3.39564 11.8537C3.05307 12.0357 2.6286 11.9118 2.43794 11.5742C2.3673 11.4397 2.34229 11.2865 2.36542 11.1371L2.92304 8.04988C2.96305 7.82851 2.88741 7.60027 2.72237 7.44707L0.45751 5.25283C0.188078 4.9927 0.179951 4.56435 0.439382 4.29484C0.445008 4.28921 0.451259 4.28296 0.45751 4.27671C0.565034 4.16728 0.706314 4.09787 0.858847 4.07973L3.98452 3.62387C4.20957 3.59198 4.40523 3.45254 4.50838 3.24868L5.84992 0.446009C5.96932 0.205887 6.21687 0.0564357 6.48568 0.0626889H6.56945C6.80262 0.0908282 7.00579 0.235277 7.11019 0.446009Z" fill="#FFD329" />
                                                                </svg>3.7</p>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <Card className="border mb-lg-0 shadow-none">
                                                    <Card.Body className=" p-3">
                                                        <div className="text-center">
                                                            <img src={shap2} alt="" className="img-fluid" loading="lazy" />
                                                        </div>
                                                        <p className="mb-2 mt-3">Product 2</p>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <h5 className="mb-0 counter ">$56.00</h5>
                                                            <p className="mb-0 d-flex align-items-center">
                                                                <svg className="me-2" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M7.11019 0.446009L8.50174 3.24243C8.60426 3.44503 8.79993 3.58573 9.0256 3.617L12.1513 4.07223C12.3338 4.09787 12.4995 4.19416 12.6114 4.34111C12.722 4.48619 12.7695 4.67003 12.7426 4.85075C12.7208 5.00082 12.6501 5.13965 12.542 5.24595L10.2771 7.44144C10.1115 7.59464 10.0364 7.82163 10.0765 8.04362L10.6341 11.1302C10.6935 11.5029 10.4465 11.8543 10.0765 11.925C9.92392 11.9494 9.76763 11.9237 9.6301 11.8537L6.84201 10.4011C6.63509 10.2966 6.39066 10.2966 6.18374 10.4011L3.39564 11.8537C3.05307 12.0357 2.6286 11.9118 2.43794 11.5742C2.3673 11.4397 2.34229 11.2865 2.36542 11.1371L2.92304 8.04988C2.96305 7.82851 2.88741 7.60027 2.72237 7.44707L0.45751 5.25283C0.188078 4.9927 0.179951 4.56435 0.439382 4.29484C0.445008 4.28921 0.451259 4.28296 0.45751 4.27671C0.565034 4.16728 0.706314 4.09787 0.858847 4.07973L3.98452 3.62387C4.20957 3.59198 4.40523 3.45254 4.50838 3.24868L5.84992 0.446009C5.96932 0.205887 6.21687 0.0564357 6.48568 0.0626889H6.56945C6.80262 0.0908282 7.00579 0.235277 7.11019 0.446009Z" fill="#FFD329" />
                                                                </svg>3.7</p>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <Card className="border mb-lg-0 shadow-none">
                                                    <Card.Body className=" p-3">
                                                        <div className="text-center">
                                                            <img src={shap3} alt="" className="img-fluid" loading="lazy" />
                                                        </div>
                                                        <p className="mb-2 mt-3">Product 3</p>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <h5 className="mb-0 counter ">$56.00</h5>
                                                            <p className="mb-0 d-flex align-items-center">
                                                                <svg className="me-2" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M7.11019 0.446009L8.50174 3.24243C8.60426 3.44503 8.79993 3.58573 9.0256 3.617L12.1513 4.07223C12.3338 4.09787 12.4995 4.19416 12.6114 4.34111C12.722 4.48619 12.7695 4.67003 12.7426 4.85075C12.7208 5.00082 12.6501 5.13965 12.542 5.24595L10.2771 7.44144C10.1115 7.59464 10.0364 7.82163 10.0765 8.04362L10.6341 11.1302C10.6935 11.5029 10.4465 11.8543 10.0765 11.925C9.92392 11.9494 9.76763 11.9237 9.6301 11.8537L6.84201 10.4011C6.63509 10.2966 6.39066 10.2966 6.18374 10.4011L3.39564 11.8537C3.05307 12.0357 2.6286 11.9118 2.43794 11.5742C2.3673 11.4397 2.34229 11.2865 2.36542 11.1371L2.92304 8.04988C2.96305 7.82851 2.88741 7.60027 2.72237 7.44707L0.45751 5.25283C0.188078 4.9927 0.179951 4.56435 0.439382 4.29484C0.445008 4.28921 0.451259 4.28296 0.45751 4.27671C0.565034 4.16728 0.706314 4.09787 0.858847 4.07973L3.98452 3.62387C4.20957 3.59198 4.40523 3.45254 4.50838 3.24868L5.84992 0.446009C5.96932 0.205887 6.21687 0.0564357 6.48568 0.0626889H6.56945C6.80262 0.0908282 7.00579 0.235277 7.11019 0.446009Z" fill="#FFD329" />
                                                                </svg>3.7</p>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <Card className="border mb-lg-0 shadow-none">
                                                    <Card.Body className=" p-3">
                                                        <div className="text-center">
                                                            <img src={shap1} alt="" className="img-fluid" loading="lazy" />
                                                        </div>
                                                        <p className="mb-2 mt-3">Product 2</p>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <h5 className="mb-0 counter ">$56.00</h5>
                                                            <p className="mb-0 d-flex align-items-center">
                                                                <svg className="me-2" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M7.11019 0.446009L8.50174 3.24243C8.60426 3.44503 8.79993 3.58573 9.0256 3.617L12.1513 4.07223C12.3338 4.09787 12.4995 4.19416 12.6114 4.34111C12.722 4.48619 12.7695 4.67003 12.7426 4.85075C12.7208 5.00082 12.6501 5.13965 12.542 5.24595L10.2771 7.44144C10.1115 7.59464 10.0364 7.82163 10.0765 8.04362L10.6341 11.1302C10.6935 11.5029 10.4465 11.8543 10.0765 11.925C9.92392 11.9494 9.76763 11.9237 9.6301 11.8537L6.84201 10.4011C6.63509 10.2966 6.39066 10.2966 6.18374 10.4011L3.39564 11.8537C3.05307 12.0357 2.6286 11.9118 2.43794 11.5742C2.3673 11.4397 2.34229 11.2865 2.36542 11.1371L2.92304 8.04988C2.96305 7.82851 2.88741 7.60027 2.72237 7.44707L0.45751 5.25283C0.188078 4.9927 0.179951 4.56435 0.439382 4.29484C0.445008 4.28921 0.451259 4.28296 0.45751 4.27671C0.565034 4.16728 0.706314 4.09787 0.858847 4.07973L3.98452 3.62387C4.20957 3.59198 4.40523 3.45254 4.50838 3.24868L5.84992 0.446009C5.96932 0.205887 6.21687 0.0564357 6.48568 0.0626889H6.56945C6.80262 0.0908282 7.00579 0.235277 7.11019 0.446009Z" fill="#FFD329" />
                                                                </svg>3.7</p>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <Card className="border mb-lg-0 shadow-none">
                                                    <Card.Body className=" p-3">
                                                        <div className="text-center">
                                                            <img src={shap2} alt="" className="img-fluid" loading="lazy" />
                                                        </div>
                                                        <p className="mb-2 mt-3">Product 3</p>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <h5 className="mb-0 counter ">$56.00</h5>
                                                            <p className="mb-0 d-flex align-items-center">
                                                                <svg className="me-2" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M7.11019 0.446009L8.50174 3.24243C8.60426 3.44503 8.79993 3.58573 9.0256 3.617L12.1513 4.07223C12.3338 4.09787 12.4995 4.19416 12.6114 4.34111C12.722 4.48619 12.7695 4.67003 12.7426 4.85075C12.7208 5.00082 12.6501 5.13965 12.542 5.24595L10.2771 7.44144C10.1115 7.59464 10.0364 7.82163 10.0765 8.04362L10.6341 11.1302C10.6935 11.5029 10.4465 11.8543 10.0765 11.925C9.92392 11.9494 9.76763 11.9237 9.6301 11.8537L6.84201 10.4011C6.63509 10.2966 6.39066 10.2966 6.18374 10.4011L3.39564 11.8537C3.05307 12.0357 2.6286 11.9118 2.43794 11.5742C2.3673 11.4397 2.34229 11.2865 2.36542 11.1371L2.92304 8.04988C2.96305 7.82851 2.88741 7.60027 2.72237 7.44707L0.45751 5.25283C0.188078 4.9927 0.179951 4.56435 0.439382 4.29484C0.445008 4.28921 0.451259 4.28296 0.45751 4.27671C0.565034 4.16728 0.706314 4.09787 0.858847 4.07973L3.98452 3.62387C4.20957 3.59198 4.40523 3.45254 4.50838 3.24868L5.84992 0.446009C5.96932 0.205887 6.21687 0.0564357 6.48568 0.0626889H6.56945C6.80262 0.0908282 7.00579 0.235277 7.11019 0.446009Z" fill="#FFD329" />
                                                                </svg>3.7</p>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </SwiperSlide>
                                        </Swiper>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="12">
                                <Card>
                                    <Card.Header>
                                        <div className="flex-wrap d-flex justify-content-between">
                                            <div className="header-title">
                                                <h4>To-Do List</h4>
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray dropdown-toggle" size="sm" id="dropdownMenuButton33">
                                                    Sort by : Month
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item to='#'>This Week</Dropdown.Item>
                                                    <Dropdown.Item to='#'>This Month</Dropdown.Item>
                                                    <Dropdown.Item to='#'>This Year</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="table-responsive rounded border">
                                            <table id="datatable" className="table mb-0 table-striped" data-toggle="data-table">
                                                <thead>
                                                    <tr>
                                                        <th>Rank</th>
                                                        <th>Profile</th>
                                                        <th>Revenue</th>
                                                        <th>Sales</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <img src={shap4} className="img-fluid" alt="" loading="lazy" />
                                                        </td>
                                                        <td><div className="">
                                                            <h6>Elon Musk</h6>
                                                            <small>@musk</small>
                                                        </div></td>
                                                        <td>
                                                            <h6>$25,166 </h6>
                                                        </td>
                                                        <td>
                                                            <h6>4669</h6>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <img src={shap5} className="img-fluid" alt="" loading="lazy" />
                                                        </td>
                                                        <td><div className="">
                                                            <h6>Jacob Jones</h6>
                                                            <small>@Jones</small>
                                                        </div></td>
                                                        <td>
                                                            <h6>$43,526 </h6>
                                                        </td>
                                                        <td>
                                                            <h6>8652</h6>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <img src={shap6} className="img-fluid" alt="" loading="lazy" />
                                                        </td>
                                                        <td><div className="">
                                                            <h6>Leslie Alexander</h6>
                                                            <small>@leslie</small>
                                                        </div></td>
                                                        <td>
                                                            <h6>$52,125  </h6>
                                                        </td>
                                                        <td>
                                                            <h6>9587</h6>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <img src={shap7} className="img-fluid" alt="" loading="lazy" />
                                                        </td>
                                                        <td><div className="">
                                                            <h6>Albert Flores</h6>
                                                            <small>@albert</small>
                                                        </div></td>
                                                        <td>
                                                            <h6>$13,657</h6>
                                                        </td>
                                                        <td>
                                                            <h6>2304</h6>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="4" md="5">
                        <Card className='card weather-card bg-primary'>
                            <Card.Body>
                                <Row className='align-items-center'>
                                    <div className="d-flex justify-content-between align-items-center  gap-4 rounded pb-0">
                                        <div>
                                            <h4>27&deg;</h4>
                                            <small className="mb-0">Mumbai, India</small>
                                        </div>
                                        <div className=" iq-product-weather d-flex gap-2">
                                            <div className=" d-flex flex-column align-items-center">
                                                <svg className="text-primary icon-35" xmlns="http://www.w3.org/2000/svg" width="35" viewBox="0 0 44 44" fill="none">
                                                    <path d="M21.9997 7.33337C27.1644 7.33337 30.0936 10.5397 30.5189 14.41H30.6488C33.9719 14.41 36.6663 16.9299 36.6663 20.0384C36.6663 23.1469 33.9719 25.6667 30.6488 25.6667L29.1759 25.6647V25.6667C25.2806 25.6667 18.4961 25.6667 13.3505 25.6667C10.0275 25.6667 7.33301 23.1469 7.33301 20.0384C7.33301 17.0439 9.83053 14.5974 12.9839 14.4202L13.4804 14.41C13.91 10.5132 16.8349 7.33337 21.9997 7.33337Z" fill="#ffffff" />
                                                    <path d="M25.6663 32.5926V36.6667M18.333 18.3334V22.4074V18.3334ZM18.333 28.5186V32.5926V28.5186ZM25.6663 22.4074V26.4815V22.4074Z" stroke="#EBEEFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p className="mt-1 mb-0">48%</p>
                                            </div>
                                            <div className=" d-flex flex-column align-items-center">
                                                <svg className="text-primary icon-35" xmlns="http://www.w3.org/2000/svg" width="35" viewBox="0 0 44 44" fill="none">
                                                    <path d="M9.1665 14.6667H24.7498C25.6013 14.6829 26.4405 14.4617 27.1732 14.0277C27.9059 13.5937 28.5033 12.9642 28.8982 12.2097C29.2931 11.4552 29.4701 10.6056 29.4091 9.75613C29.3482 8.9067 29.0517 8.09105 28.5531 7.40066C28.0545 6.71028 27.3734 6.17246 26.5862 5.84754C25.799 5.52262 24.9369 5.42344 24.0965 5.56113C23.2561 5.69882 22.4706 6.06794 21.8283 6.62707C21.1859 7.18621 20.7121 7.91325 20.4598 8.72665" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M5.5 22H33.9167C34.7681 21.9837 35.6073 22.2049 36.34 22.6389C37.0728 23.0729 37.6701 23.7025 38.065 24.457C38.46 25.2115 38.6369 26.0611 38.5759 26.9105C38.515 27.7599 38.2186 28.5756 37.72 29.266C37.2214 29.9564 36.5403 30.4942 35.7531 30.8191C34.9659 31.144 34.1037 31.2432 33.2633 31.1055C32.4229 30.9678 31.6375 30.5987 30.9951 30.0396C30.3528 29.4804 29.8789 28.7534 29.6267 27.94" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7.3335 29.3333H17.4168C18.2683 29.317 19.1074 29.5383 19.8402 29.9723C20.5729 30.4063 21.1703 31.0358 21.5652 31.7903C21.9601 32.5448 22.137 33.3944 22.0761 34.2439C22.0151 35.0933 21.7187 35.9089 21.2201 36.5993C20.7215 37.2897 20.0404 37.8275 19.2532 38.1524C18.466 38.4774 17.6039 38.5765 16.7635 38.4389C15.9231 38.3012 15.1376 37.932 14.4953 37.3729C13.8529 36.8138 13.3791 36.0867 13.1268 35.2733" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p className="mt-1 mb-0">12 km/h</p>
                                            </div>
                                            <div className=" d-flex flex-column align-items-center">
                                                <svg className="text-primary icon-35" xmlns="http://www.w3.org/2000/svg" width="35" viewBox="0 0 44 44" fill="none">
                                                    <path d="M12.4664 20.1667C11.5023 21.839 10.9952 23.7355 10.9961 25.6659C10.997 27.5962 11.5058 29.4923 12.4715 31.1637C13.4372 32.8351 14.8257 34.223 16.4976 35.1879C18.1694 36.1528 20.0658 36.6608 21.9961 36.6608C23.9264 36.6608 25.8228 36.1528 27.4946 35.1879C29.1665 34.223 30.555 32.8351 31.5207 31.1637C32.4864 29.4923 32.9952 27.5962 32.9961 25.6659C32.997 23.7355 32.4899 21.839 31.5258 20.1667L21.9979 5.5L12.4646 20.1667H12.4664Z" fill="#ffffff" />
                                                    <path d="M26.6091 31.2369V31.2369C26.5668 31.0401 26.6123 30.8327 26.7351 30.6634C26.8579 30.494 27.0471 30.3775 27.2585 30.3412V30.3412C27.9401 30.1705 28.4461 29.6116 28.5173 28.9509C28.5133 28.5458 28.8559 28.2027 29.2841 28.1828C29.7045 28.16 30.0551 28.4603 30.0716 28.8574C30.0772 28.9066 30.073 28.9566 30.0593 29.0049C29.9389 30.3235 28.9259 31.4423 27.5622 31.7628C27.3576 31.8188 27.1406 31.7943 26.9609 31.6952C26.7812 31.596 26.6543 31.4306 26.6091 31.2369Z" fill="white" />
                                                </svg>
                                                <p className="mt-1 mb-0">50</p>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card className="card bg-transparent shadow-none overflow-hidden">
                            <div className="header-title">
                                <h4 className="mb-4">Your Cards</h4>
                            </div>
                            <Card.Body className="p-0">
                                <Card className=" visa-card-widget mb-0">
                                    <Card.Header className="pb-4 border-0">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="font-weight-bold">VISA </h5>
                                                <p className="mb-0">PREMIUM ACCOUNT</p>
                                            </div>
                                            <div className="master-card-content">
                                                <svg className="master-card-1" width="60" height="60" viewBox="0 0 24 24">
                                                    <path fill="#ffffff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                                </svg>
                                                <svg className="master-card-2" width="60" height="60" viewBox="0 0 24 24">
                                                    <path fill="#ffffff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            <div className="card-number d-flex align-items-center justify-content-between">
                                                <span className="fs-5 me-2">5789</span>
                                                <span className="fs-5 me-2">****</span>
                                                <span className="fs-5 me-2">****</span>
                                                <span className="fs-5">2847</span>
                                            </div>
                                        </div>
                                        <div className="mb-2 d-flex align-items-center justify-content-between">
                                            <p className="mb-0">Card holder</p>
                                            <p className="mb-0">Expire Date</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h6>Anne Teak</h6>
                                            <h6>06/21</h6>
                                        </div>
                                    </Card.Header>
                                </Card>
                            </Card.Body>
                        </Card>
                        <div className="grid-cols-2 d-grid gap-card mb-5">
                            <Button type="button" variant="primary">Add Card</Button>{' '}
                            <Button type="button" variant="danger">Remove Card</Button>{' '}
                        </div>
                        <Card>
                            <Card.Header>
                                <div className="header-title">
                                    <h4 className="mb-0">Product Delivery</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Card className=" border mb-3 shadow-none bg-transparent">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="d-flex align-items-center">
                                                <img src={shap8} alt="" className="img-fluid" loading='lazy' />
                                                <div className="ms-3">
                                                    <p className="mb-2">T-shirts</p>
                                                    <h6 className="mb-0">$56.00</h6>
                                                </div>
                                            </div>
                                            <div className="">
                                                <Dropdown>
                                                    <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray" size="sm" id="dropdownMenuButton31">
                                                        <svg width="22" height="5" viewBox="0 0 22 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.6788 5C20.9595 5 22 3.96222 22 2.68866C22 1.41318 20.9595 0.373465 19.6788 0.373465C18.3981 0.373465 17.3576 1.41318 17.3576 2.68866C17.3576 3.96222 18.3981 5 19.6788 5ZM11.0005 5C12.2812 5 13.3217 3.96222 13.3217 2.68866C13.3217 1.41318 12.2812 0.373465 11.0005 0.373465C9.71976 0.373465 8.67929 1.41318 8.67929 2.68866C8.67929 3.96222 9.71976 5 11.0005 5ZM4.64239 2.68866C4.64239 3.96222 3.60192 5 2.3212 5C1.04047 5 0 3.96222 0 2.68866C0 1.41318 1.04047 0.373465 2.3212 0.373465C3.60192 0.373465 4.64239 1.41318 4.64239 2.68866Z" fill="currentColor"></path>
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item to='#'>This Week</Dropdown.Item>
                                                        <Dropdown.Item to='#'>This Month</Dropdown.Item>
                                                        <Dropdown.Item to='#'>This Year</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="mb-0">To: <b>Elon Musk</b></small>
                                            <Badge className="rounded" bg="soft-success">Delivered</Badge>{' '}
                                        </div>
                                    </Card.Body>
                                </Card>
                                <Card className="border mb-3 shadow-none bg-transparent">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="d-flex align-items-center">
                                                <img src={shap9} alt="" className="img-fluid" loading='lazy' />
                                                <div className="ms-3">
                                                    <p className="mb-2">Shoes</p>
                                                    <h6 className="mb-0">$56.00</h6>
                                                </div>
                                            </div>
                                            <div className="">
                                                <Dropdown>
                                                    <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray" size="sm" id="dropdownMenuButton32">
                                                        <svg width="22" height="5" viewBox="0 0 22 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.6788 5C20.9595 5 22 3.96222 22 2.68866C22 1.41318 20.9595 0.373465 19.6788 0.373465C18.3981 0.373465 17.3576 1.41318 17.3576 2.68866C17.3576 3.96222 18.3981 5 19.6788 5ZM11.0005 5C12.2812 5 13.3217 3.96222 13.3217 2.68866C13.3217 1.41318 12.2812 0.373465 11.0005 0.373465C9.71976 0.373465 8.67929 1.41318 8.67929 2.68866C8.67929 3.96222 9.71976 5 11.0005 5ZM4.64239 2.68866C4.64239 3.96222 3.60192 5 2.3212 5C1.04047 5 0 3.96222 0 2.68866C0 1.41318 1.04047 0.373465 2.3212 0.373465C3.60192 0.373465 4.64239 1.41318 4.64239 2.68866Z" fill="currentColor"></path>
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item to='#'>This Week</Dropdown.Item>
                                                        <Dropdown.Item to='#'>This Month</Dropdown.Item>
                                                        <Dropdown.Item to='#'>This Year</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="mb-0">To: <b>Elon Musk</b></small>
                                            <Badge className="rounded" bg="soft-gray">Shipping</Badge>{' '}
                                        </div>
                                    </Card.Body>
                                </Card>
                                <Card className="border mb-3 shadow-none bg-transparent">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="d-flex align-items-center">
                                                <img src={shap10} alt="" className="img-fluid" loading='lazy' />
                                                <div className="ms-3">
                                                    <p className="mb-2">Watch</p>
                                                    <h6 className="mb-0">$56.00</h6>
                                                </div>
                                            </div>
                                            <div className="">
                                                <Dropdown>
                                                    <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray" size="sm" id="dropdownMenuButton33">
                                                        <svg width="22" height="5" viewBox="0 0 22 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.6788 5C20.9595 5 22 3.96222 22 2.68866C22 1.41318 20.9595 0.373465 19.6788 0.373465C18.3981 0.373465 17.3576 1.41318 17.3576 2.68866C17.3576 3.96222 18.3981 5 19.6788 5ZM11.0005 5C12.2812 5 13.3217 3.96222 13.3217 2.68866C13.3217 1.41318 12.2812 0.373465 11.0005 0.373465C9.71976 0.373465 8.67929 1.41318 8.67929 2.68866C8.67929 3.96222 9.71976 5 11.0005 5ZM4.64239 2.68866C4.64239 3.96222 3.60192 5 2.3212 5C1.04047 5 0 3.96222 0 2.68866C0 1.41318 1.04047 0.373465 2.3212 0.373465C3.60192 0.373465 4.64239 1.41318 4.64239 2.68866Z" fill="currentColor"></path>
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item to='#'>This Week</Dropdown.Item>
                                                        <Dropdown.Item to='#'>This Month</Dropdown.Item>
                                                        <Dropdown.Item to='#'>This Year</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="mb-0">To: Elon Musk</small>
                                            <Badge className="rounded" bg="soft-danger">Confirmed</Badge>{' '}
                                        </div>
                                    </Card.Body>
                                </Card>
                                <Card className="border mb-lg-0 shadow-none bg-transparent">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="d-flex align-items-center">
                                                <img src={shap11} alt="" className="img-fluid" loading='lazy' />
                                                <div className="ms-3">
                                                    <p className="mb-0">Earphones</p>
                                                    <h6 className="mb-0">$56.00</h6>
                                                </div>
                                            </div>
                                            <div className="">
                                                <Dropdown>
                                                    <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray
                                                " size="sm" id="dropdownMenuButton34">
                                                        <svg width="22" height="5" viewBox="0 0 22 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.6788 5C20.9595 5 22 3.96222 22 2.68866C22 1.41318 20.9595 0.373465 19.6788 0.373465C18.3981 0.373465 17.3576 1.41318 17.3576 2.68866C17.3576 3.96222 18.3981 5 19.6788 5ZM11.0005 5C12.2812 5 13.3217 3.96222 13.3217 2.68866C13.3217 1.41318 12.2812 0.373465 11.0005 0.373465C9.71976 0.373465 8.67929 1.41318 8.67929 2.68866C8.67929 3.96222 9.71976 5 11.0005 5ZM4.64239 2.68866C4.64239 3.96222 3.60192 5 2.3212 5C1.04047 5 0 3.96222 0 2.68866C0 1.41318 1.04047 0.373465 2.3212 0.373465C3.60192 0.373465 4.64239 1.41318 4.64239 2.68866Z" fill="currentColor"></path>
                                                        </svg>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item to='#'>This Week</Dropdown.Item>
                                                        <Dropdown.Item to='#'>This Month</Dropdown.Item>
                                                        <Dropdown.Item to='#'>This Year</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="mb-0">To:<b> Elon Musk</b></small>
                                            <Badge className="rounded" bg="soft-success">Delivered</Badge>{' '}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
)

Ecommerce.displayName = "Ecommerce"
export default Ecommerce
