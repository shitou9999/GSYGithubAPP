/**
 * Created by guoshuyu on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    View, Text, StatusBar
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from "../style"
import I18n from '../style/i18n'
import * as Constant from '../style/constant'
import {getLanguageCurrent, LanguageSelect} from '../utils/actionUtils'
import loginActions from '../store/actions/login'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import CommonRowItem from './common/CommonRowItem'
import {getRefreshHandler} from '../utils/actionUtils'
import {clearCache} from "../dao/db";

/**
 * 设置
 */
class SettingPage extends Component {

    constructor(props) {
        super(props);
        this.initLanguage = this.initLanguage.bind(this);
        this.state = {
            language: ""
        }
    }

    //在初始化render之后只执行一次，在这个方法内，可以访问任何组件，componentDidMount()方法中的
    // 子组件在父组件之前执行 从这个函数开始，就可以和 js 其他框架交互了，
    // 例如设置计时 setTimeout 或者 setInterval，或者发起网络请求
    componentDidMount() {
        this.initLanguage();
    }

    //当组件要被从界面上移除的时候，就会调用componentWillUnmount(),在这个函数中，
    // 可以做一些组件相关的清理工作，例如取消计时器、网络请求等
    componentWillUnmount() {

    }

    //当props发生变化时执行，初始化render时不执行，在这个回调函数里面，你可以根据属性的变化，
    // 通过调用this.setState()来更新你的组件状态，旧的属性还是可以通过this.props来获取,
    // 这里调用更新状态是安全的，并不会触发额外的render调用
    componentWillReceiveProps(newProps) {
        this.initLanguage();
    }

    initLanguage() {
        getLanguageCurrent().then((res) => {
            let language = (res && res.languageName) ? I18n(res.languageName) : I18n("systemLanguage");
            this.setState({
                language: language
            });
        })
    }

    render() {
        let {loginActions} = this.props;

        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                <CommonRowItem
                    showIconNext={true}
                    topLine={false}
                    bottomLine={false}
                    itemIcon={"person"}
                    textStyle={[styles.centered, styles.normalText, {
                        textAlignVertical: 'center',
                        marginHorizontal: Constant.normalMarginEdge
                    }]}
                    iconSize={20}
                    viewStyle={[{
                        borderRadius: 4, marginTop: Constant.normalMarginEdge,
                        paddingLeft: Constant.normalMarginEdge
                    }, styles.shadowCard]}
                    itemText={I18n('person')}
                    {/*进入个人信息*/}
                    onClickFun={() => {
                        Actions.PersonInfoPage();
                    }}/>
                <CommonRowItem
                    showIconNext={true}
                    topLine={false}
                    bottomLine={false}
                    textStyle={[styles.centered, styles.normalText, {
                        textAlignVertical: 'center',
                        marginHorizontal: Constant.normalMarginEdge
                    }]}
                    itemIcon={"clock"}
                    viewStyle={[{
                        borderRadius: 4, marginTop: Constant.normalMarginEdge,
                        paddingLeft: Constant.normalMarginEdge
                    }, styles.shadowCard]}
                    iconSize={20}
                    itemText={I18n('history')}
                    {/*进入历史页面*/}
                    onClickFun={() => {
                        Actions.ListPage({
                            dataType: 'history', showType: 'repository',
                            title: I18n('history')
                        })
                    }}/>
                <CommonRowItem
                    showIconNext={true}
                    topLine={false}
                    bottomLine={false}
                    itemIcon={"octoface"}
                    textStyle={[styles.centered, styles.normalText, {
                        textAlignVertical: 'center',
                        marginHorizontal: Constant.normalMarginEdge
                    }]}
                    iconSize={20}
                    viewStyle={[{
                        borderRadius: 4, marginTop: Constant.normalMarginEdge,
                        paddingLeft: Constant.normalMarginEdge
                    }, styles.shadowCard]}
                    itemText={I18n('about')}
                    {/*进入关于页面*/}
                    onClickFun={() => {
                        Actions.AboutPage();
                    }}/>
                <CommonRowItem
                    showIconNext={true}
                    topLine={false}
                    bottomLine={false}
                    itemIcon={"globe"}
                    textStyle={[styles.centered, styles.normalText, {
                        textAlignVertical: 'center',
                        marginHorizontal: Constant.normalMarginEdge
                    }]}
                    iconSize={20}
                    viewStyle={[{
                        borderRadius: 4, marginTop: Constant.normalMarginEdge,
                        paddingLeft: Constant.normalMarginEdge
                    }, styles.shadowCard]}
                    itemText={I18n('language') + ": " + this.state.language}
                    {/*弹出语言选择框*/}
                    onClickFun={() => {
                        Actions.OptionModal({
                            dataList: LanguageSelect(() => {
                                this.initLanguage();
                                let handler = getRefreshHandler();
                                handler.get(Constant.REFRESH_LANGUAGE) && handler.get(Constant.REFRESH_LANGUAGE)();
                            })
                        });
                    }}/>
                <CommonRowItem
                    showIconNext={true}
                    topLine={false}
                    bottomLine={false}
                    itemIcon={"broadcast"}
                    textStyle={[styles.centered, styles.normalText, {
                        textAlignVertical: 'center',
                        marginHorizontal: Constant.normalMarginEdge
                    }]}
                    iconSize={20}
                    viewStyle={[{
                        borderRadius: 4, marginTop: Constant.normalMarginEdge,
                        paddingLeft: Constant.normalMarginEdge
                    }, styles.shadowCard]}
                    itemText={I18n('clearCache')}
                    {/*清楚缓存*/}
                    onClickFun={() => {
                        clearCache()
                    }}/>
                <CommonRowItem
                    showIconNext={false}
                    topLine={false}
                    bottomLine={false}
                    textStyle={[styles.centered, styles.normalTextWhite, {textAlign: 'center'}]}
                    viewStyle={[styles.shadowCard, {
                        backgroundColor: "#cd2130",
                        borderRadius: 4,
                        marginTop: 2 * Constant.normalMarginEdge
                    }]}
                    itemText={I18n('LoginOut')}
                    {/*退出登陆*/}
                    onClickFun={() => {
                        Actions.reset("LoginPage");
                        loginActions.loginOut();
                    }}/>
            </View>
        )
    }
}
//mapStateProps的作用就是只绑定当前组件相关的state属性,,state的作用是从组件读取state属性
//return { text: state.text } //传入单一的属性
//return state.login   //传入当前组件的所有属性
//return state //传入所有的state属性

//export default connect(mapStateToProps,mapDispatchToProps)(MainPage);

//这个函数的意思就是告诉组件要绑定的action方法，不然组件是不知道该告诉谁去执行text的更新的。
//组件 =》（dispatch：告诉）=》action----》action收到----》告诉reducer去更新
//connect是把redux的状态和action传到组件就可以了
export default connect(state => ({state}), dispatch => ({
        loginActions: bindActionCreators(loginActions, dispatch)
    })
)(SettingPage)


// function mapStateToProps(state){
//     return state.main
// }
// function mapDispatchToProps(dispatch){
//     return bindActionCreators(action,dispatch)
// }
// export default connect(mapStateToProps,mapDispatchToProps)(App)





