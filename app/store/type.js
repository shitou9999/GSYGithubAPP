/**
 * Store就是我们存取状态数据的地方，外加可以订阅状态数据改变时触发的事件
 * 所有的 state 都以一个对象树的形式储存在一个单一的 store 中
 */
//页面中的所有状态or数据，都应该用这种状态树的形式来描述；
// 页面上的任何变化，都应该先去改变这个状态树，然后再通过某种方式实现到页面上。
// *****用对象去描述页面的状态，通过改变对象操控页面*****
// 或者换句话说，核心工作，就是用单个对象去描述页面的状态，然后通过改变这个对象来操控页面。
//用对象描述页面的变化然后通过改变这个对象来操控页面
export const LOGIN = {
    IN: 'LOGIN.IN',
    CLEAR: 'LOGIN.CLEAR',
};

export const USER = {
    USER_INFO: 'user_info',
};


export const EVENT = {
    RECEIVED_EVENTS: 'received_events',
};


export const REPOSITORY = {
    TREND_REPOSITORY: 'trend_repository',
};

export const ISSUSE = {
};