import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Input, Row } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { paths } from "../../../constants";

export const SearchProduct = () => {
  const [searchString, setSearchString] = useState();
  const [searchOptions, setSearchOptions] = useState([]);
  const history = useHistory();

  const options = [
    {
      label: !!searchString ? "Kết quả tìm kiếm" : "Tìm kiếm gần đây",
      options: searchOptions,
    },
  ];

  const handleSelect = (value) => {
    console.log("[info] select result returned:", value);
    doSearch(value);
  };

  const handleSearch = (value) => {
    console.log("[info] live search product:", value);
  };

  const handleChangeSearchString = (e) => {
    const { value } = e.target;
    setSearchString(value);
    if (!!value) setSearchOptions([{ value }]);
    else setSearchOptions([]);
  };

  const doSearch = (value) => {
    !!value &&
      history.push({
        pathname: paths.search,
        search: `name=${value}`,
      });
  };

  return (
    <Row wrap={false}>
      <AutoComplete
        style={{ width: "100%" }}
        options={options}
        onSelect={handleSelect}
        onSearch={handleSearch}
      >
        <Input
          value={searchString}
          onChange={handleChangeSearchString}
          size="large"
          placeholder="Tìm kiếm sản phẩm ..."
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        />
      </AutoComplete>

      <Button
        size="large"
        icon={<SearchOutlined />}
        type="primary"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        onClick={() => doSearch(searchString)}
      >
        Tìm kiếm
      </Button>
    </Row>
  );
};
