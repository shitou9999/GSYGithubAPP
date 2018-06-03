/**
 * Created by guoshuyu on 2017/11/7.
 */

import {AsyncStorage} from 'react-native'
import Api from '../../net'
import Address from '../../net/address'
import {LOGIN} from '../type'
import userAction from './user'
import * as Constant from '../../style/constant'
import {Buffer} from 'buffer'
import {clear} from '../reducers'
import {CLIENT_ID, CLIENT_SECRET} from '../../config/ignoreConfig'

const toLogin = () => async (dispatch, getState) => {

};
//Action创建函数也可以是异步非纯函数。
/**
 * 登陆请求
 */
const doLogin = (userName, password, callback) => async (dispatch, getState) => {
    let base64Str = Buffer(userName + ":" + password).toString('base64');
    //保存用户名和密码
    AsyncStorage.setItem(Constant.USER_NAME_KEY, userName);
    AsyncStorage.setItem(Constant.USER_BASIC_CODE, base64Str);
    //请求参数
    let requestParams = {
        scopes: ['user', 'repo', 'gist', 'notifications'],
        note: "admin_script",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    };
    //清除授权
    Api.clearAuthorization();
    //await该关键字的作用时：等待该语句执行完毕才执行下一条代码。
    let res = await Api.netFetch(Address.getAuthorization(), 'POST', requestParams, true);
    if (res && res.result) {
        //保存密码
        AsyncStorage.setItem(Constant.PW_KEY, password);
        let current = await userAction.getUserInfo();
        //除了 type 字段外，action 对象的结构完全由你自己决定。
        //Redux 中只需把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程
        dispatch({
            type: LOGIN.IN,
            res
        });
    }
    setTimeout(() => {
        callback && callback(res.result);
    }, 1000)
};

/**
 * 退出登录
 */
const loginOut = () => async (dispatch, getState) => {
    Api.clearAuthorization();
    AsyncStorage.removeItem(Constant.USER_BASIC_CODE);
    userAction.clearUserInfo();
    clear(getState);
    dispatch({
        type: LOGIN.CLEAR,
    });
};

//使用async/await语法解决网络请求的异步导致的指令执行顺序错乱问题!!!!
//如果你在一个代码块中使用了fetch，那么在执行的时候程序不会等待网络响应结束才执行下一条代码，
// 而是会直接按顺序执行完整个代码块。而这样的话，某些具有先后条件的代码就会存在结果混乱等问题
//加上 async 关键字，标示该方法是异步方法
//而在方法中，使用 await 关键字修饰异步操作，
// 该关键字的作用时：等待该语句执行完毕才执行下一条代码。

/**
 * 获取当前登录用户的参数
 */
const getLoginParams = async () => {
    let userName = await AsyncStorage.getItem(Constant.USER_NAME_KEY);
    let password = await AsyncStorage.getItem(Constant.PW_KEY);
    //return对象js
    return {
        userName: (userName) ? userName : "",
        password: (password) ? password : "",
    }
};
//我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。
// 当应用规模越来越大时，建议使用单独的模块或文件来存放 action。
// import { ADD_TODO, REMOVE_TODO } from '../actionTypes' 我们应该尽量减少在 action 中传递的数据。
// Action是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）
// 传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。
//Action说白了就是一个带type属性的JavaScript对象
export default {
    toLogin,
    doLogin,
    getLoginParams,
    loginOut

}