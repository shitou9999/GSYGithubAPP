import {REPOSITORY} from '../type';
import {createReducer} from '../'

const initialState = {
    //当前趋势列表
    trend_repos_data_list: [],
    trend_repos_current_size: 0,
};
// Redux 并不在意你如何存储 state，state 可以是普通对象，不可变对象，或者其它类型
//趋势数据
const actionHandler = {
    [REPOSITORY.TREND_REPOSITORY]: (state, action) => {
        return {
            ...state,
            trend_repos_data_list: action.res,
            trend_repos_current_size: action.res.length
        }
    },
};

export default createReducer(initialState, actionHandler)