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
//Action说白了就是一个带type属性的JavaScript对象
export default {
    toLogin,
    doLogin,
    getLoginParams,
    loginOut

}