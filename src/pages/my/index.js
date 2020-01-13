import React from "react";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import { Menu, Icon } from "antd";

import BookmarkPage from "./bookmark";

const { SubMenu } = Menu;

const My = props => {
  const { path, url } = useRouteMatch();
  return (
    <div>
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
        <SubMenu
          title={
            <span>
              <Icon type="" />
              博客
            </span>
          }
        >
          <Menu.Item key="blog:1">
            <Link to="https://cddbysj.github.io/">Bill's Note</Link>
          </Menu.Item>
          <Menu.Item key="blog:2">
            <Link to="http://www.ruanyifeng.com/blog/">阮一峰的网络日志</Link>
          </Menu.Item>
          <Menu.Item key="blog:3">
            <Link to="https://overreacted.io/">
              Personal blog by Dan Abramov.
            </Link>
          </Menu.Item>
          <Menu.Item key="blog:4">Bill's Note</Menu.Item>
          <Menu.Item key="blog:5">Bill's Note</Menu.Item>
          <Menu.Item key="blog:6">Bill's Note</Menu.Item>
          <Menu.Item key="blog:7">Bill's Note</Menu.Item>
        </SubMenu>
      </Menu>
      <ul>
        <li>
          <Link to={`${url}/bookmark`}>书签</Link>
        </li>
        <li>
          <Link to={`${url}/movie`}>影视</Link>
        </li>
        <li>
          <Link to={`${url}/music`}>音乐</Link>
        </li>
        <li>
          <Link to={`${url}/book`}>书籍</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${path}/bookmark`}>
          <BookmarkPage />
        </Route>
      </Switch>
    </div>
  );
};

export default My;
