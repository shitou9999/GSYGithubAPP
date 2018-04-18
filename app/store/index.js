/**
 * Created by guoshuyu on 2017/11/7.
 */
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

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
//applyMiddleware 则可以对 store 对象中的 dispatch 进行改造
const createStoreWithMW = applyMiddleware(thunk)(createStore);
const store = createStoreWithMW(reducers);
export default store