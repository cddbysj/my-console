import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon, Button } from "antd";
import "./App.css";
import LoginForm from "./components/signIn";
import WorkPage from "./pages/work";
import MyPage from "./pages/my";
import FamilyPage from "./pages/family";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  return (
    <Router>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <SubMenu
              key="work"
              title={
                <Link to="/work">
                  <Icon type="windows" />
                  工作
                </Link>
              }
            >
              <Menu.ItemGroup key="order" title="订单管理">
                <Menu.Item key="order-table">订单列表</Menu.Item>
                <Menu.Item key="create-order">新建订单</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="product" title="产品文档">
                <Menu.Item key="jrq">加热器</Menu.Item>
                <Menu.Item key="wk">温控</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="my">
              <Link to="/my">
                <Icon type="project" />
                个人事务
              </Link>
            </Menu.Item>
            <Menu.Item key="family">
              <Link to="/family">
                <Icon type="home" />家
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: "#fff", padding: 0 }}>
            <LoginForm />
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              style={{ padding: 24, background: "#fff" }}
            >
              <Switch>
                <Route path="/work">
                  <WorkPage />
                </Route>
                <Route path="/my">
                  <MyPage />
                </Route>
                <Route path="/family">
                  <FamilyPage />
                </Route>
                <Route path="/">
                  <WorkPage />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
