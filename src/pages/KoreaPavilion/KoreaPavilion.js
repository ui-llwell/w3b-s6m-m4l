import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List, Input, Carousel } from 'antd';

import TagSelect from '@/components/TagSelect';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './KoreaPavilion.less';

const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */

@connect(({ list, loading,koreaPavilionModel }) => ({
  list,
  loading: loading.models.list,
  koreaPavilionModel
}))
@Form.create({
  // onValuesChange({ dispatch }, changedValues, allValues) {
  //   // 表单项变化时请求数据
  //   // eslint-disable-next-line
  //   console.log(changedValues, allValues);
  //   // 模拟查询表单生效
    
  // },
})
class KoreaPavilion extends PureComponent {
  componentDidMount() {
    this.init()
  }

  init(){
    this.props.dispatch({
      type: 'koreaPavilionModel/getCountryGoods',
      payload: {
        country:'韩国'
      },
    });
  }

  render() {
    const {koreaPavilionModel:{KoreaPavilion} } = this.props;
    const {koreaPavilionModel:{KoreaPavilion:{banner,brands,goods}} } = this.props;
    const bannerPlay = banner ?(
      <Carousel
          className={styles.carousel}
          autoplay
        >
          {
            banner.map((item,index) =>
            (
              <div
                key={index}
              >
                <img style={{ width:'100%',padding:0 }}  src={item} alt="" />
              </div>
            ))
          }
      </Carousel>
    ):null;

    const {
      list: { list = [] },
      loading,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    const cardList = list ? (
      <List
        style={{ textAlign: 'center' }}
        rowKey="id"
        loading={loading}
        grid={{ gutter: 12, xl: 6, lg: 4, md: 4, sm: 2, xs: 1 }}
        dataSource={brands}
        renderItem={item => (
          <List.Item>
            <Card
                  className={styles.card}
                  hoverable
                  cover={<img style={{padding: 20}} alt={item.title} src={item.imgurl} />}
                >
                  <Card.Meta
                    // title={<a>{item.subDescription}</a>}
                    description={<Ellipsis  lines={2}>{item.brandsName}</Ellipsis>}
                  />
            </Card>
          </List.Item>
        )}
      />
    ) : null;
    const allList_hot = list ?(
      <div>
        <div style={{textAlign:'center',marginBottom:'45px',marginTop:'25px'}}>
            <span style={{fontSize:'22px',color:'#555',fontWeight:'bold'}} >
              —————<em style={{margin:'0 25px',fontStyle:'normal'}}>韩国当下热卖单品</em>—————
            </span>
          </div>
        <Row>
          <List
            style={{ textAlign: 'center' }}
            rowKey="id"
            loading={loading}
            grid={{ gutter: 12, xl: 6, lg: 4, md: 4, sm: 2, xs: 1 }}
            dataSource={goods}
      
            renderItem={item => (
              <List.Item>
                <Card
                  className={styles.card}
                  hoverable
                  cover={<img style={{padding: 20}} alt={item.title} src={item.imgurl} />}
                >
                  <Card.Meta
                    title={<a>{item.goodsName}</a>}
                    description={<Ellipsis className={styles.ellipsis} lines={2}>{item.price}</Ellipsis>}
                  />
                </Card>
              </List.Item>
            )}
          />
        </Row>
      </div>
    ):null;          
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Row type="flex" justify="center">
          <Col lg={10} md={12} sm={16} xs={24}>
            <Input.Search
              placeholder="请输入"
              enterButton="搜索"
              size="large"
              onSearch={this.handleFormSubmit}
              // style={{ width: 522 }}
            />
          </Col>
        </Row>
      </div>
    );
    return (
      <PageHeaderWrapper
        title=""
        content={<div style={{marginBottom:20}}>{mainSearch}</div>}
      >
        {bannerPlay}
        <div className={styles.coverCardList}>
          {/* <Card bordered={false}>
            <Form layout="inline">
              <div style={{marginBottom:20}}>{mainSearch}</div>
            </Form>
          </Card> */}
          <div className={styles.cardList}>
            <div style={{textAlign:'center',marginBottom:'45px'}}>
              <span style={{fontSize:'22px',color:'#555',fontWeight:'bold'}} >
                —————<em style={{margin:'0 25px',fontStyle:'normal'}}>在韩国值得逛的品牌</em>—————
              </span>
            </div>
            {cardList}
            {allList_hot}
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default KoreaPavilion;
