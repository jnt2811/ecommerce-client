import { CloseOutlined, StarFilled } from "@ant-design/icons";
import {
  Row,
  Col,
  Rate,
  Space,
  Button,
  Avatar,
  Tooltip,
  List,
  Comment,
  Spin,
  Form,
  Input,
  notification,
} from "antd";
import ImageGallery from "react-image-gallery";
import style from "./productDetail.module.scss";
import moment from "moment";
import { useQuery } from "@apollo/client";
import {
  ADD_COMMENT,
  ADD_TO_CART,
  GET_COMMENTS,
  GET_PRODUCTS,
  REMOVE_COMMENT,
} from "../../queries";
import { useParams } from "react-router-dom";
import { keys } from "../../constants";
import { formatNumberToPrice } from "../../helpers";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const ProductDetail = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();

  const {
    loading: product_loading,
    error: product_error,
    data: product_data,
  } = useQuery(GET_PRODUCTS, {
    variables: { productLock: false, id },
    fetchPolicy: "no-cache",
  });
  const {
    data: comment_data,
    loading: comment_loading,
    error: comment_error,
  } = useQuery(GET_COMMENTS, { variables: { productId: id }, fetchPolicy: "no-cache" });
  const [
    addComment,
    {
      data: add_comment_data,
      loading: add_comment_loading,
      error: add_comment_error,
      reset: add_comment_reset,
    },
  ] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_COMMENTS, { variables: { productId: id }, fetchPolicy: "no-cache" }],
  });
  const [addToCart, { data: add_data, loading: add_loading, error: add_error }] =
    useMutation(ADD_TO_CART);
  const [
    removeComment,
    {
      data: remove_comment_data,
      loading: remove_comment_loading,
      error: remove_comment_error,
      reset: remove_comment_reset,
    },
  ] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [GET_COMMENTS, { variables: { productId: id }, fetchPolicy: "no-cache" }],
  });

  console.log(`get product ID ${id}:`, product_loading, product_error, product_data);
  console.log(`add to cart`, add_data, add_loading, add_error);
  console.log(`get comments`, comment_data, comment_loading, comment_error);
  console.log(`add comment`, add_comment_data, add_comment_loading, add_comment_error);
  console.log(`remove comment`, remove_comment_data, remove_comment_loading, remove_comment_error);

  const product = product_data?.getProducts?.length > 0 ? product_data?.getProducts[0] : {};

  const images =
    Object.keys(product).length > 0
      ? JSON.parse(product?.GALLERY).map((url) => ({
          original: keys.SERVER_URI + url,
          thumbnail: keys.SERVER_URI + url,
        }))
      : [];

  useEffect(() => {
    if (add_comment_data) {
      if (add_comment_data?.addNewComment?.status === "KO") {
        add_comment_reset();
        notification.error({
          placement: "bottomLeft",
          message: "Bình luận thất bại!",
        });
      } else if (add_comment_data?.addNewComment?.status === "OK") {
        add_comment_reset();
        form.resetFields();
      }
    }
  }, [add_comment_data, add_comment_reset, form]);

  useEffect(() => {
    if (remove_comment_data) {
      if (remove_comment_data?.removeComment?.status === "KO") {
        remove_comment_reset();
        notification.error({
          placement: "bottomLeft",
          message: "Gỡ bình luận thất bại!",
        });
      } else if (remove_comment_data?.removeComment?.status === "OK") {
        remove_comment_reset();
      }
    }
  }, [remove_comment_data, form, remove_comment_reset]);

  const onFinish = (values) => {
    values.USER_ID = currentUser?.ID;
    values.PRODUCT_ID = id;
    console.log(values);
    addComment({ variables: { comment: values } });
  };

  const handleDeleteComment = (comment) => {
    removeComment({ variables: { comment: { ID: comment.ID, STATE: false } } });
  };

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
        <h2>Bình luận</h2>

        <Form form={form} onFinish={onFinish}>
          <Form.Item name="CONTENTS">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={add_comment_loading} type="primary">
              Đăng bình luận
            </Button>
          </Form.Item>
        </Form>

        <List
          header={`${comment_data?.getCommentOfProduct?.length} bình luận`}
          itemLayout="horizontal"
          dataSource={comment_data?.getCommentOfProduct?.map((comment) => ({
            ...comment,
            content: <p>{comment.CONTENTS}</p>,
            author: comment.LAST_NAME + " " + comment.FIRST_NAME,
            avatar: "https://joeschmoe.io/api/v1/random",
            actions:
              comment.USER_ID === currentUser?.ID
                ? [
                    <Button
                      type="text"
                      onClick={() => handleDeleteComment(comment)}
                      loading={remove_comment_loading}
                      icon={<CloseOutlined />}
                      size="small"
                      danger
                    >
                      Gỡ bình luận
                    </Button>,
                  ]
                : [],
          }))}
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
