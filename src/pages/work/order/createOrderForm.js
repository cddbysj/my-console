// ** 新建订单页面 ** //
import React from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  DatePicker,
  message,
} from 'antd';
import firebase from 'api/firebase';
import styles from './createOrderForm.module.css';

const { RangePicker } = DatePicker;

const order = {
  consumer: '广州昌硕',
  products: [
    {
      name: 'HQS-65-7C',
      quantity: 1,
      weight: 15,
      flow: 7,
      heatFrom: 20,
      heatTo: 60,
      flangeStandard: 'GB/T 9119-2000',
    },
    {
      name: 'JRG-250-100G',
      quantity: 1,
      weight: 200,
      flow: 100,
      heatFrom: 5,
      heatTo: 25,
      flangeStandard: 'GB/T 9119-2000',
    },
  ],
  orderAt: '2019-12-20',
  arrivalAt: '2019-12-28',
};

const CreateOrderFormBase = props => {
  const {
    form: { getFieldDecorator, validateFieldsAndScroll },
  } = props;

  const onSubmit = e => {
    e.preventDefault();
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        let { date, products } = values;
        products = products.filter(product => product.name);
        products.forEach(product => {
          product.nameplate = false;
          product.certificate = false;
          product.pressure = '1.0';
        });
        // 下单日期
        const orderAt = date[0].format('YYYY-MM-DD');
        // 到货日期
        const arrivalAt = date[1].format('YYYY-MM-DD');
        // 提交到数据库的单个产品信息
        const order = {
          ...values,
          date: { orderAt, arrivalAt },
          products,
        };
        console.table('订单信息：', order);
        // api
        firebase
          .createOrder(order)
          .then(() => message.success('订单创建成功', 0.5))
          .catch(error => message.error(error.message));
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      offset: 2,
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: { offset: 4, span: 18 },
  };

  return (
    <Form onSubmit={onSubmit} {...formItemLayout}>
      <Form.Item label="销售客户" wrapperCol={{ span: 8 }}>
        {getFieldDecorator('consumer', {
          rules: [
            {
              required: true,
              message: '请输入销售客户',
            },
            {
              whitespace: true,
              message: '销售客户不能为空白字符',
            },
          ],
        })(<Input autoFocus allowClear />)}
      </Form.Item>
      <Form.Item label="货期" wrapperCol={{ span: 8 }}>
        {getFieldDecorator('date', {
          rules: [
            {
              required: true,
              message: '请输入货期',
            },
          ],
        })(<RangePicker style={{ width: '100%' }} />)}
      </Form.Item>
      <Row gutter={10} className={styles.productRow}>
        <Col span={8} className={styles.productCol}>
          <Form.Item label="产品型号">
            {getFieldDecorator('products[0].name', {
              rules: [
                {
                  required: true,
                  message: '请输入产品型号',
                },
                {
                  whitespace: true,
                  message: '产品型号不能为空',
                },
              ],
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label="材质">
            {getFieldDecorator('products[0].material', {
              initialValue: '304',
              rules: [
                {
                  required: true,
                  message: '请指定材质',
                },
              ],
            })(
              <Select>
                <Select.Option value="304">304</Select.Option>
                <Select.Option value="碳钢">碳钢</Select.Option>
                <Select.Option value="外壳碳钢 芯体304">
                  外壳碳钢 芯体304
                </Select.Option>
                <Select.Option value="316L">316L</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="数量">
            {getFieldDecorator('products[0].quantity', {
              rules: [
                {
                  required: true,
                  message: '请输入产品数量',
                },
              ],
              initialValue: 1,
            })(<InputNumber min={1} max={99} />)}
          </Form.Item>
          <Form.Item label="重量 kg">
            {getFieldDecorator('products[0].weight', {
              initialValue: 50,
            })(
              <Radio.Group>
                <Radio.Button value={8}>{8}</Radio.Button>
                <Radio.Button value={15}>{15}</Radio.Button>
                <Radio.Button value={50}>{50}</Radio.Button>
                <Radio.Button value={200}>{200}</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="流量 t/h">
            {getFieldDecorator('products[0].flow', {
              initialValue: 20,
            })(<InputNumber min={1} max={2000} step={10} />)}
          </Form.Item>
          <Form.Item label="进水温度 °C">
            {getFieldDecorator('products[0].heatFrom', {
              initialValue: 5,
            })(<InputNumber min={1} max={160} />)}
          </Form.Item>
          <Form.Item label="出水温度 °C">
            {getFieldDecorator('products[0].heatTo', {
              initialValue: 65,
            })(<InputNumber min={1} max={200} />)}
          </Form.Item>
          <Form.Item label="法兰标准">
            {getFieldDecorator('products[0].flangeStandard', {
              initialValue: 'GB/T 9119-2000',
            })(
              <Select>
                <Select.Option value="GB/T 9119-2000">
                  GB/T 9119-2000
                </Select.Option>
                <Select.Option value="HG/T 20592-2009">
                  HG/T 20592-2009
                </Select.Option>
                <Select.Option value="GB/T 9119-2010">
                  GB/T 9119-2010
                </Select.Option>
                <Select.Option value="HG/T 20615-2009">
                  HG/T 20615-2009
                </Select.Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8} className={styles.productCol}>
          <Form.Item label="产品型号">
            {getFieldDecorator('products[1].name', {
              rules: [
                {
                  whitespace: true,
                  message: '产品型号不能为空白字符',
                },
              ],
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label="材质">
            {getFieldDecorator('products[1].material', {
              initialValue: '304',
            })(
              <Select>
                <Select.Option value="304">304</Select.Option>
                <Select.Option value="碳钢">碳钢</Select.Option>
                <Select.Option value="外壳碳钢 芯体304">
                  外壳碳钢 芯体304
                </Select.Option>
                <Select.Option value="316L">316L</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="数量">
            {getFieldDecorator('products[1].quantity', {
              initialValue: 1,
            })(<InputNumber min={1} max={99} />)}
          </Form.Item>
          <Form.Item label="重量 kg">
            {getFieldDecorator('products[1].weight', {
              initialValue: 50,
            })(
              <Radio.Group>
                <Radio.Button value={8}>{8}</Radio.Button>
                <Radio.Button value={15}>{15}</Radio.Button>
                <Radio.Button value={50}>{50}</Radio.Button>
                <Radio.Button value={200}>{200}</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="流量 t/h">
            {getFieldDecorator('products[1].flow', {
              initialValue: 20,
            })(<InputNumber min={1} max={2000} step={10} />)}
          </Form.Item>
          <Form.Item label="进水温度 °C">
            {getFieldDecorator('products[1].heatFrom', {
              initialValue: 5,
            })(<InputNumber min={1} max={160} />)}
          </Form.Item>
          <Form.Item label="出水温度 °C">
            {getFieldDecorator('products[1].heatTo', {
              initialValue: 65,
            })(<InputNumber min={1} max={200} />)}
          </Form.Item>
          <Form.Item label="法兰标准">
            {getFieldDecorator('products[1].flangeStandard', {
              initialValue: 'GB/T 9119-2000',
            })(
              <Select>
                <Select.Option value="GB/T 9119-2000">
                  GB/T 9119-2000
                </Select.Option>
                <Select.Option value="HG/T 20592-2009">
                  HG/T 20592-2009
                </Select.Option>
                <Select.Option value="GB/T 9119-2010">
                  GB/T 9119-2000
                </Select.Option>
                <Select.Option value="HG/T 20615-2009">
                  HG/T 20615-2009
                </Select.Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8} className={styles.productCol}>
          <Form.Item label="产品型号">
            {getFieldDecorator('products[2].name', {
              rules: [
                {
                  whitespace: true,
                  message: '产品型号不能为空白字符',
                },
              ],
            })(<Input allowClear />)}
          </Form.Item>
          <Form.Item label="材质">
            {getFieldDecorator('products[2].material', {
              initialValue: '304',
            })(
              <Select>
                <Select.Option value="304">304</Select.Option>
                <Select.Option value="碳钢">碳钢</Select.Option>
                <Select.Option value="外壳碳钢 芯体304">
                  外壳碳钢 芯体304
                </Select.Option>
                <Select.Option value="316L">316L</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="数量">
            {getFieldDecorator('products[2].quantity', {
              initialValue: 1,
            })(<InputNumber min={1} max={99} />)}
          </Form.Item>
          <Form.Item label="重量 kg">
            {getFieldDecorator('products[2].weight', {
              initialValue: 50,
            })(
              <Radio.Group>
                <Radio.Button value={8}>{8}</Radio.Button>
                <Radio.Button value={15}>{15}</Radio.Button>
                <Radio.Button value={50}>{50}</Radio.Button>
                <Radio.Button value={200}>{200}</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="流量 t/h">
            {getFieldDecorator('products[2].flow', {
              initialValue: 20,
            })(<InputNumber min={1} max={2000} step={10} />)}
          </Form.Item>
          <Form.Item label="进水温度 °C">
            {getFieldDecorator('products[2].heatFrom', {
              initialValue: 5,
            })(<InputNumber min={1} max={160} />)}
          </Form.Item>
          <Form.Item label="出水温度 °C">
            {getFieldDecorator('products[2].heatTo', {
              initialValue: 65,
            })(<InputNumber min={1} max={200} />)}
          </Form.Item>
          <Form.Item label="法兰标准">
            {getFieldDecorator('products[2].flangeStandard', {
              initialValue: 'GB/T 9119-2000',
            })(
              <Select>
                <Select.Option value="GB/T 9119-2000">
                  GB/T 9119-2000
                </Select.Option>
                <Select.Option value="HG/T 20592-2009">
                  HG/T 20592-2009
                </Select.Option>
                <Select.Option value="GB/T 9119-2010">
                  GB/T 9119-2000
                </Select.Option>
                <Select.Option value="HG/T 20615-2009">
                  HG/T 20615-2009
                </Select.Option>
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

const CreateOrderForm = Form.create({ name: 'create_order' })(
  CreateOrderFormBase
);

export default CreateOrderForm;
