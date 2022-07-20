import { Layout, Menu, Spin } from "antd";
import { useHistory } from "react-router-dom";
import { keys, paths } from "../../../constants";
import { GET_CATEGORIES } from "../../../queries";
import style from "./cateSider.module.scss";
import { useQuery } from "@apollo/client";

export const CateSider = () => {
  const history = useHistory();
  const { data: list_data, loading: list_loading, error: list_error } = useQuery(GET_CATEGORIES);

  console.log("get list categories", list_loading, list_error, list_data);

  const menuItems = list_data?.getCategories?.map((category) => ({
    key: category.ID,
    label: category.CATEGORIES_NAME,
  }));

  const handleClickCate = ({ key }) =>
    history.push({
      pathname: paths.search,
      search: `${keys.SEARCH_CATEGORY}=${key}`,
    });

  return (
    <Layout.Sider className={style["container"]} width={250}>
      <h1>Danh mục</h1>

      <Spin spinning={list_loading}>
        <Menu items={menuItems} onClick={handleClickCate} />
      </Spin>
    </Layout.Sider>
  );
};
