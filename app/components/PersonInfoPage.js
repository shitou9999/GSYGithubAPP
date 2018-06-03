/**
 * Created by guoshuyu on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    View, Text, StatusBar, ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from "../style"
import I18n from '../style/i18n'
import CommonRowItem from "./common/CommonRowItem";
import * as Constant from "../style/constant";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import loginActions from '../store/actions/login'
import userActions from '../store/actions/user'
import issueActions from "../store/actions/issue";
import Toast from "./common/ToastProxy";

/**
 * 用户信息修改页面
 */
class PersonInfoPage extends Component {

    constructor(props) {
        super(props);
        this.showEditModal = this.showEditModal.bind(this);
        this.postChanged = this.postChanged.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

//     onPress={() => {
//     if (this.text && this.text.trim().length > 0) {
//           Actions.pop();
//           this.props.textConfirm && this.props.textConfirm(this.text);
//       }
//   }}>
    showEditModal(title, text, postInfo) {
        Actions.TextInputModal({
            textConfirm: (text) => {
                postInfo(text);
            },
            titleText: title,
            bottomBar: false,
            needEditTitle: false,
            text: text,
            titleValue: ""
        })
    }

    postChanged(params) {
        Actions.LoadingModal({backExit: false});
        //更新用户信息
        userActions.updateUser(params)
            .then(() => {
                setTimeout((res) => {
                    Actions.pop();
                }, 500);
            });
    }

    render() {
        let {userState} = this.props;
        let userInfo = (userState.userInfo) ? userState.userInfo : {};
        let {name, email, blog, company, location, hireable, bio} = userInfo;
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                <ScrollView style={styles.flex}>
                    <CommonRowItem
                        showIconNext={true}
                        topLine={false}
                        bottomLine={false}
                        itemIcon={"info"}
                        nameText={I18n('infoName')}
                        textStyle={[styles.centered, styles.normalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        nameStyle={[styles.centered, styles.subNormalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        iconSize={20}
                        viewStyle={[{
                            borderRadius: 4, marginTop: Constant.normalMarginEdge,
                            paddingLeft: Constant.normalMarginEdge
                        }, styles.shadowCard]}
                        itemText={name ? name : "---"}
                        {/*名字*/}
                        onClickFun={() => {
                            this.showEditModal(I18n('infoName'), name ? name : "", (text) => {
                                this.postChanged({name: text});
                            })
                        }}/>
                    <CommonRowItem
                        showIconNext={true}
                        topLine={false}
                        bottomLine={false}
                        itemIcon={"mention"}
                        nameText={I18n('infoEmail')}
                        textStyle={[styles.centered, styles.normalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        nameStyle={[styles.centered, styles.subNormalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        iconSize={20}
                        viewStyle={[{
                            borderRadius: 4, marginTop: Constant.normalMarginEdge,
                            paddingLeft: Constant.normalMarginEdge
                        }, styles.shadowCard]}
                        itemText={email ? email : "---"}
                        {/*邮箱*/}
                        onClickFun={() => {
                            this.showEditModal(I18n('infoEmail'), email ? email : "", (text) => {
                                this.postChanged({email: text});
                            })
                        }}/>
                    <CommonRowItem
                        showIconNext={true}
                        topLine={false}
                        bottomLine={false}
                        itemIcon={"link"}
                        nameText={I18n('infoBlog')}
                        textStyle={[styles.centered, styles.normalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        nameStyle={[styles.centered, styles.subNormalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        iconSize={20}
                        viewStyle={[{
                            borderRadius: 4, marginTop: Constant.normalMarginEdge,
                            paddingLeft: Constant.normalMarginEdge
                        }, styles.shadowCard]}
                        itemText={blog ? blog : "---"}
                        {/*链接*/}
                        onClickFun={() => {
                            this.showEditModal(I18n('infoBlog'), blog ? blog : "", (text) => {
                                this.postChanged({blog: text});
                            })
                        }}/>
                    <CommonRowItem
                        showIconNext={true}
                        topLine={false}
                        bottomLine={false}
                        itemIcon={"organization"}
                        nameText={I18n('infoCompany')}
                        textStyle={[styles.centered, styles.normalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        nameStyle={[styles.centered, styles.subNormalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        iconSize={20}
                        viewStyle={[{
                            borderRadius: 4, marginTop: Constant.normalMarginEdge,
                            paddingLeft: Constant.normalMarginEdge
                        }, styles.shadowCard]}
                        itemText={company ? company : "---"}
                        {/*公司*/}
                        onClickFun={() => {
                            this.showEditModal(I18n('infoCompany'), company ? company : "", (text) => {
                                this.postChanged({company: text});
                            })
                        }}/>
                    <CommonRowItem
                        showIconNext={true}
                        topLine={false}
                        bottomLine={false}
                        itemIcon={"pin"}
                        nameText={I18n('infoLocation')}
                        textStyle={[styles.centered, styles.normalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        nameStyle={[styles.centered, styles.subNormalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        iconSize={20}
                        viewStyle={[{
                            borderRadius: 4, marginTop: Constant.normalMarginEdge,
                            paddingLeft: Constant.normalMarginEdge
                        }, styles.shadowCard]}
                        itemText={location ? location : "---"}
                        {/*位置*/}
                        onClickFun={() => {
                            this.showEditModal(I18n('infoLocation'), location ? location : "", (text) => {
                                this.postChanged({location: text});
                            })
                        }}/>
                    <CommonRowItem
                        showIconNext={true}
                        topLine={false}
                        bottomLine={false}
                        itemIcon={"note"}
                        nameText={I18n('infoBio')}
                        textStyle={[styles.centered, styles.normalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        nameStyle={[styles.centered, styles.subNormalText, {
                            textAlignVertical: 'center',
                            marginHorizontal: Constant.normalMarginEdge
                        }]}
                        iconSize={20}
                        viewStyle={[{
                            borderRadius: 4, marginTop: Constant.normalMarginEdge,
                            paddingLeft: Constant.normalMarginEdge
                        }, styles.shadowCard]}
                        itemText={bio ? bio : "---"}
                        {/*简介*/}
                        onClickFun={() => {
                            this.showEditModal(I18n('infoBio'), bio ? bio : "", (text) => {
                                this.postChanged({bio: text});
                            })
                        }}/>
                </ScrollView>
            </View>
        )
    }
}
//connect方法声明：作用：连接React组件与 Redux store。
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps],[options])
//参数说明：mapStateToProps(state, ownProps) : stateProps
// -----》这个函数允许我们将 store 中的数据作为 props 绑定到组件上。
// const mapStateToProps = (state) => {
//     return {
//         count: state.count
//     }
// }

// （1）这个函数的第一个参数就是 Redux 的 store，我们从中摘取了 count 属性。
// 你不必将state中的数据原封不动地传入组件，可以根据 state 中的数据，动态地输出组件需要的（最小）属性。
//
// （2）函数的第二个参数 ownProps，是组件自己的 props。有的时候，ownProps 也会对其产生影响。
//
// connect 的第二个参数是 mapDispatchToProps，
// ！！！！它的功能是，将action作为 props 绑定到组件上，也会成为MyComp的 props。！！！！
//state它可以是前后端的各种数据，也可以是UI上的一些信息
//store.dispatch(action)发出操作，更新state！！！！！！
//react-redux在redux的基础上，就关注两点：Provider和connect。
// Provider就是把我们用rudux创建的store传递到内部的其他组件。让内部组件可以享有这个store并提供对state的更新。
// 用store.dispatch(action)来发出操作,,将该方法绑定到属性上，我们同样可以在props查看和调用
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//我们只要在组件中调用该属性中的方法，就可以发出一个特定的action，触发reducer对state进行更新
//         changeActive:(args)=>dispatch({type:"changeTable",data:args})
//     }
// }

//用connect连接react组件和redux
export default connect(state => ({
    userState: state.user,
}), dispatch => ({
    loginAction: bindActionCreators(loginActions, dispatch),
    userAction: bindActionCreators(userActions, dispatch)
}))(PersonInfoPage)


/*
 export default connect(
 (state) => ({
 state: state.counter
 }),
 (dispatch) => ({
 actions: bindActionCreators(counterActions, dispatch)
 })
 )(CounterApp);
 代码等价于：
 var temp = connect(function(state) {
 return {
 state: state.counter
 };
 }, function(dispatch) {
 return {
 actions: bindActionCreators(counterActions, dispatch)
 };
 });

 export default temp(CounterApp);

 es7的修饰符可以很清楚的标识这种语法
 @connect((state) => {
 return {
 todos: state.todos
 }
 })
 export default class App extends Component {
 render(){
 return (  )
 }
 }

 ES6写法
 data () {
 return {
 msg: '数据'
 }
 }
 相当于
 data: function () {
 return {
 msg: '数据'
 }
 }

 */