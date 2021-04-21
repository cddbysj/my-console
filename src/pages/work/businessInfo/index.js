// ** 所有商务信息展示页面 ** //
import React from 'react';
import { Row, Col, Descriptions, Table, Typography } from 'antd';

const { Column } = Table;

const staffContactInfo = [
  {
    name: '黄工',
    job: '商务接待',
    mobileNumber: '18075120027',
    QQ: '1337936315',
  },
  {
    name: '符工',
    job: '商务接待',
    mobileNumber: '18975857426',
    QQ: '1341634238',
  },
  {
    name: '吴工',
    job: '商务接待',
    mobileNumber: '18975857906',
    QQ: '1252060284',
  },
  {
    name: '谭工',
    job: '商务接待',
    mobileNumber: '18975857506',
    QQ: '1963690956',
  },
  {
    name: '范工',
    job: '技术支持',
    mobileNumber: '19973103557',
    QQ: '379727135',
  },
  {
    name: '刘工',
    job: '技术支持',
    mobileNumber: '18075122270',
    QQ: '1484612133',
  },
  {
    name: '文工',
    job: '技术支持',
    mobileNumber: '19973102062',
    QQ: '1936730112',
  },
  {
    name: '金会计',
    job: '财务专员',
    mobileNumber: '15084987438',
    QQ: '531916050',
  },
];

// 身份证信息
const ids = [
  {
    name: '金艳萍',
    ethnicity: '汉', // 民族
    birth: '1969-2-14',
    address: '长沙市雨花区涂家冲一组1栋802房',
    number: '430122196902144021',
  },
  {
    name: '黄苍松',
    ethnicity: '汉',
    birth: '1982-1-1',
    address: '湖南省安化县大福镇大尧村第九村民组99号',
    number: '430923198201012033',
  },
  {
    name: '范锡明',
    ethnicity: '汉',
    birth: '1966-9-23',
    address: '长沙市雨花区涂家冲一组1栋802房',
    number: '430103196609231135',
  },
  {
    name: '易桂香',
    ethnicity: '汉',
    birth: '1963-10-1',
    address: '长沙市天心区天剑一村12栋301室',
    number: '430103196310012042',
  },
  {
    name: '赵建武',
    ethnicity: '汉',
    birth: '1979-11-29',
    address: '长沙市岳麓区五星村桃园冲组',
    number: '430111197911295636',
  },
  {
    name: '曹建国',
    ethnicity: '汉',
    birth: '1971-4-5',
    address: '望城县雷锋镇坪山村彭家湾组40号',
    number: '430122197104055213',
  },
  {
    name: '石弘',
    ethnicity: '汉',
    birth: '1977-7-20',
    address: '长沙市芙蓉区远大二路734号宿舍',
    number: '43011119770720002X',
  },
  {
    name: '王燕',
    ethnicity: '汉',
    birth: '1980-1-22',
    address: '长沙市芙蓉区韶山北路22号16栋302室',
    number: '430102198012223725',
  },
  {
    name: '谭志平',
    ethnicity: '汉',
    birth: '1985-2-6',
    address: '益阳市欧江岔镇大闸村二组',
    number: '430903198502063648',
  },
  {
    name: '王浩',
    ethnicity: '汉',
    birth: '1989-8-14',
    address: '湖南省桃源县漆河镇松林岗村第五组',
    number: '430725198908142511',
  },
  {
    name: '孙桂华',
    ethnicity: '汉',
    birth: '1988-11-3',
    address: '浏阳市淮川镇龙头组',
    number: '430181198811030052',
  },
];

const BusinessInfo = (props) => {
  return (
    <div>
      <Row gutter={[64, 64]}>
        <Col span={12}>
          <Descriptions title="基本信息" column={1}>
            <Descriptions.Item label="地址">
              中国湖南省长沙市迎宾路 235 号
            </Descriptions.Item>
            <Descriptions.Item label="邮编">410011</Descriptions.Item>
            <Descriptions.Item label="电话">
              0731-88808844 / 85529796
            </Descriptions.Item>
            <Descriptions.Item label="电子邮箱">
              semem99@163.com
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions title="公司帐户转帐" column={1}>
            <Descriptions.Item label="公司全称">
              湖南西门机电科技有限公司
            </Descriptions.Item>
            <Descriptions.Item label="开户银行">
              中国银行-长沙市岳麓支行
            </Descriptions.Item>
            <Descriptions.Item label="行号">1045 5100 4522</Descriptions.Item>
            <Descriptions.Item label="账号">5846 5735 1167</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row gutter={[64, 64]}>
        <Col span={12}>
          <Descriptions title="发票信息" column={1}>
            <Descriptions.Item label="名称">
              湖南西门机电科技有限公司
            </Descriptions.Item>
            <Descriptions.Item label="税号">
              9143 0105 7072 1011 69
            </Descriptions.Item>
            <Descriptions.Item label="地址">
              长沙市开福区迎宾路 235 号
            </Descriptions.Item>
            <Descriptions.Item label="电话">0731-88808844</Descriptions.Item>
            <Descriptions.Item label="开户银行">
              中行长沙市岳麓支行
            </Descriptions.Item>
            <Descriptions.Item label="账号">5846 5735 1167</Descriptions.Item>
            <Descriptions.Item label="24 小时服务热线">
              400-018-1846
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions title="个人帐户转帐" column={1}>
            <Descriptions.Item label="姓名">金*萍</Descriptions.Item>
            <Descriptions.Item label="开户银行">
              中国建设银行-长沙桐梓坡路支行
            </Descriptions.Item>
            <Descriptions.Item label="行号">1055 5100 7023</Descriptions.Item>
            <Descriptions.Item label="卡号">
              6217 0029 2015 1387 496
            </Descriptions.Item>
            <Descriptions.Item label="支付宝转帐">
              ：cssfxm@sina.com（西门**）
            </Descriptions.Item>
            <Descriptions.Item label="微信号转帐">
              semem01（西门**）
            </Descriptions.Item>
            <Descriptions.Item label="备注">
              当您选择个人帐户转帐方式时，请务必备注付款人单位名称、或采购人姓名。
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row gutter={[64, 64]}>
        <Col span={12}>
          <Descriptions title="销售电话" column={1}>
            <Descriptions.Item label="销售一部">
              0731-85218418
            </Descriptions.Item>
            <Descriptions.Item label="销售二部">
              0731-85521418
            </Descriptions.Item>
            <Descriptions.Item label="销售三部">
              0731-85529798
            </Descriptions.Item>
            <Descriptions.Item label="传真">0731-88801666</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions
            title="办公账号信息"
            layout="vertical"
            bordered={true}
            column={1}
          >
            <Descriptions.Item label="百度商桥">
              用户名：(竞网 CS 西门 120302：yu) 括号内的全部
              <br />
              密码： sm88808844
            </Descriptions.Item>
            <Descriptions.Item label="XTools CRM">
              用户名： weng
              <br />
              公司：西门机电
              <br />
              密码： semem0019
            </Descriptions.Item>
            <Descriptions.Item label="西门网站后台">
              用户名：wen
              <br />
              密码：sm88808844
            </Descriptions.Item>
            <Descriptions.Item label="工作 QQ">
              用户名：1936730112
              <br />
              密码：sm88808844
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row gutter={[64, 64]}>
        <Col>
          <Table
            title={() => <Typography.Title level={4}>身份证</Typography.Title>}
            dataSource={ids}
            rowKey={(record) => record.number}
            pagination={false}
          >
            <Column title="姓名" dataIndex="name" />
            <Column title="民族" dataIndex="ethnicity" />
            <Column title="出生" dataIndex="birth" />
            <Column title="住址" dataIndex="address" />
            <Column title="号码" dataIndex="number" />
          </Table>
        </Col>
      </Row>
      <Row gutter={[64, 64]}>
        <Col span={24}>
          <Table
            title={() => (
              <Typography.Title level={4}>客服人员联系方式</Typography.Title>
            )}
            dataSource={staffContactInfo}
            rowKey={(record) => record.QQ}
            pagination={false}
          >
            <Column title="人员" dataIndex="name" />
            <Column title="职责" dataIndex="job" />
            <Column title="手机号码" dataIndex="mobileNumber" />
            <Column title="QQ" dataIndex="QQ" />
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default BusinessInfo;
