// ** 热量计算 ** //
import React, { useState } from "react";
import {
  Form,
  InputNumber,
  Button,
  Statistic,
  Row,
  Col,
  Card,
  Slider
} from "antd";
import {
  computeHolesCount,
  computeThroatDiameter,
  computeWaterDiameter,
  computeCalorie,
  computeSteamCount,
  computeSteamDiameter
} from "../helper";

const HeatComputerBase = props => {
  // 水管直径 单位 mm
  const [waterDiameter, setWaterDiameter] = useState(0);
  // 水加热需要吸收的热量 单位  KCal/h
  const [calorie, setCalorie] = useState(0);
  // 蒸汽耗量 单位 kg/h
  const [steamCount, setSteamCount] = useState(0);
  // 蒸汽直径 单位 mm
  const [steamDiameter, setSteamDiameter] = useState(0);
  // 喉径
  const [throatDiameter, setThroatDiameter] = useState(0);
  // 斜孔
  const [holesCount, setHolesCount] = useState(0);

  const {
    form: { getFieldDecorator, validateFieldsAndScroll }
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
          // eslint-disable-next-line
          steamPressure, // 蒸汽压力
          // eslint-disable-next-line
          steamTemperature, // 蒸汽温度
          steamEnthalpy, // 蒸汽热焓值
          steamSpecificHeatCapacity, // 蒸汽比热容
          steamVelocity // 蒸汽经济流速
        } = values;
        // 计算水管的直径
        const waterDiameter = computeWaterDiameter(flow, waterVelocity);
        setWaterDiameter(waterDiameter);

        // 计算水需要吸收的热量
        const calorie = computeCalorie(flow, heatTo, heatFrom);
        setCalorie(calorie);

        // 喉径
        const throatDiameter = computeThroatDiameter(flow);
        setThroatDiameter(throatDiameter);

        // 斜孔
        const holesCount = computeHolesCount(flow, heatFrom, heatTo);
        setHolesCount(holesCount);

        // 蒸汽耗量
        const steamCount = computeSteamCount(calorie, steamEnthalpy, heatTo);
        setSteamCount(steamCount);

        // 蒸汽管道直径
        const steamDiameter = computeSteamDiameter(
          steamCount,
          steamSpecificHeatCapacity,
          steamVelocity
        );
        setSteamDiameter(steamDiameter);
      }
    });
  };

  // 水的经济流速断点标记
  const waterVelocityMarks = {
    1.0: "1.0 m/s",
    1.5: "1.5 m/s",
    2.0: "2.0 m/s",
    2.5: "2.5 m/s"
  };

  // 蒸汽的经济流速断点标记
  const steamVelocityMarks = {
    20: "20 m/s",
    25: "25 m/s",
    30: "30 m/s",
    35: "35 m/s",
    40: "40 m/s",
    45: "45 m/s"
  };

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Form
            onSubmit={onSubmit}
            wrapperCol={{ span: 18 }}
            labelCol={{ span: 6 }}
          >
            <Form.Item label="水流量">
              {getFieldDecorator("flow", {
                initialValue: 10,
                rules: [{ required: true, message: "请输入水流量" }]
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="水的经济流速">
              {getFieldDecorator("waterVelocity", {
                initialValue: 1.5
              })(
                <Slider
                  min={1.0}
                  max={2.5}
                  marks={waterVelocityMarks}
                  step={0.5}
                />
              )}
            </Form.Item>
            <Form.Item label="进水温度 °C">
              {getFieldDecorator("heatFrom", {
                initialValue: 5,
                rules: [{ required: true, message: "请输入进水温度" }]
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="出水温度 °C">
              {getFieldDecorator("heatTo", {
                initialValue: 65,
                rules: [{ required: true, message: "请输入出水温度" }]
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="蒸汽压力 MPa">
              {getFieldDecorator("steamPressure", {
                initialValue: 0.5,
                rules: [{ required: true, message: "请输入蒸汽压力" }]
              })(<InputNumber step={0.1} min={0.1} max={1.3} />)}
            </Form.Item>
            <Form.Item label="蒸汽温度 °C">
              {getFieldDecorator("steamTemperature", {
                initialValue: 165,
                rules: [{ required: true, message: "请输入蒸汽温度" }]
              })(<InputNumber min={100} max={300} />)}
            </Form.Item>
            <Form.Item label="蒸汽热焓 Kj/Kg">
              {getFieldDecorator("steamEnthalpy", {
                initialValue: 2700,
                rules: [{ required: true, message: "请输入蒸汽热焓" }]
              })(<InputNumber min={2700} max={2900} step={50} />)}
            </Form.Item>
            <Form.Item label="蒸汽比容 m³/Kg">
              {getFieldDecorator("steamSpecificHeatCapacity", {
                initialValue: 0.4,
                rules: [{ required: true, message: "请输入蒸汽比热容" }]
              })(<InputNumber min={0.2} max={0.6} step={0.1} />)}
            </Form.Item>
            <Form.Item label="蒸汽经济流速">
              {getFieldDecorator("steamVelocity", {
                initialValue: 25
              })(
                <Slider min={20} max={45} marks={steamVelocityMarks} step={5} />
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
              <Button type="primary" htmlType="submit">
                计算
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Col span={12}>
            <Card>
              <Statistic
                title="蒸汽耗量"
                value={steamCount}
                valueStyle={{ color: "#f50" }}
                suffix="kg/h"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic title="蒸汽管道" value={steamDiameter} suffix="mm" />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic title="水管直径" value={waterDiameter} suffix="mm" />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="吸收热量"
                value={calorie}
                valueStyle={{ color: "#f50" }}
                suffix="KCal/h"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic title="喉部口径" value={throatDiameter} suffix="mm" />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic title="斜孔数量" value={holesCount} />
            </Card>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

const HeatComputer = Form.create({ name: "header_computer" })(HeatComputerBase);

export default HeatComputer;
