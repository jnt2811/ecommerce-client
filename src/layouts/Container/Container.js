import { Layout } from "antd";
import style from "./container.module.scss";

export const Container = ({ children }) => {
  return <Layout className={style["container"]}>{children}</Layout>;
};
