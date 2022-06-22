import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { paths } from "../../../constants";
import style from "./cateSider.module.scss";
// import { useQuery } from "@apollo/client";
// import { getCategories } from "../../../constants/gql";

const menuItems = Array(10)
  .fill(null)
  .map((_, index) => ({
    key: `dm-${index + 1}`,
    label: `Danh muc ${index + 1}`,
  }));

export const CateSider = () => {
  // const { loading, error, data } = useQuery(getCategories);
  const history = useHistory();

  const handleClickCate = ({ key }) =>
    history.push({
      pathname: paths.search,
      search: `category=${key}`,
    });

  return (
    <Layout.Sider className={style["container"]} width={250}>
      <h1>Danh mục</h1>

      <Menu items={menuItems} onClick={handleClickCate} />
    </Layout.Sider>
  );
};
