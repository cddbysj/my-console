import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon, Result, Spin } from "antd";
import useAuth from "./hooks/useAuth";

import LoginForm from "./components/signIn";
import WorkStep from "./components/workStep";
import CreateOrderForm from "./pages/work/order/createOrderForm";
import WorkPage from "./pages/work/order";
import CertificatePage from "./pages/work/order/certificate";
import * as ROUTES from "constants/routes";

const { Header, Content, Sider } = Layout;

// 懒加载以下组件
const BusinessInfo = lazy(() => import("./pages/work/businessInfo"));
const WkProduct = lazy(() => import("./pages/work/wk"));
const MyPage = lazy(() => import("./pages/my"));
const CertificatesManagePage = lazy(() =>
  import("./pages/work/order/certificatesManage")
);
const JrqProduct = lazy(() => import("./pages/work/jrq"));
const ContractPage = lazy(() => import("./pages/work/order/contract"));
const OrderDetailPage = lazy(() => import("./pages/work/order/orderDetail"));
const OrderSpecPage = lazy(() => import("./pages/work/order/orderSpec"));

function App() {
  const auth = useAuth();

  return (
    <Router basename="/my-console">
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
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["order-table"]}
            >
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
              <Menu.Item key="businessInfo">
                <Link to={ROUTES.WORK_BUSINESS_INFO}>
                  <Icon type="contacts" />
                  商务信息
                </Link>
              </Menu.Item>
              <Menu.Item key="my">
                <Link to={ROUTES.MY_PAGE}>
                  <Icon type="project" />
                  个人事务
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
        ) : null}
        <Layout id="main">
          <Header className={["header", "noPrint"]}>
            {auth ? <WorkStep /> : null}
            <LoginForm />
          </Header>
          <Content style={{ margin: "12px 12px 0" }}>
            <div style={{ padding: 24, background: "#fff" }}>
              <Suspense
                fallback={
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: 32,
                      margin: "20px 0",
                      padding: "30vh 0"
                    }}
                  >
                    <Spin />
                  </div>
                }
              >
                {auth ? (
                  <Switch>
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
                    <Route path={ROUTES.MY_PAGE}>
                      <MyPage />
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
                    <Route path={ROUTES.WORK_BUSINESS_INFO} exact>
                      <BusinessInfo />
                    </Route>
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
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
