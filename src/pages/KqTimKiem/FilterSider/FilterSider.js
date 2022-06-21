import { Layout } from "antd";
import style from "./filterSider.module.scss";

export const FilterSider = () => {
  return (
    <Layout.Sider className={style["container"]} width={250}>
      <h1>Bộ lọc</h1>
    </Layout.Sider>
  );
};
