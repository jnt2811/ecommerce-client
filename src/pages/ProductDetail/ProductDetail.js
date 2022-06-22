import { StarFilled } from "@ant-design/icons";
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
} from "antd";
import ImageGallery from "react-image-gallery";
import style from "./productDetail.module.scss";
import moment from "moment";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

export const ProductDetail = () => {
  return (
    <>
      <div className={style["block"]}>
        <Row gutter={20}>
          <Col span={9}>
            <ImageGallery
              items={images}
              showNav={false}
              showPlayButton={false}
            />
          </Col>

          <Col span={9}>
            <h1>Apple iPhone 13 Pro Max</h1>

            <Space size={10}>
              <Rate value={5} disabled style={{ fontSize: "14px" }} />

              <div>(Xem 1298 đánh giá) | Đã bán 1000+</div>
            </Space>

            <div
              style={{
                color: "red",
                fontSize: 30,
                marginBlock: 20,
                fontWeight: "bold",
              }}
            >
              29.290.000 ₫
            </div>

            <Button type="primary" size="large" style={{ width: 200 }}>
              Chọn mua
            </Button>
          </Col>

          <Col span={5}>
            <Space>
              <Avatar size={40}>Tiki</Avatar>
              <div>Tiki Trading</div>
            </Space>

            <br />
            <br />

            <Row>
              <Col style={{ textAlign: "center" }} span={12}>
                <Space>
                  <div>4.6 / 5 </div>
                  <StarFilled />
                </Space>
                <div style={{ color: "cecece", fontSize: 12 }}>4.7tr+</div>
              </Col>

              <Col style={{ textAlign: "center" }} span={12}>
                <div>413k+</div>
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
      </div>

      <div className={style["block"]}>
        <h2>Mô tả sản phẩm</h2>

        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsum
          aut distinctio vero necessitatibus exercitationem expedita qui
          possimus quae sed odio quasi perspiciatis placeat ipsa, sapiente sint
          sit porro id illo, itaque deserunt dolorum. Asperiores nulla, dolorum,
          ipsam eius sed et ad nisi, deleniti molestias dicta molestiae maxime.
          Cupiditate, dolorum enim veniam obcaecati corporis tempora voluptates
          nihil commodi consequuntur quo, fugit velit officia ducimus aliquam
          laudantium sint deleniti nisi molestias provident! Vitae, dolores
          reiciendis. In ullam enim quam iusto eaque dignissimos officiis
          adipisci cum vel ex? Mollitia blanditiis culpa voluptatum iusto aut!
          Doloremque voluptate porro repudiandae non consequuntur fuga
          laboriosam, a perferendis praesentium dignissimos ducimus hic quia
          voluptatem animi adipisci, esse quaerat tempora nobis deleniti
          dolorum! Officiis ipsam placeat sunt dolor nulla accusamus vero
          delectus sed doloremque! Qui sed, perspiciatis perferendis velit neque
          distinctio maxime iste libero nostrum, quibusdam accusantium sapiente
          vel quis? Labore est necessitatibus dolorum illum deserunt sapiente
          nobis molestias. Amet ipsam molestias minus voluptate veniam. Non nisi
          recusandae facilis in nulla tempora sunt nobis. Placeat obcaecati cum
          ullam voluptatem voluptatum? Dolorum, saepe enim dicta eos soluta
          magnam totam sunt quibusdam? Asperiores reprehenderit voluptas
          veritatis sed natus? Commodi vel eum molestias temporibus eligendi
          doloribus dolorum fugit ipsam sed, unde, reiciendis culpa magni quae,
          alias atque iste illo. Quisquam non numquam iste facere id consectetur
          officia culpa sapiente, deserunt perspiciatis dolor voluptates,
          reprehenderit libero mollitia! Sed labore nulla dolorum, at aliquam
          quam doloribus hic dolore nobis possimus. Dolorum exercitationem aut
          atque excepturi ab rem cum qui ipsum doloremque, id ad aliquam saepe
          nesciunt ea necessitatibus sequi consectetur libero neque quidem
          expedita voluptas labore. Amet obcaecati quos aspernatur ipsa? Veniam
          repudiandae rerum fuga nisi accusantium voluptatum? Dignissimos
          commodi tenetur dolores deserunt consequatur quos quam sed ullam at
          officia voluptatum eveniet enim quaerat provident id optio quia ex
          incidunt sint libero dolor deleniti, hic iure quas. Quam debitis at,
          deleniti possimus impedit itaque commodi nulla a labore maxime nam,
          deserunt vel ratione fugit sapiente saepe. Obcaecati cumque labore
          deleniti suscipit reiciendis voluptates aspernatur. Ipsam veniam,
          voluptates voluptatibus quam doloremque deleniti rerum perspiciatis
          neque cumque ratione est rem adipisci iste asperiores, omnis odio,
          ipsa nobis autem eveniet quos quasi eos! Nesciunt architecto,
          veritatis corrupti assumenda, temporibus dolore animi corporis ipsum
          vel deleniti, officiis illo distinctio libero pariatur dignissimos
          sunt ea culpa doloremque cumque iusto quibusdam laborum. Dolores vitae
          officia hic quibusdam! Illo accusamus cupiditate vero deleniti sed
          animi ex quisquam repellat quia, iure, atque rem, excepturi
          dignissimos neque aspernatur laboriosam ullam nobis? Et quasi sunt
          error omnis maxime perferendis atque, eveniet, ex facilis nesciunt
          iste reiciendis nisi accusamus odit molestiae tempora eligendi dolor
          aliquid sapiente, doloremque veritatis nobis! Velit temporibus veniam
          fugit consequuntur natus cumque aut, doloremque recusandae neque.
          Distinctio, hic voluptatibus similique, quos voluptas, facere cum
          voluptates nisi animi eaque expedita sapiente. Quam totam maiores rem?
          Repudiandae quas magni ab assumenda ullam eius nulla, quae aut?
          Impedit ab ut nisi consectetur sed unde soluta beatae corrupti nulla
          id atque adipisci, quasi iste, eaque eveniet dolorum, in ipsum alias
          aliquam illum dolores.
        </div>
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
    </>
  );
};

const data = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
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
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(2, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
];
