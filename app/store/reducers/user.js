/**
 * Created by guoshuyu on 2017/11/16.
 */
import {USER} from '../type';
import {createReducer} from '../'

const initialState = {
    //当前登录用户信息
    userInfo: {},
};
//每个 reducer 的 state 参数分别对应它管理的那部分 state
const actionHandler = {
    [USER.USER_INFO]: (state, action) => {
        return {
            ...state,
            userInfo: action.res
        }
    },
};

export default createReducer(initialState, actionHandler)
