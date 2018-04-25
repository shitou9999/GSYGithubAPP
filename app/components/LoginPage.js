/**
 * Created by guoshuyu on 2017/11/12.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Image,
    StatusBar,
    BackHandler,
    Keyboard,
    Linking
} from 'react-native';
import styles, {screenHeight, screenWidth} from "../style"
import * as Constant from "../style/constant"
import PropTypes from 'prop-types';
import I18n from '../style/i18n'

import loginActions from '../store/actions/login'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Modal from 'react-native-modalbox';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome'
import IconC from 'react-native-vector-icons/Entypo'
import {Fumi} from 'react-native-textinput-effects';
import Toast from './common/ToastProxy'

const animaTime = 600;

/**
 * 登陆Modal
 */
class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.userInputChange = this.userInputChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.toLogin = this.toLogin.bind(this);
        this.params = {
            userName: '',
            password: ''
        };
        this.state = {
            saveUserName: '',
            savePassword: '',
            secureTextEntry: true,
            secureIcon: "eye-with-line",
            opacity: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.onOpen();
        this.handle = BackHandler.addEventListener('hardwareBackPress-LoginPage', this.onClose);
        Animated.timing(this.state.opacity, {
            duration: animaTime,
            toValue: 1,
        }).start();
    }

    componentWillUnmount() {
        if (this.handle) {
            this.handle.remove();
        }
    }

    //获取当前登录用户的参数
    onOpen() {
        //then()方法是异步执行!!!!就是当.then()前的方法执行完后再执行then()内部的程序,,
        loginActions.getLoginParams().then((res) => {
            this.setState({
                saveUserName: res.userName,
                savePassword: res.password
            });
            this.params.userName = res.userName;
            this.params.password = res.password;
        });
    }

    onClose() {
        if (Actions.state.index === 0) {
            return false;
        }
        Animated.timing(this.state.opacity, {
            duration: animaTime,
            toValue: 0,
        }).start(Actions.pop());
        return true;

    }

    userInputChange(text) {
        this.params.userName = text;
    }

    passwordChange(text) {
        this.params.password = text;
    }

    exitLoading() {
        if (Actions.currentScene === 'LoadingModal') {
            Actions.pop();
        }
    }

    toLogin() {
        ///////////////////////////////////
        let {login} = this.props;

        if (!this.params.userName || this.params.userName.length === 0) {
            Toast(I18n('LoginNameTip'));
            return
        }
        if (!this.params.password || this.params.password.length === 0) {
            Toast(I18n('LoginPWTip'));
            return
        }
        this.setState({
            saveUserName: this.params.userName,
            savePassword: this.params.password
        });
        Actions.LoadingModal({backExit: false});
        Keyboard.dismiss();
        //登陆
        login.doLogin(this.params.userName, this.params.password, (res) => {
            this.exitLoading();
            if (!res) {
                Toast(I18n('LoginFailTip'));
            } else {
                Actions.reset("mainTabPage")
            }
        })
    }

    render() {
        let textInputProps = {
            style: {width: 250, height: 70, backgroundColor: Constant.miWhite},
            activeColor: Constant.primaryColor,
            passiveColor: '#dadada',
            iconClass: Icon,
            iconColor: Constant.primaryColor,
            iconSize: 25,
            clearButtonMode: "always"
        };
        return (
            <Animated.View
                style={[styles.centered, styles.absoluteFull, {backgroundColor: Constant.primaryColor}, {opacity: this.state.opacity}]}>
                <StatusBar hidden={false} backgroundColor={Constant.primaryColor} translucent
                           barStyle={'light-content'}/>
                <View
                    style={[{backgroundColor: Constant.miWhite}, {
                        height: 360,
                        width: screenWidth - 80,
                        margin: 50,
                        borderRadius: 10
                    }]}
                    onClosed={this.onClose}
                    onOpened={this.onOpen}>
                    <View style={[styles.centered, {marginTop: Constant.normalMarginEdge}]}>
                        <Image source={require("../img/logo.png")}
                               resizeMode={"contain"}
                               style={{width: 80, height: 80}}/>
                    </View>
                    <View style={[styles.centered, {marginTop: Constant.normalMarginEdge}]}>
                        <Fumi
                            ref={"userNameInput"}
                            {...textInputProps}
                            label={I18n('UserName')}
                            iconName={'user-circle-o'}
                            value={this.state.saveUserName}
                            onChangeText={this.userInputChange}
                        />
                    </View>
                    <View style={[styles.centered, {marginTop: Constant.normalMarginEdge}]}>
                        <Fumi
                            ref={"passwordInput"}
                            {...textInputProps}
                            label={I18n('Password')}
                            returnKeyType={'send'}
                            secureTextEntry={this.state.secureTextEntry}
                            password={this.state.secureTextEntry}
                            iconName={'keyboard-o'}
                            value={this.state.savePassword}
                            onChangeText={this.passwordChange}
                        />
                        <View style={[{
                            position: "absolute",
                            left: screenWidth - 150,
                            right: 2 * Constant.normalMarginEdge,
                            zIndex: 12,
                        }, styles.alignItemsEnd]}>
                            <TouchableOpacity style={[styles.centered, {
                                marginTop: Constant.normalMarginEdge,
                                padding: Constant.normalMarginEdge
                            }]}
                                              onPress={() => {
                                                  this.setState({
                                                      secureIcon: (this.state.secureTextEntry) ? "eye" : "eye-with-line",
                                                      secureTextEntry: !this.state.secureTextEntry,
                                                  });
                                              }}>
                                <IconC name={this.state.secureIcon}
                                       backgroundColor={Constant.transparentColor}
                                       color={Constant.primaryColor} size={13}
                                       style={styles.centered}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                    </View>
                    <TouchableOpacity style={[styles.centered, {marginTop: Constant.normalMarginEdge}]}
                                      onPress={() => {
                                          this.toLogin();
                                      }}>
                        <View
                            style={[styles.centered, {
                                backgroundColor: Constant.primaryColor,
                                width: 230,
                                marginTop: Constant.normalMarginEdge,
                                paddingHorizontal: Constant.normalMarginEdge,
                                paddingVertical: Constant.normalMarginEdge,
                                borderRadius: 5
                            }]}>
                            <Text style={[styles.normalTextWhite]}>{I18n('Login')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.centered, {marginTop: Constant.normalMarginEdge}]}
                                      onPress={() => {
                                          Linking.openURL("https://github.com/join")
                                      }}>
                        <Text
                            style={[styles.subSmallText,]}>{" " + I18n('register') + " "}</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    }
}

// Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）
// 传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。


//connect是真正的重点，意思是先接受两个参数
// （数据绑定mapStateToProps和事件绑定mapDispatchToProps），再接受一个参数（将要绑定的组件本身）

// Redux中的bindActionCreators，是通过dispatch将action包裹起来，
// 这样可以通过bindActionCreators创建的方法，直接调用dispatch(action)(隐式调用）。

// 主要用处：一般情况下，我们可以通过Provider将store通过React的connext属性向下传递，
// bindActionCreators的唯一用处就是需要传递action creater到子组件，并且改子组件并没
// 有接收到父组件上传递的store和dispatch。

//经过高阶组件包装后，每个组件都只会拥有仓库中属于自己的那部分数据，
// 并且属于每个组件的动作还会作为props分发给对应的组件。

// mapStateToProps（state, ownProps）
// mapStateToProps是一个函数，用于建立组件跟 store 的 state 的映射关系
// 作为一个函数，它可以传入两个参数，结果一定要返回一个 object

// 传入mapStateToProps之后，会订阅store的状态改变，在每次 store 的 state 发生变化的时候，都会被调用
// ownProps代表组件本身的props，如果写了第二个参数ownProps，那么当prop发生变化的时候，mapStateToProps也会被调用。
// 例如，当 props接收到来自父组件一个小小的改动，那么你所使用的 ownProps 参数，mapStateToProps 都会被重新计算）。
// mapStateToProps可以不传，如果不传，组件不会监听store的变化，也就是说Store的更新不会引起UI的更新

// mapDispatchToProps
// mapDispatchToProps用于建立组件跟store.dispatch的映射关系,可以是一个object，也可以传入函数
// 如果mapDispatchToProps是一个函数，它可以传入dispatch,ownProps, 定义UI组件如何发出action，
// 实际上就是要调用dispatch这个方法

//bindActionCreators() 可以自动把多个 action 创建函数 绑定到 dispatch() 方法上。
export default connect(state => ({state}), dispatch => ({
        login: bindActionCreators(loginActions, dispatch)
    })
)(LoginPage)