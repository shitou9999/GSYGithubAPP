/**
 * Created by guoshuyu on 2017/11/7.
 */
import React, {Component} from 'react';
import {
    Scene,
    Router,
    Lightbox, Drawer
} from 'react-native-router-flux';
import DynamicPage from './components/DynamicPage'
import LoginPage from './components/LoginPage'
import MyPage from './components/MyPage'
import RecommendPage from './components/RecommendPage'
import PersonInfoPage from './components/PersonInfoPage'
import PhotoPage from './components/PhotoPage'
import AboutPage from './components/AboutPage'
import NotifyPage from './components/NotifyPage'
import IssueDetail from './components/IssueDetailPage'
import VersionPage from './components/ReleasePage'
import PersonPage from './components/PersonPage'
import CodeDetailPage from './components/CodeDetailPage'
import SettingPage from './components/SettingPage'
import RepositoryDetail from './components/RepositoryDetailPage'
import PushDetailPage from './components/PushDetailPage'
import TrendPage from './components/TrendPage'
import WebPage from './components/WebPage'
import SearchPage from './components/SearchPage'
import ListPage from './components/ListPage'
import TabIcon from './components/widget/TabIcon'
import TextInputModal from './components/common/CommonTextInputModal'
import CommentConfirmModal from './components/common/CommonConfirmModal'
import LoadingModal from './components/common/LoadingModal'
import CommonOptionModal from './components/common/CommonOptionModal'
import DrawerFilter from './components/widget/SearchDrawerFilter'
import CustomBackButton from './components/widget/CustomBackButton'
import CustomDrawerButton from './components/widget/CustomDrawerButton'
import SearchButton from './components/widget/CustomSearchButton'
import CommonIconButton from './components/common/CommonIconButton'
import styles from './style'
import I18n, {changeLocale} from './style/i18n'
import * as Constant from './style/constant'
import BackUtils from './utils/backUtils'
import {CommonMoreRightBtnPress, RepositoryDetailRightBtnPress} from './utils/actionUtils'

import WelcomePage from "./components/WelcomePage"
import {screenWidth, drawerWidth} from "./style/index";

/**
 * 全局路由
 * backAndroidHandler允许在Android中自定义控制返回按钮（可选）
 * https://www.cnblogs.com/lemonzwt/p/8182345.html
 */
const getRouter = () => {
    {/*Lightbox是用于将组件渲染在当前组件上Scene的组件 。与Modal不同，它将允许调整大小和背景的透明度*/}
    return (
        <Router
            getSceneStyle={() => {
                return styles.routerStyle
            }}
            backAndroidHandler={BackUtils()}>
            <Lightbox>
                <Scene key="root"
                       navigationBarStyle={styles.navigationBar}
                       titleStyle={{color: Constant.titleTextColor}}>
                    {/*欢迎页*/}
                    <Scene key="main">
                        <Scene key="WelcomePage" component={WelcomePage} hideNavBar hideTabBar hide/>
                    </Scene>
                    <Scene key="mainTabPage"
                           tabs
                           lazy
                           wrap={false}
                           showLabel={false}
                           tabBarPosition={"bottom"}
                           title={I18n('appName')}
                           renderRightButton={
                               //renderRightButton使用React组件显示导航栏的右侧按钮
                               () => <SearchButton/>
                           }
                           tabBarStyle={{
                               height: Constant.tabBarHeight,
                               alignItems: 'center',
                               justifyContent: 'center',
                               backgroundColor: Constant.tabBackgroundColor
                           }}>
                        {/*动态*/}
                        <Scene
                            key="DynamicPage"
                            component={DynamicPage}
                            icon={TabIcon}
                            title={I18n('tabDynamic')}
                            tabIconName={'tabDynamic'}
                        />
                        {/*推荐*/}
                        <Scene
                            key="TrendPage"
                            component={TrendPage}
                            icon={TabIcon}
                            title={I18n('tabRecommended')}
                            tabIconName={'tabRecommended'}
                        />
                        {/*我的*/}
                        <Scene
                            key="MyPage"
                            component={MyPage}
                            icon={TabIcon}
                            title={I18n('tabMy')}
                            tabIconName={'tabMy'}
                        />
                    </Scene>
                    {/*登陆*/}
                    <Scene key="LoginPage" component={LoginPage}
                           showLabel={false}
                           hideNavBar/>
                    {/*用户信息页面*/}
                    <Scene key="PersonPage" component={PersonPage}
                           needRightBtn={true}
                           rightBtn={'ios-more'}
                           iconType={2}
                           rightBtnPress={(params) => {
                               return CommonMoreRightBtnPress(params)
                           }}
                           renderRightButton={(params) => <CommonIconButton data={params}/>}
                           renderLeftButton={() => <CustomBackButton/>}/>
                    {/*设置*/}
                    <Scene key="SettingPage" component={SettingPage} title={I18n('setting')}
                           renderLeftButton={() => <CustomBackButton/>}
                    />
                    {/*多种数据列表*/}
                    <Scene key="ListPage" component={ListPage}
                           renderRightButton={(params) => <CommonIconButton data={params}/>}
                           renderLeftButton={() => <CustomBackButton/>}
                    />
                    {/*搜索右边侧边栏*/}
                    <Drawer key="SearchPageDrawer" title={I18n('search')}
                            contentComponent={DrawerFilter}
                            drawerPosition={'right'}
                            hideNavBar
                            drawerWidth={drawerWidth}
                            drawerIcon={<CustomDrawerButton/>}
                            renderLeftButton={() => <CustomBackButton/>}>
                        {/*搜索*/}
                        <Scene key="SearchPage" component={SearchPage}/>
                    </Drawer>
                    {/*仓库详情*/}
                    <Scene key="RepositoryDetail" component={RepositoryDetail}
                           needRightBtn={true}
                           rightBtn={'ios-more'}
                           iconType={2}
                           rightBtnPress={(params) => {
                               return RepositoryDetailRightBtnPress(params)
                           }}
                           renderRightButton={(params) => <CommonIconButton data={params}/>}
                           renderLeftButton={() => <CustomBackButton/>}
                    />
                    {/*Issue列表点击的详情*/}
                    <Scene key="IssueDetail" component={IssueDetail}
                           rightBtn={'ios-more'}
                           iconType={2}
                           rightBtnPress={(params) => {
                               return CommonMoreRightBtnPress(params)
                           }}
                           renderRightButton={(params) => <CommonIconButton data={params}/>}
                           renderLeftButton={() => <CustomBackButton/>}
                    />
                    {/*动态---提交----item详情*/}
                    <Scene key="PushDetailPage" component={PushDetailPage}
                           needRightBtn={true}
                           rightBtn={'ios-more'}
                           iconType={2}
                           rightBtnPress={(params) => {
                               return CommonMoreRightBtnPress(params)
                           }}
                           renderRightButton={(params) => <CommonIconButton data={params}/>}
                           renderLeftButton={() => <CustomBackButton/>}
                    />
                    {/*仓库发布列表*/}
                    <Scene key="VersionPage" component={VersionPage}
                           renderRightButton={(params) => <CommonIconButton data={params}/>}
                           renderLeftButton={() => <CustomBackButton/>}
                    />
                    {/*通知页面*/}
                    <Scene key="NotifyPage" component={NotifyPage}
                           title={I18n('notify')}
                           renderRightButton={(params) => <CommonIconButton data={params}/>}
                           renderLeftButton={() => <CustomBackButton/>}
                    />
                    {/*代码详情*/}
                    <Scene key="CodeDetailPage" component={CodeDetailPage}
                           title={I18n('notify')}
                           needRightBtn={true}
                           rightBtn={'ios-more'}
                           iconType={2}
                           rightBtnPress={(params) => {
                               return CommonMoreRightBtnPress(params)
                           }}
                           renderRightButton={(params) => <CommonIconButton data={params}/>}
                           renderLeftButton={() => <CustomBackButton/>}
                    />
                    {/*关于*/}
                    <Scene key="AboutPage" component={AboutPage}
                           title={I18n('about')}
                           renderLeftButton={() => <CustomBackButton/>}
                    />
                    {/*用户信息修改页面*/}
                    <Scene key="PersonInfoPage" component={PersonInfoPage}
                           title={I18n('about')}
                           renderLeftButton={() => <CustomBackButton/>}
                    />
                    <Scene key="WebPage" component={WebPage}
                           hideNavBar
                    />
                    <Scene key="PhotoPage" component={PhotoPage}
                           hideNavBar
                    />
                </Scene>
                {/*加载中Modal*/}
                <Scene key="LoadingModal" component={LoadingModal}/>
                {/*通用输入框modal*/}
                <Scene key="TextInputModal" component={TextInputModal}/>
                {/*确认弹出模态框*/}
                <Scene key="ConfirmModal" component={CommentConfirmModal}/>
                {/*通用配置item选择modal*/}
                <Scene key="OptionModal" component={CommonOptionModal}/>
                <Scene key="PhotoPage" component={PhotoPage}/>
            </Lightbox>
        </Router>
    )
};


export default getRouter;