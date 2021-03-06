/**
 * Created by guoshuyu on 2017/11/7.
 */
import  {LOGIN} from '../type';
import {createReducer} from '../'

const initialState = {
    type: LOGIN.CLEAR,
};
//为了描述 action 如何改变 state tree ，你需要编写 reducers。
//每个 reducer 的 state 参数分别对应它管理的那部分 state
//Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state
const actionHandler = {
    [LOGIN.IN]: (state, action) => {
        return {}
    },
    [LOGIN.CLEAR]: (state, action) => {
        return {}
    }
};

export default createReducer(initialState, actionHandler)