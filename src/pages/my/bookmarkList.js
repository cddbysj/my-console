// ** 书签展示列表，展示型组件 ** //
import React from 'react';
import { Card, Row, Col, Icon, Tag } from 'antd';
import styles from './bookmark.module.css';

// 导航网址类别
const categories = [
  'Awesome',
  'Front End',
  'Online Tools',
  'Blog',
  'Front End Team',
  'Ebook',
  'News',
  'Search Engine',
  'Encyclopedia',
  'Others',
];

// 网址卡片图标的调色板
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

const RandomAvatar = ({ title }) => {
  const index = Math.floor(palette.length * Math.random());
  const randomColor = palette[index];
  console.log(randomColor);

  return (
    <div
      className={styles.randomAvatar}
      style={{ backgroundColor: randomColor }}
    >
      {title.slice(0, 1)}
    </div>
  );
};

const BookmarkList = props => {
  const { sites } = props;

  return (
    <div>
      {categories.map(category => {
        const groupSites = sites.filter(site => site.category === category);
        return (
          <div key="category" className={styles.category}>
            <p>
              <Icon type="tag" /> {category}
            </p>
            <Row gutter={[16, 16]} type="flex">
              {groupSites.map(site => (
                <Col span={6} key={site.title}>
                  <a href={site.url} target="_blank" rel="noopener noreferrer">
                    <Card className={styles.card} hoverable>
                      <Card.Meta
                        title={site.title}
                        description={site.description}
                        avatar={<RandomAvatar title={site.title} />}
                      />
                    </Card>
                  </a>
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default BookmarkList;
