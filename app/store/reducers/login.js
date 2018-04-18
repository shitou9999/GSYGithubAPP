/**
 * Created by guoshuyu on 2017/11/7.
 */
import  {LOGIN} from '../type';
import {createReducer} from '../'

const initialState = {
    type: LOGIN.CLEAR,
};
//每个 reducer 的 state 参数分别对应它管理的那部分 state
const actionHandler = {
    [LOGIN.IN]: (state, action) => {
        return {}
    },
    [LOGIN.CLEAR]: (state, action) => {
        return {}
    }
};

export default createReducer(initialState, actionHandler)