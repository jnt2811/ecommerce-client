import { StarFilled } from "@ant-design/icons";
import { Row, Col, Rate, Space, Button, Avatar, Tooltip, List, Comment, Spin } from "antd";
import ImageGallery from "react-image-gallery";
import style from "./productDetail.module.scss";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { ADD_TO_CART, GET_PRODUCTS } from "../../queries";
import { useParams } from "react-router-dom";
import { keys } from "../../constants";
import { formatNumberToPrice } from "../../helpers";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@apollo/client";

export const ProductDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [addToCart, { data: add_data, loading: add_loading, error: add_error }] =
    useMutation(ADD_TO_CART);

  const {
    loading: product_loading,
    error: product_error,
    data: product_data,
  } = useQuery(GET_PRODUCTS, {
    variables: { productLock: false, id },
    fetchPolicy: "no-cache",
  });

  console.log(`get product ID ${id}:`, product_loading, product_error, product_data);
  console.log(`add to cart`, add_data, add_loading, add_error);

  const product = product_data?.getProducts?.length > 0 ? product_data?.getProducts[0] : {};

  const images =
    Object.keys(product).length > 0
      ? JSON.parse(product?.GALLERY).map((url) => ({
          original: keys.SERVER_URI + url,
          thumbnail: keys.SERVER_URI + url,
        }))
      : [];

  return (
    <Spin spinning={product_loading}>
      <div className={style["block"]}>
        <Row gutter={20}>
          <Col span={9}>
            <ImageGallery items={images} showNav={false} showPlayButton={false} />
          </Col>

          <Col span={9}>
            <h1>{product?.PRODUCT_NAME}</h1>

            <Space size={10}>
              <Rate value={0} disabled style={{ fontSize: "14px" }} />

              <div>(Xem 0 đánh giá) | Đã bán 0</div>
            </Space>

            <div
              style={{
                color: "red",
                fontSize: 30,
                marginBlock: 20,
                fontWeight: "bold",
              }}
            >
              {formatNumberToPrice(product?.PRICE)} ₫
            </div>

            <Button
              type="primary"
              size="large"
              style={{ width: 200 }}
              onClick={() =>
                addToCart({
                  variables: {
                    productId: [
                      {
                        COUNT_PRODUCT: 1,
                        PRODUCT_ID: id,
                      },
                    ],
                    userId: currentUser?.ID,
                  },
                })
              }
            >
              Chọn mua
            </Button>
          </Col>

          <Col span={5}>
            <Space>
              <Avatar size={40}>{product?.SELLER?.SELLER_NAME}</Avatar>
              <div>{product?.SELLER?.SELLER_NAME}</div>
            </Space>

            <br />
            <br />

            <Row>
              <Col style={{ textAlign: "center" }} span={12}>
                <Space>
                  <div>0/5</div>
                  <StarFilled />
                </Space>
                <div style={{ color: "cecece", fontSize: 12 }}>0</div>
              </Col>

              <Col style={{ textAlign: "center" }} span={12}>
                <div>0</div>
                <div style={{ color: "cecece", fontSize: 12 }}>theo dõi</div>
              </Col>
            </Row>

            <br />

            <Row justify="center" gutter={10}>
              <Col span={12}>
                <Button type="primary" ghost block>
                  Xem shop
                </Button>
              </Col>
              <Col span={12}>
                <Button block type="primary">
                  Theo dõi
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className={style["block"]}>
        <h2>Thông tin chi tiết</h2>

        <div dangerouslySetInnerHTML={{ __html: product?.DESCRIPTION }} className="rich-text" />
      </div>

      <div className={style["block"]}>
        <h2>Mô tả sản phẩm</h2>

        <div dangerouslySetInnerHTML={{ __html: product?.DETAILS }} className="rich-text" />
      </div>

      <div className={style["block"]}>
        <h2>Đánh Giá - Nhận Xét Từ Khách Hàng</h2>

        <List
          className="comment-list"
          header={`${data.length} replies`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
      </div>
    </Spin>
  );
};

const data = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}>
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}>
        <span>{moment().subtract(2, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
];
