// ** 热量计算 ** //
import React, { useState } from 'react';
import {
  Form,
  InputNumber,
  Button,
  Statistic,
  Row,
  Col,
  Card,
  Slider,
} from 'antd';
import {
  computeHolesCount,
  computeThroatDiameter,
  computeWaterDiameter,
  computeCalorie,
} from '../helper';

// 千焦到千卡的转换系数
const KJ_TO_KCAL = 4.184;

const HeatComputerBase = props => {
  // 水管直径 单位 mm
  const [waterDn, setWaterDn] = useState(0);
  // 水加热需要吸收的热量 单位  KCal/h
  const [calorie, setCalorie] = useState(0);
  // 蒸汽耗量 单位 kg/h
  const [steamCount, setSteamCount] = useState(0);
  // 蒸汽直径 单位 mm
  const [steamDn, setSteamDn] = useState(0);
  // 喉径
  const [throatDiameter, setThroatDiameter] = useState(0);
  // 斜孔
  const [holesCount, setHolesCount] = useState(0);

  const {
    form: { getFieldDecorator, validateFieldsAndScroll },
  } = props;

  const onSubmit = e => {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        const {
          flow,
          waterVelocity,
          heatFrom,
          heatTo,
          steamPressure,
          steamTemperature,
          steamEnthalpy,
        } = values;
        // 计算水管的直径
        const waterDn = computeWaterDiameter(flow, waterVelocity);
        setWaterDn(waterDn);
        console.log('水管直径', waterDn);
        // 计算水需要吸收的热量
        const calorie = computeCalorie(flow, heatTo, heatFrom);
        setCalorie(calorie);

        // 喉径
        const throatDiameter = computeThroatDiameter(flow);
        setThroatDiameter(throatDiameter);
        // 斜孔
        const holesCount = computeHolesCount(flow, heatFrom, heatTo);
        setHolesCount(holesCount);
      }
    });
  };

  const marks = {
    1.0: '1.0 m/s',
    1.5: '1.5 m/s',
    2.0: '2.0 m/s',
    2.5: '2.5 m/s',
  };

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col span={8}>
          <Form
            onSubmit={onSubmit}
            wrapperCol={{ span: 18 }}
            labelCol={{ span: 6 }}
          >
            <Form.Item label="水流量">
              {getFieldDecorator('flow', {
                initialValue: 10,
                rules: [{ required: true, message: '请输入水流量' }],
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="水的经济流速">
              {getFieldDecorator('waterVelocity', {
                initialValue: 1.5,
              })(<Slider min={1.0} max={2.5} marks={marks} step={0.5} />)}
            </Form.Item>
            <Form.Item label="进水温度 °C">
              {getFieldDecorator('heatFrom', {
                initialValue: 5,
                rules: [{ required: true, message: '请输入进水温度' }],
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="出水温度 °C">
              {getFieldDecorator('heatTo', {
                initialValue: 65,
                rules: [{ required: true, message: '请输入出水温度' }],
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="蒸汽压力 MPa">
              {getFieldDecorator('steamPressure', {
                initialValue: 0.5,
                rules: [{ required: true, message: '请输入蒸汽压力' }],
              })(<InputNumber step={0.1} min={0.1} max={1.3} />)}
            </Form.Item>
            <Form.Item label="蒸汽温度 °C">
              {getFieldDecorator('steamTemperature', {
                initialValue: 165,
                rules: [{ required: true, message: '请输入蒸汽温度' }],
              })(<InputNumber min={100} max={350} />)}
            </Form.Item>
            <Form.Item label="蒸汽热焓 Kj/Kg">
              {getFieldDecorator('steamEnthalpy', {
                initialValue: 2700,
                rules: [{ required: true, message: '请输入蒸汽热焓' }],
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
              <Button type="primary" htmlType="submit">
                计算
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="蒸汽耗量"
                value={steamCount}
                valueStyle={{ color: '#f50' }}
                suffix="kg/h"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="蒸汽管道" value={steamDn} suffix="mm" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="水管直径" value={waterDn} suffix="mm" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="吸收热量"
                value={calorie}
                valueStyle={{ color: '#f50' }}
                suffix="KCal/h"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="喉部口径" value={throatDiameter} suffix="mm" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="斜孔数量" value={holesCount} />
            </Card>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

const HeatComputer = Form.create({ name: 'header_computer' })(HeatComputerBase);

export default HeatComputer;
