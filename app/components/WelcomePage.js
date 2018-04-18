/**
 * Created by guoshuyu on 2017/11/7.
 */

import React, {Component} from 'react';
import {
    View, Image, StatusBar, Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles, {screenHeight, screenWidth} from "../style"
import I18n from '../style/i18n'

import loginActions from '../store/actions/login'
import userActions from '../store/actions/user'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Constant from "../style/constant"
import SplashScreen from './widget/native/SplashNative'

/**
 * 欢迎页
 */
class WelcomePage extends Component {

    constructor(props) {
        super(props);
        this.toNext = this.toNext.bind(this);
    }

//then()方法是异步执行!!!!就是当.then()前的方法执行完后再执行then()内部的程序,,
// 这样就避免了，数据没获取到等的问题
//最主要的,是解决了异步方法立刻返回的问题  这个特性带来的后遗症, 假设我要等异步处理完了,
// 再去执行一段代码(后续代码) ,怎么做？定义一个全局flag,  异步处理完成更新flag,
//然后把  后续代码放到setInterval里面,  执行完后续代码还得关闭interval  ,多麻烦.    使用then()就简单明了了

    componentDidMount() {
        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }
        //是否登陆，初始化用户信息
        userActions.initUserInfo()
            .then((res) => {
                this.toNext(res)
            });
    }

    componentWillUnmount() {
    }

    toNext(res) {
        setTimeout(() => {
            if (res && res.result) {
                //reset清除路由堆栈并将场景推入第一个索引. 没有过渡动画。
                Actions.reset("mainTabPage");
            } else {
                Actions.reset("LoginPage");
            }
        }, 1000);
    }

    render() {
        return (
            <View style={[styles.mainBox, {backgroundColor: Constant.white}]}>
                <StatusBar hidden={true}/>
                <View style={[styles.centered, {flex: 1}]}>
                    <Image source={require("../img/welcome.png")}
                           resizeMode={"contain"}
                           style={{width: screenWidth, height: screenHeight}}/>
                </View>
            </View>
        )
    }
}
//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
    return {
        // counter: state.counter
    }
};
//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // increment: (...args) => dispatch(actions.increment(...args)),
        // decrement: (...args) => dispatch(actions.decrement(...args))
    }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
// export default connect(mapStateToProps, mapDispatchToProps)(Counter)

//connect是真正的重点，意思是先接受两个参数
// （数据绑定mapStateToProps和事件绑定mapDispatchToProps），再接受一个参数（将要绑定的组件本身）

//import loginActions from '../store/actions/login' 登陆action
export default connect(state => ({
    state
}), dispatch => ({
    actions: bindActionCreators(loginActions, dispatch),
}))(WelcomePage)
