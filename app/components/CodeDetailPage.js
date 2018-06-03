/**
 * Created by guoshuyu on 2017/11/10.
 */

import React, {Component} from 'react';
import {
    View, StatusBar, InteractionManager, BackHandler
} from 'react-native';
import PropTypes from 'prop-types';
import styles from "../style"
import I18n from '../style/i18n'
import reposActions from '../store/actions/repository'
import WebComponent from './widget/CustomWebComponent'
import {generateCode2HTml, formName, generateHtml, launchUrl} from '../utils/htmlUtils'
import {Actions} from 'react-native-router-flux';
import * as Constant from '../style/constant'

/**
 * 代码详情
 */
class CodeDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: this.props.detail
        };
        this._BackHandler = this._BackHandler.bind(this)
    }

    componentDidMount() {
        //InteractionManager(交互管理器)runAfterInteractions(): 在稍后执行代码，不会延迟当前进行的动画。
        //不过你可以用InteractionManager来确保在执行繁重工作之前所有的交互和动画都已经处理完毕。
        InteractionManager.runAfterInteractions(() => {
            // ...需要长时间同步执行的任务...
            if (this.props.needRequest) {
                // 获取仓库的文件列表
                reposActions.getReposFileDir(this.props.ownerName,
                    this.props.repositoryName, this.props.path, this.props.branch).then((res) => {
                        if (res && res.result) {
                            let startTag = `<div class="announce instapaper_body `;
                            let startLang = res.data.indexOf(startTag);
                            let endLang = res.data.indexOf(`" data-path="`);
                            let lang;
                            if (startLang >= 0 && endLang >= 0) {
                                let tmpLang = res.data.substring(startLang + startTag.length, endLang);
                                if (tmpLang) {
                                    lang = formName(tmpLang.toLowerCase());
                                }
                            }
                            if (__DEV__) {
                                console.log("Code Lang ", lang)
                            }
                            if (!lang) {
                                lang = this.props.lang
                            }
                            if ('markdown' === lang) {
                                this.setState({
                                    detail: generateHtml(res.data)
                                })
                            } else {
                                this.setState({
                                    detail: generateCode2HTml(res.data, Constant.webDraculaBackgroundColor, lang),
                                })
                            }
                        } else {
                            this.setState({
                                detail: "<h1>" + I18n("fileNotSupport") + "</h1>",
                            })
                        }
                        setTimeout(() => {
                            if (this.refs.pullList) {
                                this.refs.pullList.refreshComplete(false);
                            }
                        }, 500);
                    }
                )
            }
            Actions.refresh({titleData: {html_url: this.props.html_url}})
        });
        this.handle = BackHandler.addEventListener('CodeDetailPage-hardwareBackPress', this._BackHandler)
    }

    //监听函数是按倒序的顺序执行（即后添加的函数先执行）。如果某一个函数返回true，则后续的函数都不会被调用。
    // BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    // BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
//     同时又两个页面a和b（其中b页面后入栈）监听Android的back键事件，
// - 如果b页面中的监听函数 return true 的情况下，a页面就不会监听到back键事件了。
// - 如果b页面中的监听函数 return false 或者没有返回值，a页面也能监听到back事件。

    componentWillUnmount() {
        if (this.handle) {
            this.handle.remove();
        }
    }

    _BackHandler() {
        Actions.pop();
        return true
    }

    render() {
        let {detail} = this.state;
        return (
            <View style={[styles.mainBox]}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                <WebComponent
                    gsygithubLink={(url) => {
                        if (url) {
                            let owner = this.props.ownerName;
                            let repo = this.props.repositoryName;
                            let branch = this.props.branch ? this.props.branch : "master";
                            let currentPath = url.replace("gsygithub://.", "").replace("gsygithub://", "/");
                            let fixedUrl = "https://github.com/" + owner + "/" + repo + "/blob/" + branch + currentPath;
                            launchUrl(fixedUrl);
                        }
                    }}
                    source={{html: detail}}/>
            </View>
        )
    }
}


CodeDetailPage.propTypes = {
    path: PropTypes.string,
    ownerName: PropTypes.string,
    repositoryName: PropTypes.string,
    title: PropTypes.string,
    branch: PropTypes.string,
    detail: PropTypes.string,
    needRequest: PropTypes.bool,
    lang: PropTypes.string,
};


CodeDetailPage.defaultProps = {
    path: '',
    title: '',
    ownerName: '',
    repositoryName: '',
    branch: 'master',
    needRequest: true,
    lang: 'java',
};

export default CodeDetailPage