import React from "react";
import { FilterSider } from "./FilterSider/FilterSider";
import style from "./kqTimKiem.module.scss";

export const KqTimKiem = () => {
  return (
    <div className={style["container"]}>
      <FilterSider />
    </div>
  );
};
