import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon, Result } from "antd";
import useAuth from "./hooks/useAuth";

import LoginForm from "./components/signIn";
import WorkFlowPage from "./pages/work/flow";
import CreateOrderForm from "./pages/work/order/createOrderForm";
import JrqProduct from "./pages/work/jrq";
import WkProduct from "./pages/work/wk";
import WorkPage from "./pages/work/order";
import MyPage from "./pages/my";
import FamilyPage from "./pages/family";
import OrderDetailPage from "./pages/work/order/orderDetail";
import ContractPage from "./pages/work/order/contract";
import OrderSpecPage from "./pages/work/order/orderSpec";
import CertificatePage from "./pages/work/order/certificate";
import CertificatesManagePage from "./pages/work/order/certificatesManage";
import * as ROUTES from "constants/routes";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const auth = useAuth();

  return (
    <Router>
      <Layout>
        {auth ? (
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
                <Menu.Item key="work-flow">
                  <Link to={ROUTES.WORK_FLOW}>
                    <Icon type="rocket" />
                    工作流
                  </Link>
                </Menu.Item>
                <Menu.Item key="create-order">
                  <Link to={ROUTES.CREATE_ORDER}>
                    <Icon type="file-add" />
                    新建订单
                  </Link>
                </Menu.Item>
                <Menu.Item key="order-table">
                  <Link to={ROUTES.WORK_ORDERS}>
                    <Icon type="table" />
                    订单
                  </Link>
                </Menu.Item>
                <Menu.Item key="certificates">
                  <Link to={ROUTES.WORK_CERTIFICATES}>
                    <Icon type="file-image" />
                    合格证
                  </Link>
                </Menu.Item>
                <Menu.Item key="jrq">
                  <Link to={ROUTES.WORK_JRQ}>
                    <Icon type="file" />
                    加热器
                  </Link>
                </Menu.Item>
                <Menu.Item key="wk">
                  <Link to={ROUTES.WORK_WK}>
                    <Icon type="file" />
                    温控
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="my">
                <Link to={ROUTES.MY_PAGE}>
                  <Icon type="project" />
                  个人事务
                </Link>
              </Menu.Item>
              <Menu.Item key="family">
                <Link to={ROUTES.FAMILY_PAGE}>
                  <Icon type="home" />家
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
        ) : null}
        <Layout id="main">
          <Header className={["header", "noPrint"]}>
            <LoginForm />
          </Header>
          <Content style={{ margin: "10px 10px 0" }}>
            <div style={{ padding: 24, background: "#fff" }}>
              {auth ? (
                <Switch>
                  <Route path={ROUTES.WORK_FLOW} exact>
                    <WorkFlowPage />
                  </Route>
                  <Route path={ROUTES.CREATE_ORDER} exact>
                    <CreateOrderForm />
                  </Route>
                  <Route path={ROUTES.WORK_ORDERS} exact>
                    <WorkPage />
                  </Route>
                  <Route path={ROUTES.WORK_CERTIFICATES} exact>
                    <CertificatesManagePage />
                  </Route>
                  <Route path={ROUTES.WORK_JRQ} exact>
                    <JrqProduct />
                  </Route>
                  <Route path={ROUTES.WORK_WK} exact>
                    <WkProduct />
                  </Route>
                  <Route path="/work" exact>
                    <WorkPage />
                  </Route>
                  <Route path={ROUTES.MY_PAGE}>
                    <MyPage />
                  </Route>
                  <Route path={ROUTES.FAMILY_PAGE}>
                    <FamilyPage />
                  </Route>
                  <Route
                    path={ROUTES.ORDER_DETAIL}
                    children={<OrderDetailPage />}
                    exact
                  />
                  <Route
                    path={`${ROUTES.ORDER_CONTRACT}/:id`}
                    children={<ContractPage />}
                    exact
                  />
                  <Route
                    path={`${ROUTES.CERTIFICATE_PAGE}/:id`}
                    children={<CertificatePage />}
                    exact
                  />
                  <Route
                    path={`${ROUTES.ORDER_SPEC}/:id`}
                    children={<OrderSpecPage />}
                    exact
                  />
                  <Route path={ROUTES.HOME_PAGE} exact>
                    <WorkPage />
                  </Route>
                  <Route path="*">
                    <Result
                      status="404"
                      title="404"
                      subTitle="抱歉，您访问的页面不存在"
                    />
                  </Route>
                </Switch>
              ) : (
                <Result
                  status="403"
                  title="403"
                  subTitle="抱歉，您没有权限访问该页面"
                />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
