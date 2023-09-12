import { useEffect, memo, Fragment } from 'react'
import { Row, Col, Card, Dropdown } from 'react-bootstrap'

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

const Analytics = memo((props) => {
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
    const colors = [variableColors.secondary, variableColors.tertiray, variableColors.primary];
    useEffect(() => {
        return () => colors
    })

  
    // const variableColors = getVariableColor();
    const colors1 = [variableColors.primary, variableColors.secondary];
    const chart5 = {
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    barHeight: '100%',
                    distributed: true,
                    borderRadius: 3,
                    dataLabels: {
                        position: 'bottom'
                    },
                }
            },
            colors: colors1,
            legend: {
                show: false,
            },
            stroke: {
                show: false,
            },
            grid: {
                show: true,
                strokeDashArray: 7,
            },
            dataLabels: {
                enabled: false,
                textAnchor: 'start',
                style: {
                    colors: ['#fff']
                },
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                },
                dropShadow: {
                    enabled: true
                }
            },
            xaxis: {
                categories: ['Setembro', 'Outubro', 'Novembro', 'Dezembro', 'Janeiro', 'Fevereiro', 'Março', 'Abril','Maio','Junho'],
            },

            yaxis: {
                labels: {
                    show: true,
                    minWidth: 20,
                    maxWidth: 20
                }
            },
            tooltip: {
                theme: 'dark',
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function () {
                            return ''
                        }
                    }
                }
            },
        },
        series: [{
            data: [800, 780, 610, 410, 350, 200, 110, 80,123,195]
        }],
    }
  

    return (
        <Fragment>

            <Row>
                <Col lg="12">
                    <Row>
                        <h4 className="mb-3">Dashboard</h4>
                        <Col lg="3">
                            <Card className="text-center">
                                <Card.Body>
                                    <h2 className="mb-3">862</h2>
                                    <h5>Total de estudantes</h5>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="3">
                            <Card className="text-center">
                                <Card.Body>
                                    <h2 className="mb-3">400</h2>
                                    <h5>Estudantes aprovados</h5>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="3">
                            <Card className="text-center">
                                <Card.Body>
                                    <h2 className="mb-3">14</h2>
                                    <h5>Estudantes Reprovados</h5>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="3">
                            <Card className="text-center">
                                <Card.Body>
                                    <h2 className="mb-3">32%</h2>
                                    <h5>Despesas</h5>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="12">
                        <Card className="card-block card-stretch card-height">
                                <Card.Header>
                                    <div className="flex-wrap  d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4>Estudantes matriculados</h4>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle as={CustomToggle} to='#' variant="text-gray" size="sm" id="dropdownMenuButton34">
                                                <svg width="22" height="5" viewBox="0 0 22 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M19.6788 5C20.9595 5 22 3.96222 22 2.68866C22 1.41318 20.9595 0.373465 19.6788 0.373465C18.3981 0.373465 17.3576 1.41318 17.3576 2.68866C17.3576 3.96222 18.3981 5 19.6788 5ZM11.0005 5C12.2812 5 13.3217 3.96222 13.3217 2.68866C13.3217 1.41318 12.2812 0.373465 11.0005 0.373465C9.71976 0.373465 8.67929 1.41318 8.67929 2.68866C8.67929 3.96222 9.71976 5 11.0005 5ZM4.64239 2.68866C4.64239 3.96222 3.60192 5 2.3212 5C1.04047 5 0 3.96222 0 2.68866C0 1.41318 1.04047 0.373465 2.3212 0.373465C3.60192 0.373465 4.64239 1.41318 4.64239 2.68866Z" fill="currentColor"></path>
                                                </svg>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item to='#'>Ano</Dropdown.Item>
                                                <Dropdown.Item to='#'>Mês</Dropdown.Item>
                                                <Dropdown.Item to='#'>Week</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Chart options={chart5.options} series={chart5.series} type="bar" height="100%" className="analytics-chart-02"></Chart>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Fragment>
    )
}
)

Analytics.displayName = "Analytics"
export default Analytics
