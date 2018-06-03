/**
 * Created by guoshuyu on 2017/11/7.
 */

import {combineReducers} from 'redux';
import login from "./login"
import user from "./user"
import event from "./event"
import repository from "./repository"
import issue from "./issue"

//随着应用变得复杂，需要对 reducer 函数 进行拆分，拆分后的每一块独立负责管理 state 的一部分
//combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，
// 合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStor

// 合并后的 reducer 可以调用各个子 reducer，并把它们的结果合并成一个 state 对象。
// state 对象的结构由传入的多个 reducer 的 key 决定。

//只有一个单一的 store 和一个根级的 reduce 函数（reducer）
// 随着应用不断变大，你应该把根级的 reducer 拆成多个小的 reducers，分别独立地操作 state 树的不同部分，而不是添加新的 stores
//组合多个reducer！！！！！
export default combineReducers({
    login: login,
    user: user,
    event: event,
    repository: repository,
    issue: issue,
});

export function clear(state) {
    state().event.received_events_data_list = [];
    state().repository.trend_repos_data_list = [];
}