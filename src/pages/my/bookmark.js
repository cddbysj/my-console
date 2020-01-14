// ** 个人网址导航，相当于在视觉上扁平展示的书签 ** //

import React from 'react';
import { Layout, Menu, Icon, Card, Avatar, Row, Col } from 'antd';
import {
  Route,
  Switch,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import styles from './bookmark.module.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const palette = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#7f8c8d',
  '#bdc3c7',
];

const RandomAvatar = ({ name }) => {
  const index = Math.floor(palette.length * Math.random());
  const randomColor = palette[index];
  console.log(randomColor);

  return (
    <div
      className={styles.randomAvatar}
      style={{ backgroundColor: randomColor }}
    >
      {name.slice(0, 1)}
    </div>
  );
};

// 个人网址导航
const sites = [
  {
    name: 'Fireball',
    description: '德国匿名搜索引擎',
    url: 'https://fireball.com/',
    category: 'searchEngine',
  },
  {
    name: 'Peekier',
    description: '自带搜索结果预览',
    url: 'https://peekier.com/',
    category: 'searchEngine',
  },
  {
    name: 'DuckDuckGo',
    description: '一款不追踪你的搜索引擎',
    url: 'https://duckduckgo.com/',
    category: 'searchEngine',
  },
  {
    name: 'WebCrawler',
    description: '元搜索引擎',
    url: 'http://www.webcrawler.com/',
    category: 'searchEngine',
  },
  {
    name: 'Qwant',
    description: '法国隐私且中立的搜索引擎',
    url: 'https://www.qwant.com/',
    category: 'searchEngine',
  },
  {
    name: 'Google',
    description: '全球最大的搜索引擎',
    url: 'https://www.google.com/',
    category: 'searchEngine',
  },
];

const menu = (
  <Menu mode="horizontal">
    <Menu.Item key="mail">
      <Icon type="book" />
      书签
    </Menu.Item>
    <SubMenu
      title={
        <span>
          <Icon type="read" />
          在线电子书
        </span>
      }
    >
      <Menu.ItemGroup title="软件开发">
        <Menu.Item key="dev:0">
          <a
            href="https://github.com/getify/You-Dont-Know-JS"
            target="_blank"
            rel="noopener noreferrer"
          >
            You Dont Know JS
          </a>
        </Menu.Item>
        <Menu.Item key="dev:1">
          <a
            href="https://javascript.info/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Modern JavaScript Tutorial
          </a>
        </Menu.Item>
        <Menu.Item key="dev:2">
          <a
            href="https://eloquentjavascript.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eloquent JavaScript
          </a>
        </Menu.Item>
        <Menu.Item key="dev:3">
          <a
            href="https://es6.ruanyifeng.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ECMAScript 6 入门教程
          </a>
        </Menu.Item>
        <Menu.Item key="dev:4">
          <a
            href="http://huziketang.mangojuice.top/books/react/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React.js 小书
          </a>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="其他">
        <Menu.Item key="others:1">如何阅读一本书</Menu.Item>
        <Menu.Item key="others:2">汽车是怎样跑起来的</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
    <SubMenu title={<span>博客</span>}>
      <Menu.Item key="blog:1">
        <Link to="https://cddbysj.github.io/">Bill's Note</Link>
      </Menu.Item>
      <Menu.Item key="blog:2">
        <Link to="http://www.ruanyifeng.com/blog/">阮一峰的网络日志</Link>
      </Menu.Item>
      <Menu.Item key="blog:3">
        <Link to="https://overreacted.io/">Personal blog by Dan Abramov.</Link>
      </Menu.Item>
    </SubMenu>
  </Menu>
);

const BookmarkPage = props => {
  const history = useHistory();

  return (
    <Layout style={{ background: '#fff' }}>
      <Layout style={{ marginRight: 200 }}>
        <Content>
          <div style={{ padding: 24 }}>
            <section id="content-1">
              <p>
                <Icon type="tag" />
                这是第1部分内容
              </p>
              <Row gutter={[16, 16]} type="flex">
                <Col span={6}>
                  <Card hoverable>
                    <Card.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Fireball"
                      description="德国匿名搜索引擎"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Fireball"
                      description="德国匿名搜索引擎"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Fireball"
                      description="德国匿名搜索引擎"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Fireball"
                      description="德国匿名搜索引擎"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Fireball"
                      description="德国匿名搜索引擎"
                    />
                  </Card>
                </Col>
              </Row>
            </section>
            <section id="content-2">
              <p>
                <Icon type="tag" />
                这是第2部分内容
              </p>
              <Row gutter={16} type="flex">
                <Col span={6}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Fireball"
                      description="德国匿名搜索引擎"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Fireball"
                      description="德国匿名搜索引擎"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Fireball"
                      description="德国匿名搜索引擎"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Fireball"
                      description="德国匿名搜索引擎"
                    />
                  </Card>
                </Col>
              </Row>
            </section>
            <section id="content-3">
              <p>
                <Icon type="tag" />
                这是第3部分内容
              </p>
              <Row gutter={[16, 16]} type="flex">
                {sites.map(site => (
                  <Col span={6} key={site.name}>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Card hoverable>
                        <Card.Meta
                          title={site.name}
                          description={site.description}
                          avatar={<RandomAvatar name={site.name} />}
                        />
                      </Card>
                    </a>
                  </Col>
                ))}
              </Row>
            </section>
            <section id="content-3">这是第4部分内容</section>
          </div>
        </Content>
      </Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">
              1{/* <a ref="#content-1">content 1</a> */}
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">
              2{/* <a ref="#content-2">content 2</a> */}
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default BookmarkPage;
