/**
 * Created by guoshuyu on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    View, Text, StatusBar, TextInput, InteractionManager, Keyboard, TouchableOpacity, StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import styles from "../style"
import * as Constant from "../style/constant"
import I18n from '../style/i18n'
import CodeFileItem from './widget/CodeFileItem'
import reposActions from '../store/actions/repository'
import PullListView from './widget/PullLoadMoreListView'
import PushDetailHeader from './widget/PushDetailHeader'
import * as Config from '../config'
import {generateCode2HTml, parseDiffSource} from "../utils/htmlUtils";

/**
 * 仓库提交推送详情
 * 动态---提交----item详情
 */
class PushDetailPage extends Component {

    constructor(props) {
        super(props);
        this._refresh = this._refresh.bind(this);
        this._loadMore = this._loadMore.bind(this);
        this.page = 2;
        this.state = {
            dataSource: [],
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            if (this.refs.pullList)
                this.refs.pullList.showRefreshState();
            this._refresh();
        })
    }

    componentWillUnmount() {

    }


    _renderRow(rowData, sectionID, rowID, highlightRow) {
        let nameSplit = rowData.filename.split("/");
        return (
            <CodeFileItem
                itemIcon={"code"}
                titleStyle={[styles.subSmallText, {fontSize: Constant.minTextSize}]}
                itemTextTitle={rowData.filename}
                itemText={nameSplit[nameSplit.length - 1]}
                onClickFun={() => {
                    let patch = rowData.patch;
                    if (!patch) {
                        //预览文件失败，可能文件类型不支持预览。
                        patch = I18n("fileNotSupport")
                    }
                    //代码item点击查看详情
                    Actions.CodeDetailPage({
                        title: nameSplit[nameSplit.length - 1],
                        ownerName: this.props.userName,
                        repositoryName: this.props.repositoryName,
                        branch: 'master',
                        lang: '',
                        needRequest: false,
                        detail: generateCode2HTml(parseDiffSource(patch), Constant.webDraculaBackgroundColor, '', false),
                        html_url: rowData.blob_url
                    })
                }}/>
        )
    }


    /**
     * 刷新
     * */
    _refresh() {
        let {sha} = this.props;
        //获取仓库的单个提交详情
        reposActions.getReposCommitsInfo(this.props.userName, this.props.repositoryName, sha)
            .then((res) => {
                if (res && res.result) {
                    this.setState({
                        pushDetail: res.data,
                        dataSource: res.data.files
                    });
                }
                Actions.refresh({titleData: res.data});
                return res.next();
            })
            .then((res) => {
                let size = 0;
                if (res && res.result) {
                    this.page = 2;
                    this.setState({
                        pushDetail: res.data,
                        dataSource: res.data.files
                    });
                    size = res.data.length;
                }
                if (this.refs.pullList) {
                    this.refs.pullList.refreshComplete((size >= Config.PAGE_SIZE), false);
                }
            });
    }

    /**
     * 加载更多
     * */
    _loadMore() {

    }


    render() {
        let {pushDetail} = this.state;
        let name = "";
        let pic = "";
        if (pushDetail) {
            if (pushDetail.committer) {
                name = pushDetail.committer.login;
            } else if (pushDetail.commit && pushDetail.commit.author) {
                name = pushDetail.commit.author.name;
            }
            if (pushDetail.committer && pushDetail.committer.avatar_url) {
                pic = pushDetail.committer.avatar_url;
            }
        }
        let header = (pushDetail) ?
            <PushDetailHeader
                actionUser={name}
                actionUserPic={pic}
                pushDes={"Push at " + pushDetail.commit.message}
                pushTime={pushDetail.commit.committer.date}
                editCount={pushDetail.files.length + ""}
                addCount={pushDetail.stats.additions + ""}
                deleteCount={pushDetail.stats.deletions + ""}/> : <View/>;
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                <View style={{height: 2, opacity: 0.3}}/>
                <PullListView
                    style={{flex: 1}}
                    ref="pullList"
                    enableRefresh={false}
                    renderRow={(rowData, sectionID, rowID, highlightRow) =>
                        this._renderRow(rowData, sectionID, rowID, highlightRow)
                    }
                    renderHeader={() => {
                        return header
                    }}
                    refresh={this._refresh}
                    loadMore={this._loadMore}
                    dataSource={this.state.dataSource}
                />
            </View>
        )
    }
}


PushDetailPage.propTypes = {
    repositoryName: PropTypes.string,
    userName: PropTypes.string,
};


PushDetailPage.defaultProps = {
    userName: '',
    repositoryName: '',
};

export default PushDetailPage