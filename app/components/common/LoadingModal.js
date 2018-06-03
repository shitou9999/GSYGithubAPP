/**
 * Created by guoshuyu on 2017/11/12.
 */
import React, {Component} from 'react';
import {Text, View, BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import styles, {screenWidth, screenHeight} from "../../style/index"
import * as Constant from "../../style/constant"
import I18n from '../../style/i18n'
//这个组件比React Native 官方提供的Modal组件相比使用起来
//更舒服，有动人的弹出动画，渲染的背景比Modal要好，它是那种淡入淡出的，而Modal是生硬的推进的
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';
//https://www.jianshu.com/p/37428d579cf6
import {Actions} from "react-native-router-flux";


/**
 * 加载中Modal
 * 在ES6中，又新增加了4种，分别是：let，const，class和import。
 * 在let和const之间，优先使用const，尤其是只应该设置常量的全局环境
 * 我们一般推荐使用const来声明一个函数
 */
class LoadingModal extends Component {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    //执行一次，在初始化render之前执行，如果在这个方法内调用setState，render()知道state发生变化，并且只执行一次
    componentWillMount() {
    }

    //在初始化render之后只执行一次，在这个方法内，可以访问任何组件，componentDidMount()方法中的子组件
    // 在父组件之前执行，从这个函数开始，就可以和 JS 其他框架交互了，
    // 例如设置计时 setTimeout 或者 setInterval，或者发起网络请求
    componentDidMount() {
        if (this.refs.loginModal){
            this.refs.loginModal.open();
        }
        this.handle = BackHandler.addEventListener('loaddingBack', this.onClose)
    }

    //当组件要被从界面上移除的时候，就会调用componentWillUnmount(),在这个函数中，
    // 可以做一些组件相关的清理工作，例如取消计时器、网络请求等
    componentWillUnmount() {
        if (this.handle) {
            this.handle.remove();
        }
    }

    onClose() {
        Actions.pop();
        return true;
    }

    render() {
        // ref={"loginModal"}
        return (
            <Modal
                   ref = {(ref)=>{
                       this.loginModal = ref;
                   }}
                   style={[{height: screenHeight, width: screenWidth, backgroundColor: "#F0000000"}]}
                   position={"center"}
                   backButtonClose={false}
                   swipeToClose={this.props.backExit}
                   backdropOpacity={0.8}>
                <View style={[styles.centered, {flex: 1}]}>
                    <View>
                        <Spinner style={[styles.centered]}
                                 isVisible={true}
                                 size={50}
                                 type="9CubeGrid"
                                 color="#FFFFFF"/>
                        <Text style={styles.normalTextWhite}>{this.props.text}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}
//import PropTypes from 'prop-types';组件的参数类型检测！！！！！！！！！
//propTypes给组件的配置参数加上类型验证，
//就是说，传递进来的参数类型，我们有规定，如果不符合规定，就报错
//propTypes帮我们指定了参数类型，但并没有规定这个参数一定要传入，
//另外可以通过配置defaultProps，让它在不传入的时候有默认值。
// 如果在使用这个组件的时候，没有传入参数，那么依然会导致页面报错
//我们可以通过 isRequired 关键字来强制组件某个参数必须传入
// static propTypes = {
//     data: React.PropTypes.object.required
// };

LoadingModal.propTypes = {
    text: PropTypes.string,
    backExit: PropTypes.bool,
};
LoadingModal.defaultProps = {
    text: I18n('loading'),
    backExit: true,
};

// 使用let声明的变量：

// 隶属于块级作用域，块级作用域外不可见
// 不存在“变量提升”
// 同一作用域内不得存在名称相同的变量
// 当声明为全局变量时不会作为全局对象的属性

//用于导出这个模块
export default LoadingModal;