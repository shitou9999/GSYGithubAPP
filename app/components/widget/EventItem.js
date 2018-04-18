/**
 * Created by guoshuyu on 2017/11/11.
 */
import React, {Component,} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../style'
import * as Constant from '../../style/constant'
import {Actions} from 'react-native-router-flux';
import I18n from '../../style/i18n'
import loginActions from '../../store/actions/login'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TimeText from './TimeText'
import UserImage from './UserImage'

/**
 * 事件列表Item
 * 我的和推荐列表item
 */
class EventItem extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
        let {actionTime, actionUser, actionUserPic, actionMode, actionTarget} = this.props;
        let bottomDes = (this.props.des) ?
            <Text style={[styles.subSmallText, {marginTop: Constant.normalMarginEdge,}]}
                  numberOfLines={Constant.normalNumberOfLine}>
                {this.props.des}
            </Text> : <View/>;
        let pic = (actionUserPic) ?
            <UserImage
                uri={actionUserPic}
                loginUser={actionUser}
                resizeMethod="scale"
                style={[{
                    height: Constant.smallIconSize, width: Constant.smallIconSize,
                    marginTop: 5, marginRight: Constant.normalMarginEdge / 2, borderRadius: Constant.smallIconSize / 2
                }]}
            /> : <View/>;
        return (
            <TouchableOpacity
                style={[{
                    marginTop: Constant.normalMarginEdge,
                    marginLeft: Constant.normalMarginEdge,
                    marginRight: Constant.normalMarginEdge,
                    padding: Constant.normalMarginEdge,
                    borderRadius: 4,
                }, styles.shadowCard]}
                {/*执行传的事件*/}
                onPress={() => {
                    this.props.onPressItem && this.props.onPressItem();
                }}
            >
                {/*flexDirection默认排列为竖轴排列*/}
                <View style={[styles.flexDirectionRowNotFlex,]}>
                    {pic}
                    <View style={[styles.flex, styles.centerH, styles.flexDirectionRowNotFlex]}>
                        <Text style={[styles.flex, styles.smallText, {fontWeight: "bold",}]}>
                            {actionUser}
                        </Text>
                        <TimeText style={[styles.subSmallText, {marginTop: -20}]} time={actionTime}/>
                    </View>
                </View>
                <View style={[styles.flexDirectionRowNotFlex, {marginTop: Constant.normalMarginEdge}]}>
                    <Text style={[styles.smallText, {fontWeight: "bold"}]}>{actionTarget}</Text>
                </View>
                {bottomDes}
            </TouchableOpacity>
        )
    }
}

const propTypes = {
    actionTime: PropTypes.string,
    actionUser: PropTypes.string,
    actionUserPic: PropTypes.string,
    actionMode: PropTypes.string,
    actionTarget: PropTypes.string,
    des: PropTypes.string,
    onPressItem: PropTypes.func,
};

EventItem.propTypes = propTypes;

export default connect(state => ({
    state
}), dispatch => ({
    actions: bindActionCreators(loginActions, dispatch)
}))(EventItem)