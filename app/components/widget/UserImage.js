import React, {Component,} from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';

/**
 * 用户头像
 */
export default class UserImage extends Component {
// TouchableWithoutFeedback：响应用户的点击事件，如果你想在处理点击事件的同时不显示任何视觉反馈，
// 使用它是个不错的选择。
// TouchableHighlight：在TouchableWithoutFeedback的基础上添加了当按下时背景会变暗的效果。
// TouchableOpacity：相比TouchableHighlight在按下去会使背景变暗的效果，TouchableOpacity会在用户
// 手指按下时降低按钮的透明度，而不会改变背景的颜色。
// TouchableNativeFeedback：在Android上还可以使用TouchableNativeFeedback，它会在用户手指按下时
// 形成类似水波纹的视觉效果。注意，此组件只支持Android。

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Actions.PersonPage({currentUser: this.props.loginUser})
                }}>
                <Image source={{uri: this.props.uri}}
                       resizeMethod="scale"
                       style={[...this.props.style]}/>
            </TouchableWithoutFeedback>
        )
    }
}

UserImage.propTypes = {
    loginUser: PropTypes.string,
    uri: PropTypes.string,
};