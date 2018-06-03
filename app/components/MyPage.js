/**
 * Created by guoshuyu on 2017/11/10.
 */

import React, {Component} from 'react';
import {InteractionManager} from 'react-native';
import loginActions from '../store/actions/login'
import userActions from '../store/actions/user'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import BasePersonPage from "./widget/BasePersonPage";

/**
 * 我的
 */
class MyPage extends BasePersonPage {

    constructor(props) {
        super(props);
        this.refreshUnRead = this.refreshUnRead.bind(this);
        this.showType = 0;
    }

    //Interactionmanager可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行。
    // 这样可以保证JavaScript动画的流畅运行。
//     requestAnimationFrame(): 用来执行在一段时间内控制视图动画的代码
//     setImmediate/setTimeout/setInterval(): 在稍后执行代码。注意这有可能会延迟当前正在进行的动画。
//     runAfterInteractions(): 在稍后执行代码，不会延迟当前进行的动画。
    componentDidMount() {
        super.componentDidMount();
        InteractionManager.runAfterInteractions(() => {
            // ...耗时较长的同步的任务...
            this.refreshUnRead();
            this._getOrgsList();
        });
    }

    _refresh() {
        super._refresh();
        this.refreshUnRead();
        //then()方法是异步执行!!!!就是当.then()前的方法执行完后再执行then()内部的程序,,
        userActions.getUserInfo().then((res)=>{
            if(__DEV__) {
                console.log("***MyPage***", res)
            }
        })
    }

    getBackNotifyCall() {
        this.refreshUnRead();
    }


    refreshUnRead() {
        //获取用户相关通知
        userActions.getNotifation(false, false, 0).then((res) => {
            if (res && res.result && res.data && res.data.length > 0) {
                this.setState({
                    unRead: true,
                });
            } else {
                this.setState({
                    unRead: false,
                })
            }
        })
    }

    getUserInfo() {
        let {userState} = this.props;
        return (userState.userInfo) ? userState.userInfo : {};
    }

    getSetting() {
        return true
    }

    getSettingNeed() {
        return true
    }
}
// 调用了bindActionCreators方法把action绑定到了connect方法中，其中connect方法的作用
// 是连接react组件和redux store，也就是说通过connect方法子组件可以获取store中的state和dispatch

// bindActionCreators的作用是将一个或多个action和dispatch组合起来生成mapDispatchToProps需要生成的内容。

// containers中的App.js中使用redux的connect方法获取store中的state数据和dispatch方法，
// 然后action中声明好类型，然后再通过js事件去触发导出的action方法，因为在bindActionCreators
// 方法中已经把actions和dispatch合并（相当于dispatch({type:type.ADD_ITEM, text})），
// 这样就相当于在containers中这样调用dispatch去改变store中的数据：
//
// store.dispatch({ type: types.ADD_ITEM, text })
//
// 这样也就理解了redux说的state在其他地方是只读的，只有store中可以修改的概念了。

//经过高阶组件包装后，每个组件都只会拥有仓库中属于自己的那部分数据，
// 并且属于每个组件的动作还会作为props分发给对应的组件。

// mapDispatchToProps用于建立组件跟store.dispatch的映射关系,可以是一个object，也可以传入函数
//要触发这个 action 必须 在store 上调用 dispatch 方法。
// 为了不让 组件感知到 dispatch 的存在，我们需要将函数包装一下，
// 使之成为直接可被调用的函数（即，调用该方法就会触发 dispatch ）。

// bindActionCreator可以直接将action包装成可以被调用的函数！！！！！！！！
export default connect(state => ({
    userState: state.user,
}), dispatch => ({
    // 如果mapDispatchToProps是一个函数，它可以传入dispatch,ownProps,
    // 定义UI组件如何发出action，实际上就是要调用dispatch这个方法
    // getProjectList: (page) => dispatch(projectActions.getProjectList(page)),
    loginAction: bindActionCreators(loginActions, dispatch),
    userAction: bindActionCreators(userActions, dispatch)
}))(MyPage)