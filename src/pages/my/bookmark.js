// ** 个人网址导航，相当于在视觉上扁平展示的书签 ** //

import React from "react";
import { Layout, Menu, Icon, Card, Avatar, Row, Col } from "antd";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import styles from "./bookmark.module.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// metro color
const metroColors = [
  '#b51921',
  '#b2103e',
  '#c41832',
   '#ef342a',
   '#a84d18',
  '#f68f26',
   '#faca07',
  '#07594a',
   '#4ba946',
   '#5fc0a7',
   '#0376c2',
   '#c41832',
   '#c41832',
  '#be3223',
   '#f45f7c',
   '#d16f20',
   '#ffd00d',
   '#076750',
   '#7abf45',
   '#75c7b9',
   '#29409a',
   '#ee1e4f',
   '#d2174a',
   '#f79d8b',
   '#ce7020',
  '#e9a519',
   '#fddf55',
   '#076a66',
  '#a7c299',
   '#098ec4',
   '#89d2e3',
   '#7572a7',
   '#f7b1bf',
   '#f67e2a',
   '#f57125',
   '#fbaf37',
   '#fde14e',
   '#076c53',
   '#b2d68c',
   '#8fd1cd',
   '#0798c7',
   '#9597ca',
   '#69686d',
   '#f47a25',
   '#fcba5d',
   '#f8d29d',
   '#ffe285',
   '#077e7a',
   '#d0e4a9',
   '#81cdc1',
   '#22b6ed',
   '#b4d6f2',
   '#c077af',
   '#bbbfc2',
   '#fed7a6',
   '#fcae62',
   '#ffe901',
   '#078e82',
   '#d7df3f',
   '#89d3de',
   '#22b6ed',
   '#b295c5',
   '#c5c4c9',
   '#d1d5d8',
   '#f2f1f6',
   '#efe946',
   '#fff455',
   '#ffe901',
   '#4c7020',
   '#c4e0e1',
   '#79bce7',
   '#b7e1fa',
   '#c7a7d2',
   '#e5e4e9',
   '#f2f1f6',
   '#f2f2f6',
   '#1fb27f',
   '#b5a87f',
   '#07b195',
   '#d7df3f',
   '#6dade2',
   '#4dc7ec',
   '#a8b7d8',
   '#b8a1a9',
   '#f8c9cb',
  '#f2f1f6',
]
 

const RandomAvatar = ({ name }) => {
  const h = (360 * Math.random()).toFixed(0);
  const s = (100 * Math.random()).toFixed(0);
  const l = (100 * Math.random()).toFixed(0);

  const randomColor = `hsl(${h},${s}%,${l}%)`;

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
    name: "Fireball",
    description: "德国匿名搜索引擎",
    url: "https://fireball.com/",
    category: "searchEngine"
  },
  {
    name: "Peekier",
    description: "自带搜索结果预览",
    url: "https://peekier.com/",
    category: "searchEngine"
  },
  {
    name: "DuckDuckGo",
    description: "一款不追踪你的搜索引擎",
    url: "https://duckduckgo.com/",
    category: "searchEngine"
  },
  {
    name: "WebCrawler",
    description: "元搜索引擎",
    url: "http://www.webcrawler.com/",
    category: "searchEngine"
  },
  {
    name: "Qwant",
    description: "法国隐私且中立的搜索引擎",
    url: "https://www.qwant.com/",
    category: "searchEngine"
  },
  {
    name: "Google",
    description: "全球最大的搜索引擎",
    url: "https://www.google.com/",
    category: "searchEngine"
  }
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
  return (
    <div style={{ background: "#fff" }}>
      <Layout style={{ marginRight: 200 }}>
        style={{ background: "#fff", padding: 0 }} />
        <Content>
          <div style={{ padding: 24 }}>
            <section id="content-1">
              <p>
                <Icon type="tag" />
                这是第1部分内容
              </p>
              <Row gutter={[16, 16]} type="flex">
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
                    <Card>
                      <Card.Meta
                        title={site.name}
                        description={site.description}
                        avatar={<RandomAvatar name={site.name} />}
                      />
                    </Card>
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
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          right: 0,
          top: 0
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">
              <a ref="#content-1">content 1</a>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">
              <a ref="#content-2">content 2</a>
            </span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">nav 3</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="bar-chart" />
            <span className="nav-text">nav 4</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="cloud-o" />
            <span className="nav-text">nav 5</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="appstore-o" />
            <span className="nav-text">nav 6</span>
          </Menu.Item>
          <Menu.Item key="7">
            <Icon type="team" />
            <span className="nav-text">nav 7</span>
          </Menu.Item>
          <Menu.Item key="8">
            <Icon type="shop" />
            <span className="nav-text">nav 8</span>
          </Menu.Item>
        </Menu>
      </Sider>
      </div>
    </Layout>
  );
};

export default BookmarkPage;
