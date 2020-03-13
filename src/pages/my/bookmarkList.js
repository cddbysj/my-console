// ** 书签展示列表，展示型组件 ** //
import React from "react";
import { Card, Row, Col, Icon, Anchor } from "antd";
import { SITE_CATEGORIES, PALETTE } from "constants/index";
import styles from "./bookmark.module.css";

const { Link } = Anchor;

const RandomAvatar = ({ title }) => {
  const index = Math.floor(PALETTE.length * Math.random());
  const randomColor = PALETTE[index];

  return (
    <div
      className={styles.randomAvatar}
      style={{ backgroundColor: randomColor }}
    >
      {title.slice(0, 1)}
    </div>
  );
};

const BookmarkList = ({ sites }) => {
  return (
    <div>
      <Row gutter={8}>
        <Col span={21}>
          {SITE_CATEGORIES.map(category => {
            const groupSites = sites.filter(site => site.category === category);
            return (
              <div
                key={category}
                id={category.replace(" ", "-")}
                className={styles.category}
              >
                <p>
                  <Icon type="tag" /> {category}
                </p>
                <Row gutter={[16, 16]} type="flex">
                  {groupSites.map(site => (
                    <Col span={8} key={site.title}>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
        </Col>
        <Col span={3}>
          <Anchor>
            {SITE_CATEGORIES.map(c => (
              <Link key={c} href={`#${c.replace(" ", "-")}`} title={c} />
            ))}
          </Anchor>
        </Col>
      </Row>
    </div>
  );
};

export default BookmarkList;
