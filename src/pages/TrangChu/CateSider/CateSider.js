import { Layout, Menu } from "antd";
import style from "./cateSider.module.scss";
import { useQuery } from "@apollo/client";
import { getCategories } from "../../../constants/gql";

export const CateSider = () => {
  const { loading, error, data } = useQuery(getCategories);

  console.log(data);

  return (
    <Layout.Sider className={style["container"]} width={250}>
      <h1>Danh mục</h1>

      <Menu>
        <Menu.Item key="1">Cate 1</Menu.Item>
        <Menu.Item key="2">Cate 2</Menu.Item>
        <Menu.Item key="3">Cate 3</Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};
