// ** 个人网址导航，相当于在视觉上扁平展示的书签 ** //

import React, { useState, useEffect } from "react";
import { Layout, Icon, Card, Row, Col, Spin } from "antd";
import firebase from "api/firebase";
import CreateBookmark from "./createBookmark";
import BookmarkList from "./bookmarkList";

const { Header, Content, Footer, Sider } = Layout;

const BookmarkPage = props => {
  const [sites, setSites] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.sites().onSnapshot(snapshot => {
      const sites = [];
      snapshot.forEach(doc => sites.push(doc.data()));
      setSites(sites);
    });
    return unsubscribe;
  }, []);

  const addSite = async site => {
    await firebase.createSite(site);
  };

  return (
    <Layout>
      <Content style={{ padding: 12, minHeight: "100vh" }}>
        <CreateBookmark addSite={addSite} />
        {sites ? <BookmarkList sites={sites} /> : <Spin />}
      </Content>
    </Layout>
  );
};

export default BookmarkPage;
