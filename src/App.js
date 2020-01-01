import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Result } from 'antd';
import useAuth from './hooks/useAuth';

import LoginForm from './components/signIn';
import WorkFlowPage from './pages/work/flow';
import JrqProduct from './pages/work/jrq';
import WkProduct from './pages/work/wk';
import WorkPage from './pages/work/order';
import MyPage from './pages/my';
import Todo from './pages/todo';
import FamilyPage from './pages/family';
import ProductPage from './pages/work/order/product';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const auth = useAuth();

  return (
    <Router>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['order-table']}
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
                <Link to="/work/flow">
                  <Icon type="table" />
                  工作流
                </Link>
              </Menu.Item>
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
            <Menu.Item key="todos">
              <Link to="/todos">
                <Icon type="home" />
                todos
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#fff',
              padding: '0 10px',
              margin: '0 10px',
            }}
          >
            <LoginForm />
          </Header>
          <Content style={{ margin: '10px 10px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff' }}>
              {auth ? (
                <Switch>
                  <Route path="/work/flow" exact>
                    <WorkFlowPage />
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
                  <Route path="/work" exact>
                    <WorkPage />
                  </Route>
                  <Route path="/my">
                    <MyPage />
                  </Route>
                  <Route path="/todos">
                    <Todo />
                  </Route>
                  <Route path="/family">
                    <FamilyPage />
                  </Route>
                  <Route path="/product/:id" children={<ProductPage />} />
                  <Route path="/" exact>
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
