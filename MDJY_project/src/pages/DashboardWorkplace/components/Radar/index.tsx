import { Axis, Chart, Coord, Geom, Tooltip } from 'bizcharts';
import { Col, Row } from 'antd';
import React, { Component } from 'react';

import autoHeight from './autoHeight';
import styles from './index.less';

export interface RadarProps {
    title?: React.ReactNode;
    height?: number;
    padding?: [number, number, number, number];
    hasLegend?: boolean;
    data: {
        name: string;
        label: string;
        value: string | number;
    }[];
    colors?: string[];
    animate?: boolean;
    forceFit?: boolean;
    tickCount?: number;
    style?: React.CSSProperties;
}
interface RadarState {
    legendData: {
        checked: boolean;
        name: string;
        color: string;
        percent: number;
        value: string;
    }[];
}
/* eslint react/no-danger:0 */
class Radar extends Component<RadarProps, RadarState> {
    state: RadarState = {
        legendData: [],
    };

    chart: G2.Chart | undefined = undefined;

    node: HTMLDivElement | undefined = undefined;

    componentDidMount() {
        this.getLegendData();
    }

    componentDidUpdate(preProps: RadarProps) {
        const { data } = this.props;
        if (data !== preProps.data) {
            this.getLegendData();
        }
    }

    getG2Instance = (chart: G2.Chart) => {
        this.chart = chart;
    };

    // for custom lengend view
    getLegendData = () => {
        if (!this.chart) return;
        const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
        if (!geom) return;
        const items = (geom as any).get('dataArray') || []; // 获取图形对应的

        const legendData = items.map((item: { color: any; _origin: any }[]) => {
            // eslint-disable-next-line no-underscore-dangle
            const origins = item.map(t => t._origin);
            const result = {
                name: origins[0].name,
                color: item[0].color,
                checked: true,
                value: origins.reduce((p, n) => p + n.value, 0),
            };

            return result;
        });

        this.setState({
            legendData,
        });
    };

    handleRef = (n: HTMLDivElement) => {
        this.node = n;
    };

    handleLegendClick = (
        item: {
            checked: boolean;
            name: string;
        },
        i: string | number,
    ) => {
        const newItem = item;
        newItem.checked = !newItem.checked;

        const { legendData } = this.state;
        legendData[i] = newItem;

        const filteredLegendData = legendData.filter(l => l.checked).map(l => l.name);

        if (this.chart) {
            this.chart.filter('name', val => filteredLegendData.indexOf(`${val}`) > -1);
            this.chart.repaint();
        }

        this.setState({
            legendData,
        });
    };

    render() {
        const defaultColors = [
            '#1890FF',
            '#FACC14',
            '#2FC25B',
            '#8543E0',
            '#F04864',
            '#13C2C2',
            '#fa8c16',
            '#a0d911',
        ];

        const {
            data = [],
            height = 0,
            title,
            hasLegend = false,
            forceFit = true,
            tickCount = 5,
            padding = [35, 30, 16, 30] as [number, number, number, number],
            animate = true,
            colors = defaultColors,
        } = this.props;

        const { legendData } = this.state;

        const scale = {
            value: {
                min: 0,
                tickCount,
            },
        };

        const chartHeight = height - (hasLegend ? 80 : 22);
        return (
            <div className={styles.radar} style={{ height }}>
                {title && <h4>{title}</h4>}
                <Chart
                    scale={scale}
                    height={chartHeight}
                    forceFit={forceFit}
                    data={data}
                    onGetG2Instance={this.getG2Instance}
                >
                    <Tooltip />
                    <Axis name="label" />
                    <Axis name="value" />
                    <Geom
                        type="interval"
                        position="label*value"
                        tooltip={[
                            'label*value',
                            (time, sold) => {
                                return {
                                    //自定义 tooltip 上显示的 title 显示内容等。
                                    name: '今日运势',
                                    title: time,
                                    value: sold,
                                };
                            },
                        ]}
                    />
                </Chart>
                <Row className={styles.legend}>
                    <Col span={24 / legendData.length}>
                        <div className={styles.legendItem}>
                            <p>
                                <span>今日分析</span>
                            </p>
                            <h6>今天的运气分析</h6>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default autoHeight()(Radar);
