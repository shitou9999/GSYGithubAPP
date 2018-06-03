/**
 * Created by guoshuyu on 2017/11/10.
 */

import React, {Component, PureComponent} from 'react';
import {
    View, InteractionManager, StatusBar, Dimensions, StyleSheet
} from 'react-native';
import {Actions, Tabs} from 'react-native-router-flux';
import styles from "../style"
import * as Constant from "../style/constant"
import I18n from '../style/i18n'
import userActions from '../store/actions/user'
import WebComponent from './widget/CustomWebComponent'
import CommonBottomBar from './common/CommonBottomBar'
import IssueListPage from './RepositoryIssueListPage'
import RepositoryDetailActivity from './RepositoryDetailActivityPage'
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import ListPage from "./ListPage";

/**
 * 通知页面
 */
class NotifyPage extends Component {

    constructor(props) {
        super(props);
        this.page = 2;
        this._refresh = this._refresh.bind(this);
        this._asRead = this._asRead.bind(this);
        this._renderScene = this._renderScene.bind(this);
        this.state = {
            index: 0,
            routes: [
                {key: '1', title: I18n('notifyUnread')},
                {key: '2', title: I18n('notifyParticipating')},
                {key: '3', title: I18n('notifyAll')},
            ],
        }
    }

    //在该方法中，React会使用render方法返回的虚拟DOM对象创建真实的DOM结构，可以在这个方法中获取DOM节点
    componentDidMount() {
    }

    //组件将要被挂载
    componentWillUnmount() {
        //？？？？？？？？？？？？
        this.props.backNotifyCall && this.props.backNotifyCall()
    }

    //已加载组件收到新的props之前调用,注意组件初始化渲染时则不会执行
    componentWillReceiveProps(newProps) {
        if (newProps && newProps.type === "allRead") {
            newProps.type = "";
            this._refresh();
        }
    }

    _refresh() {
        //获得当前的组件
        if (this.unReadList)
            this.unReadList._refresh();
        if (this.partList)
            this.partList._refresh();
        if (this.allList)
            this.allList._refresh();
    }

    _handleIndexChange = index => this.setState({index});


    _asRead(id) {
        //设置单个通知已读
        userActions.setNotificationAsRead(id)
            .then(() => {
                this._refresh();
            })
    }

    _renderHeader = props =>
        <TabBar {...props}
                style={{backgroundColor: Constant.primaryColor}}
                labelStyle={{color: Constant.white}}
                indicatorStyle={{backgroundColor: Constant.miWhite}}
        />;

    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                return (
                    <ListPage
                        {/*当组件被渲染后，ref属性ref就有值啦，然后我们将它赋值给this.unReadList*/}
                        ref={(ref) => {
                            this.unReadList = ref;
                        }}
                        dataType={'notify'}
                        showType={'notify'}
                        onItemClickEx={this._asRead}
                        currentUser={this.props.ownerName}
                        currentRepository={this.props.repositoryName}
                    />
                );
            case '2':
                return (
                    <ListPage
                        ref={(ref) => {
                            this.partList = ref;
                        }}
                        dataType={'notify'}
                        showType={'notify'}
                        onItemClickEx={this._asRead}
                        participating={true}
                        currentUser={this.props.ownerName}
                        currentRepository={this.props.repositoryName}
                    />
                );
            case '3':
                return (
                    <ListPage
                        ref={(ref) => {
                            this.allList = ref;
                        }}
                        dataType={'notify'}
                        showType={'notify'}
                        onItemClickEx={this._asRead}
                        all={true}
                        currentUser={this.props.ownerName}
                        currentRepository={this.props.repositoryName}
                    />
                );
            default:
                return null;
        }
    };


    render() {
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                <TabViewAnimated
                    style={{flex: 1,}}
                    lazy={true}
                    swipeEnabled={false}
                    navigationState={this.state}
                    renderScene={this._renderScene.bind(this)}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={{
                        height: 0,
                        width: Dimensions.get('window').width,
                    }}
                />
            </View>
        )
    }
}

NotifyPage.defaultProps = {};


export default NotifyPage