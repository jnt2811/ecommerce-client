import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { keys, paths } from "../../../constants";
import { useQueryParams } from "../../../hooks";

export const SearchProduct = () => {
  const { search, pathname } = useLocation();
  const [searchValue, setSearchValue] = useState();
  const history = useHistory();
  const query = useQueryParams();
  const name = query.get(keys.SEARCH_NAME);

  useEffect(() => {
    if (pathname === paths.home) setSearchValue();
  }, [pathname]);

  const handleChange = (e) => setSearchValue(e.target.value);

  const handleSearch = (value) => {
    if (!!value) {
      let searchValue = `${keys.SEARCH_NAME}=${value}`;

      if (!!search) {
        const tempSearch = search.replace("?", "");
        if (!!name) {
          searchValue = tempSearch.replace(name, value);
        } else searchValue += `&&` + tempSearch;
      }

      history.push({
        pathname: paths.search,
        search: searchValue,
      });
    }
  };

  console.log("log header", search, !!search, !!search.includes(`${keys.SEARCH_NAME}=`));

  return (
    <Row wrap={false}>
      <Input
        size="large"
        placeholder="Tìm kiếm sản phẩm ..."
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        onPressEnter={(e) => handleSearch(e.target.value)}
        value={searchValue}
        onChange={handleChange}
      />

      <Button
        size="large"
        icon={<SearchOutlined />}
        type="primary"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        onClick={() => handleSearch(searchValue)}
      >
        Tìm kiếm
      </Button>
    </Row>
  );
};
