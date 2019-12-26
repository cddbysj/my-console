import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import "./App.css";
import LoginForm from "./components/signIn";
import WorkPage from "./pages/work";
import JrqProduct from "./pages/work/jrq";
import WkProduct from "./pages/work/wk";
import MyPage from "./pages/my";
import FamilyPage from "./pages/family";
import NameplatePage from "./pages/work/nameplate";

const { Header, Content, Sider } = Layout;
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
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["order-table"]}
          >
            <SubMenu
              key="work"
              title={
                <Link to="/work">
                  <Icon type="windows" />
                  工作
                </Link>
              }
            >
              <Menu.Item key="order-table">
                <Link to="/work/orders">
                  <Icon type="table" />
                  订单
                </Link>
              </Menu.Item>
              <Menu.Item key="jrq">
                <Link to="/work/jrq">
                  <Icon type="file" />
                  加热器
                </Link>
              </Menu.Item>
              <Menu.Item key="wk">
                <Link to="/work/wk">
                  <Icon type="file" />
                  温控
                </Link>
              </Menu.Item>
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
          <Header
            style={{ background: "#fff", padding: "0 10px", margin: "0 10px" }}
          >
            <LoginForm />
          </Header>
          <Content style={{ margin: "10px 10px 0", overflow: "initial" }}>
            <div style={{ padding: 24, background: "#fff" }}>
              <Switch>
                <Route path="/work" exact>
                  <WorkPage />
                </Route>
                <Route path="/work/orders" exact>
                  <WorkPage />
                </Route>
                <Route path="/work/jrq" exact>
                  <JrqProduct />
                </Route>
                <Route path="/work/wk" exact>
                  <WkProduct />
                </Route>
                <Route path="/my">
                  <MyPage />
                </Route>
                <Route path="/family">
                  <FamilyPage />
                </Route>
                <Route path="/nameplate/:id" children={<NameplatePage />} />
                <Route path="/">
                  <WorkPage />
                </Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
