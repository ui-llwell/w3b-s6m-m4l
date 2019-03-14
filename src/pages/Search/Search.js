import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List, Input, Carousel } from 'antd';
import { routerRedux, Link } from 'dva/router';
import TagSelect from '@/components/TagSelect';
import Ellipsis from '@/components/Ellipsis';
import StandardFormRow from '@/components/StandardFormRow';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Search.less';

const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */

@connect(({ list, loading ,searchModel }) => ({
  list,
  loading: loading.models.list,
  searchModel
}))
@Form.create()

class Search extends PureComponent {
  componentDidMount() {
    this.init()
  }

  init(){
    const {match,dispatch}=this.props;
    // 解析搜索传值
    this.props.dispatch({
      type: 'searchModel/getSelectGoods',
      payload: {
        select:match.params.value==="undefined"||match.params.value===":value"?'':match.params.value
      },
    });

  }

  changePage(page){
    const {match,dispatch,searchModel:{search,search:{brands,changeGoods,classificationSED,pagination,select}} } = this.props;
    // 解析搜索传值
    this.props.dispatch({
      type: 'searchModel/getSelectGoods',
      payload: {
        select,
        current:page,
        pageSize:pagination.pageSize,
        classificationSED:classificationSED.length==2?classificationSED[1].allclassification:'',
        brands:brands.length==2?brands[1]:''
      },
    });
  }

  handleCategory(item,index){
   // console.log(item)
    const {match,dispatch,searchModel:{search,search:{brands,changeGoods,classificationSED,pagination,select}} } = this.props;
    // 解析搜索传值
    this.props.dispatch({
      type: 'searchModel/getSelectGoods',
      payload: {
        select,
        classificationSED:item.allclassification
      },
    });

  }

  handleBrand(item,index){
    const {match,dispatch,searchModel:{search,search:{brands,changeGoods,classificationSED,pagination,select}} } = this.props;
    this.props.dispatch({
      type: 'searchModel/getSelectGoods',
      payload: {
        brand:item,
        select,
        classificationSED:classificationSED.length==2?classificationSED[1].allclassification:'',

      },
    });
  }

  handleFormSubmit= (value) => {
    this.props.dispatch({
      type: 'searchModel/getSelectGoods',
      payload: {
        select:value,

      },
    });
  }


  render() {
    const {match,dispatch,searchModel:{search,search:{brands,changeGoods,classificationSED,pagination,select}} } = this.props;
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
        grid={{ gutter: 12, xl: 6, lg: 4, md: 3, sm: 2, xs: 1 }}
        dataSource={changeGoods}
        pagination={{
          onChange: (page) => {
            this.changePage(page)
          },
          onShowSizeChange: (current, pageSize) => {

            const {searchModel:{search,search:{brands,changeGoods,classificationSED,pagination}} } = this.props;

            // 解析搜索传值
            this.props.dispatch({
              type: 'searchModel/getSelectGoods',
              payload: {
                pageSize,
                select,
                classificationSED:classificationSED.length==2?classificationSED[1].allclassification:'',
                brands:brands.length==2?brands[1]:''
              },
            });
           },
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        renderItem={item => (
          <List.Item>
            <Link target="_blank" to={`/goodsDetails/${item.barcode}`}>
              <Card
                className={styles.card}
                hoverable
                cover={<img style={{padding: 20}} alt={item.title} src={item.imgurl} />}
              >
                <Card.Meta
                  description={
                    <div>
                      <Ellipsis className={styles.ellipsisName} lines={2}>{item.goodsName}</Ellipsis>
                      <Ellipsis className={styles.ellipsis} lines={2}>{item.price}</Ellipsis>
                    </div>
                  }
                />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    ) : null;

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Row type="flex" justify="center">
          <Col lg={10} md={12} sm={16} xs={24}>
            <FormItem label="">
              {getFieldDecorator('value', {
                initialValue: match.params.value==="undefined"?'':match.params.value,
              })(
                <Input.Search
                  placeholder="请输入"
                  enterButton="搜索"
                  size="large"
                  onSearch={this.handleFormSubmit}
                />
              )}
            </FormItem>
          </Col>
        </Row>
      </div>

    );
    return (
      <PageHeaderWrapper
        title=""
        content={<div style={{marginBottom:20}}>{mainSearch}</div>}
      >
        <div className={styles.coverCardList}>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="分类" block style={{ paddingBottom: 11 }}>
                <FormItem>
                  {getFieldDecorator('category')(
                    <TagSelect hideCheckAll expandable>
                      {
                        classificationSED.map((item,index) => (
                          // {item.allclassification}
                          <TagSelect.Option
                            value={index}
                            key={index}
                          >
                            <span onClick={() => this.handleCategory(item,index)}>{item.allclassification}</span>
                          </TagSelect.Option>
                        ))
                      }
                    </TagSelect>
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow title="品牌" block style={{ paddingBottom: 11 }}>
                <FormItem>
                  {getFieldDecorator('Brand')(
                    <TagSelect hideCheckAll expandable>
                      {
                          brands.map((item,index) => (
                            <TagSelect.Option
                              value={index}
                              key={index}
                            >
                              <span onClick={()=>this.handleBrand(item,index)}>{item}</span>
                            </TagSelect.Option>
                          ))
                        }
                    </TagSelect>
                  )}
                </FormItem>
              </StandardFormRow>
            </Form>
          </Card>
          <div className={styles.cardList}>
            {cardList}
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Search;
