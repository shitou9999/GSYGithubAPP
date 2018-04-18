/**
 * Created by guoshuyu on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    View, AppState, StatusBar, InteractionManager
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from "../style"
import I18n from '../style/i18n'
import loginActions from '../store/actions/login'
import userActions from '../store/actions/user'
import eventActions from '../store/actions/event'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getActionAndDes, ActionUtils} from '../utils/eventUtils'
import EventItem from './widget/EventItem'
import PullListView from './widget/PullLoadMoreListView'
import * as Config from '../config'
import {getNewsVersion} from './AboutPage'


/**
 * 动态 -> 我的关注，我的仓库
 */
class DynamicPage extends Component {

    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this._refresh = this._refresh.bind(this);
        this._loadMore = this._loadMore.bind(this);
        this._handleAppStateChange = this._handleAppStateChange.bind(this);
        this.startRefresh = this.startRefresh.bind(this);
        this.page = 1;
        this.appState = 'active';
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.startRefresh();
            getNewsVersion();
        });
        AppState.addEventListener('change', this._handleAppStateChange);

        /*setTimeout(() => {
            if (__DEV__) {
                Actions.SettingPage()
            }
        }, 1000)*/

    }
//AppState 来告知我们 App 当前的状态：激活（前台运行中）、还是后台运行。甚至可以通知我们状态的改变。
//     active - 应用正在前台运行
//     background - 应用正在后台运行。用户既可能在别的应用中，也可能在桌面。
// inactive - 此状态表示应用正在前后台的切换过程中，或是处在系统的多任务视图，又或是处在来电状态中。
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    startRefresh() {
        if (this.refs.pullList)
            this.refs.pullList.showRefreshState();
        this._refresh();
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
            if (this.refs.pullList)
                this.refs.pullList.scrollToTop();
            this.startRefresh();
        }
        this.appState = nextAppState;
    };

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        let res = getActionAndDes(rowData);
        return (
            <EventItem
                actionTime={rowData.created_at}
                actionUser={rowData.actor.display_login}
                actionUserPic={rowData.actor.avatar_url}
                des={res.des}
                onPressItem={() => {
                    ActionUtils(rowData)
                }}
                actionTarget={res.actionStr}/>
        )
    }

    /**
     * 刷新
     * */
    _refresh() {
        let {eventAction} = this.props;
        eventAction.getEventReceived(0, (res) => {
            this.page = 2;
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.refreshComplete((res && res.length >= Config.PAGE_SIZE));
                }
            }, 500);
        })
    }

    /**
     * 加载更多
     * */
    _loadMore() {
        let {eventAction} = this.props;
        eventAction.getEventReceived(this.page, (res) => {
            this.page++;
            setTimeout(() => {
                if (this.refs.pullList) {
                    this.refs.pullList.loadMoreComplete((res && res.length >= Config.PAGE_SIZE));
                }
            }, 300);
        });
    }


    render() {
        let {eventState, userState} = this.props;
        //数据
        let dataSource = (eventState.received_events_data_list);
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                <PullListView
                    style={{flex: 1}}
                    ref="pullList"
                    renderRow={(rowData, sectionID, rowID, highlightRow) =>
                        this._renderRow(rowData, sectionID, rowID, highlightRow)
                    }
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={dataSource}
                />
            </View>
        )
    }
}

//哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
//哪些 action 创建函数是我们想要通过 props 获取的？
//bindActionCreators是通过dispatch将action包裹起来，这样可以通过bindActionCreators创建的方法，
// 直接调用dispatch(action)(隐式调用）。
// let newAction = bindActionCreators(oldActionCreator,dispatch)
// （1）形参oldActionCreator.--------->这个参数就是创建的action的集合：
// （2）形参dispatch-------->这里的dispatch，等同于store中的store.dispatch，用于组合action
// 我们将组合oldAction和dispatch的对象传递给子组件，在子组件中，调用newAction.action1,
// 相当于实现了dispatch(action1)。于是我们就实现了在没有store和dispatch组件中，如何调用dispatch(action)

export default connect(state => ({
    userState: state.user,
    loginState: state.login,
    eventState: state.event,
}), dispatch => ({
    loginAction: bindActionCreators(loginActions, dispatch),
    userAction: bindActionCreators(userActions, dispatch),
    eventAction: bindActionCreators(eventActions, dispatch)
}))(DynamicPage)
