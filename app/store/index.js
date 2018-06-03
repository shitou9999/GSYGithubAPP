/**
 * Created by guoshuyu on 2017/11/7.
 */
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';//用最简单的方式搭建异步 action 构造器
import reducers from './reducers';

/************************************************************/
// store.dispatch一个action对象就能改变相应的状态
// store.dispatch({ type: 'INCREMENT' });
// 你应该把要做的修改变成一个普通对象，这个对象被叫做 action，而不是直接修改 state。
// 然后编写专门的函数来决定每个 action 如何改变应用的 state，这个函数被叫做 reducer。
/************************************************************/
export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        //object.hasOwnProperty(proName);
        //hasOwnProperty判断proName的名称是不是object对象的一个属性或对象
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}
//action简单理解就是用对象中的type告诉store中的相应的reducer去做状态的改变或更新
//applyMiddleware 则可以对 store 对象中的 dispatch 进行改造
const createStoreWithMW = applyMiddleware(thunk)(createStore);
const store = createStoreWithMW(reducers);
export default store
/************************************************************/

// redux-thunk — 用最简单的方式搭建异步 action 构造器
// redux-promise — 遵从 FSA 标准的 promise 中间件
// redux-axios-middleware — 使用 axios HTTP 客户端获取数据的 Redux 中间件
// redux-observable — Redux 的 RxJS 中间件
// redux-rx — 给 Redux 用的 RxJS 工具，包括观察变量的中间件
// redux-logger — 记录所有 Redux action 和下一次 state 的日志
// redux-immutable-state-invariant — 开发中的状态变更提醒
// redux-unhandled-action — 开发过程中，若 Action 未使 State 发生变化则发出警告
// redux-analytics — Redux middleware 分析
// redux-gen — Redux middleware 生成器
// redux-saga — Redux 应用的另一种副作用 model
// redux-action-tree — Redux 的可组合性 Cerebral-style 信号
// apollo-client — 针对 GraphQL 服务器及基于 Redux 的 UI 框架的缓存客户端


// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
// let store = createStore(counter);
/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>
    console.log(store.getState())
);

// 你应该把要做的修改变成一个普通对象，这个对象被叫做 action，而不是直接修改 state。
// 然后编写专门的函数来决定每个 action 如何改变应用的 state，这个函数被叫做 reducer
// 改变内部 state 惟一方法是 dispatch 一个 action！！！！！！！！！！！！！
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
// store.dispatch({ type: 'INCREMENT' });
// // 1
// store.dispatch({ type: 'INCREMENT' });
// // 2
// store.dispatch({ type: 'DECREMENT' });
// // 1