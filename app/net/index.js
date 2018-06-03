/**
 * Created by guoshuyu on 2017/11/8.
 */

import {NetInfo, Platform, AsyncStorage} from 'react-native';
import I18n from '../style/i18n'
//导出常量
import * as Constant from '../style/constant'
import * as Code from './netwrokCode'
import handlerError from './netwrokCode'
import {NativeModules, DeviceEventEmitter} from 'react-native';

export const CONTENT_TYPE_JSON = "application/json";
export const CONTENT_TYPE_FORM = "application/x-www-form-urlencoded";

class HttpManager {

    constructor() {
        this.optionParams = {
            timeoutMs: 15000,
            token: null,
            authorizationCode: null,
        };
    };

    /**
     * get请求
     * @param url 请求url
     * @param header 外加头
     * @return {Promise.<*>}
     */
    async getFetch(url, header) {
        return this.netFetch(url, 'GET', null, null, header)
    }

    /**
     * 发起网络请求
     * @param url 请求url
     * @param method 请求方式
     * @param params 请求参数
     * @param json 是否需要json格式的参数请求
     * @param header 外加头
     * @return {Promise.<*>}
     */
    //let res = await Api.netFetch(url, 'GET', null, false, {Accept: 'application/.VERSION.raw'});
    // let res = await await Api.netFetch(url, 'GET', null, false, {Accept: 'application/vnd.github.mercy-preview+json'});
async netFetch(url, method = 'GET', params, json, header) {
        let isConnected = await NetInfo.isConnected.fetch().done;
        //网络错误
        if (!isConnected) {
            return {
                result: false,
                code: Code.NETWORK_ERROR,
                msg: I18n('netError')
            }
        }
        //Object.assign()方法---->特点：浅拷贝、对象属性的合并
        //var nObj = Object.assign({},obj,obj1);//花括号叫目标对象，后面的obj、obj1是源对象。
        // 对象合并是指：将源对象里面的属性添加到目标对象中去，若两者的属性名有冲突，后面的将会覆盖前面的
        let headers = {};
        if (header) {
            headers = Object.assign({}, headers, header)
        }

        //授权码
        if (!this.optionParams.authorizationCode) {
            //获取授权token
            let authorizationCode = await this.getAuthorization();
            if (authorizationCode)
                this.optionParams.authorizationCode = authorizationCode;
        }

        let requestParams;

        headers.Authorization = this.optionParams.authorizationCode;

        if (method !== 'GET') {
            //非get方法
            if (json) {
                requestParams = this.formParamsJson(method, params, headers)
            } else {
                requestParams = this.formParams(method, params, headers)
            }
        } else {
            //get方法
            requestParams = this.formParams(method, params, headers)
        }

        //超时管理
        let response = await this.requestWithTimeout(this.optionParams.timeoutMs, fetch(url, requestParams));

        if (__DEV__) {
            console.log('请求url: ', url);
            console.log('请求参数: ', requestParams);
            console.log('返回参数: ', response);
        }

        if (response && response.status === Code.NETWORK_TIMEOUT) {
            //网络超时
            return {
                result: false,
                code: response.status,
                data: handlerError(response.status, response.statusText),
            }
        }
        try {
            let responseJson = await response.json();
            if (response.status === 201 && responseJson.token) {
                this.optionParams.authorizationCode = 'token ' + responseJson.token;
                AsyncStorage.setItem(Constant.TOKEN_KEY, this.optionParams.authorizationCode);
            }

            if (response.status === 200 || response.status === 201) {
                //请求成功
                return {
                    result: true,
                    code: Code.SUCCESS,
                    data: responseJson,
                    headers: response.headers
                }
            }
        } catch (e) {
            console.log(e, url);
            return {
                data: response._bodyText,
                result: response.ok,
                code: response.status ? response.status : Code.NETWORK_JSON_EXCEPTION,
                response
            }
        }

        return {
            result: false,
            code: response.status,
            data: handlerError(response.status, response.statusText),
        }
    }

    /**
     * 清除授权
     */
    clearAuthorization() {
        this.optionParams.authorizationCode = null;
        AsyncStorage.removeItem(Constant.TOKEN_KEY);
    }


    /**
     * 获取授权token
     */
    async getAuthorization() {
        let token = await AsyncStorage.getItem(Constant.TOKEN_KEY);
        if (!token) {
            let basic = await AsyncStorage.getItem(Constant.USER_BASIC_CODE);
            if (!basic) {
                //提示输入账号密码
            } else {
                //通过 basic 去获取token，获取到设置，返回token
                return `Basic ${basic}`;
            }
        } else {
            this.optionParams.authorizationCode = token;
            return token;
        }

    }

    /**
     * 格式化json请求参数
     */
    formParamsJson(method, params, headers) {
        const body = JSON.stringify(params);
        const req = {
            method: method,
            headers: new Headers({
                'Content-Type': CONTENT_TYPE_JSON,
                ...(headers || {})
            }),
            body
        };
        return req
    }

    /**
     * 格式化表单请求参数
     */
    formParams(method, params, headers) {
        const str = [];
        for (let p in params) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
        }
        let body = null;
        if (str.length > 0) {
            body = str.join("&");
        }
        const req = {
            method: method,
            headers: new Headers({
                    'Content-Type': CONTENT_TYPE_FORM,
                    ...(headers || {})
                }
            ),
            body
        };
        return req
    }

    /**
     * 超时管理
     */
    requestWithTimeout(ms, promise) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                resolve({
                    status: Code.NETWORK_TIMEOUT,
                    message: I18n('netTimeout')
                })
            }, ms);
            promise.then(
                (res) => {
                    clearTimeout(timeoutId);
                    resolve(res);
                },
                (err) => {
                    clearTimeout(timeoutId);
                    resolve(err);
                }
            );
        })
    }

}

export default new HttpManager();


export const FSModule = {
    download: (opt, callback) => NativeModules.DownloadFileModule.download(opt, callback),
    onProgress: (callback) => DeviceEventEmitter.addListener('DownloadStatus', callback),
    installAPK: (filePath) => NativeModules.DownloadFileModule.installAPK(filePath),
    openFile: (filePath) => NativeModules.DownloadFileModule.openFile(filePath),
    STATUS_PAUSED: () => NativeModules.DownloadFileModule.STATUS_PAUSED,
    STATUS_PENDING: () => NativeModules.DownloadFileModule.STATUS_PENDING,
    STATUS_RUNNING: () => NativeModules.DownloadFileModule.STATUS_RUNNING,
    STATUS_SUCCESSFUL: () => NativeModules.DownloadFileModule.STATUS_SUCCESSFUL,
    STATUS_FAILED: () => NativeModules.DownloadFileModule.STATUS_FAILED,
    STATUS_BUSY: () => NativeModules.DownloadFileModule.STATUS_BUSY,
};