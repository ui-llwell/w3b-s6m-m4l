import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import { getCategoryGoods,getAllClassification } from '@/services/Category_S';
import { message } from 'antd';
export default {
  namespace: 'categoryModel',

  state: {
    clickClassificationSED:'',
    clickBrand:'全部',
    Category:{
      categoryImg:[],
      brands:[],
      classificationSED:[],
      changeGoods:[],
      pagination:{
        pageSize:0,
      },
    },
    allClassificationArr:[]
  },

  effects: {


    // 获取品类页接口与筛选接口
    *getAllClassification({ payload,callback }, { call, put }) {
      const response = yield call(getAllClassification, payload);
      if(response!==undefined){
        if(response.type==1){
          yield put({
            type: 'getAllClassificationR',
            payload: response.allClassificationItems,
          });
          callback()
        }else{
          message.error('暂无数据');
        }
      }
    },
    // 获取品类页接口与筛选接口
    *getCategoryGoods({ payload }, { call, put }) {
      const response = yield call(getCategoryGoods, payload);
      if(response!==undefined){
        if(response.type==1){
          yield put({
            type: 'getCategoryGoodsR',
            payload: response,
          });
        }else{
          message.error('暂无数据');
        }
      }
    },


  },

  reducers: {

    getCategoryGoodsR(state, action){
      return {
        ...state,
        Category:action.payload
      }
    },
    getAllClassificationR(state, action){
      return {
        ...state,
        allClassificationArr:action.payload
      }
    },
    saveClickClassificationSEDR(state, action){
      return {
        ...state,
        clickClassificationSED:action.payload
      }
    },
    saveClickBrandR(state, action){
      return {
        ...state,
        clickBrand:action.payload
      }
    },

    clearR(state, action){
      return {
        ...state,
        clickClassificationSED:'',
        clickBrand:'全部',
      }
    }


  },
};
