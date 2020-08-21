import React from "react";
import { Col, Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";

const MemoList = ({ memoList, enterEditMode }) => {
  return memoList.map((memo) => (
    <Col flex="1 1 300px" key={memo.id}>
      <div
        style={{
          border: "1px solid #dedede",
          borderRadius: 6,
          padding: 8,
        }}
      >
        <h3>
          {memo.title}
          <Button
            type="link"
            icon={<EditTwoTone />}
            onClick={() => enterEditMode(memo)}
          ></Button>
        </h3>
        <div style={{ whiteSpace: "pre-line" }}>{memo.text}</div>
        <sub>{new Date(memo.createAt).toLocaleDateString("zh-hans")}</sub>
      </div>
    </Col>
  ));
};

export default MemoList;
