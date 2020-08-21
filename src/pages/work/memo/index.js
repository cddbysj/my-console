/* 备忘录页面 */
import React, { useState, useEffect } from "react";
import { Row, Button, Drawer, Divider, message } from "antd";
import firebase from "api/firebase";
import { PlusOutlined } from "@ant-design/icons";
import CreateMemoForm from "./createMemoForm";
import EditMemoForm from "./editMemoForm";
import MemoList from "./memoList";

const MemoPage = (props) => {
  const [memoList, setMemoList] = useState(null);
  const [visible, setVisible] = useState(false);
  // 新建模式 create 或者 编辑模式 edit
  const [mode, setMode] = useState("create");
  // 正在被编辑的备忘录
  const [activeMemo, setActiveMemo] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase
      .getMemo()
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const memoList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMemoList(memoList);
      });
    return unsubscribe;
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const createMemo = async (memo) => {
    try {
      await firebase.createMemo(memo);
      message.success("新建成功");
    } catch (error) {
      message.error(`新建失败：${error.message}`, 2.5);
    } finally {
      closeDrawer();
    }
  };

  const enterCreateMode = () => {
    setMode("create");
    setActiveMemo(null);
    showDrawer();
  };

  const enterEditMode = (memo) => {
    setMode("edit");
    setActiveMemo((prev) => ({ ...prev, ...memo }));
    showDrawer();
  };

  const updateMemo = async (memo) => {
    try {
      await firebase.updateMemo(memo);
      message.success("更新成功");
    } catch (error) {
      message.error(`更新失败：${error.message}`, 2.5);
    } finally {
      closeDrawer();
    }
  };

  const removeMemo = async () => {
    try {
      await firebase.removeMemo(activeMemo.id);
      message.success("删除成功");
    } catch (error) {
      message.error(`删除失败:${error.message}`, 2.5);
    } finally {
      closeDrawer();
    }
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={enterCreateMode}>
        新建备忘录
      </Button>
      <Divider />
      <Row gutter={[16, 16]}>
        {memoList && (
          <MemoList memoList={memoList} enterEditMode={enterEditMode} />
        )}
      </Row>
      <Drawer
        width={720}
        onClose={closeDrawer}
        visible={visible}
        title={mode === "create" ? "新建备忘录" : "编辑备忘录"}
      >
        {mode === "create" ? (
          <CreateMemoForm onClose={closeDrawer} onCreateMemo={createMemo} />
        ) : (
          <EditMemoForm
            onClose={closeDrawer}
            onUpdateMemo={updateMemo}
            activeMemo={activeMemo}
            onRemoveMemo={removeMemo}
          />
        )}
      </Drawer>
    </div>
  );
};

export default MemoPage;
