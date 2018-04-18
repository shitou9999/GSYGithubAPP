/**
 * Created by guoshuyu on 2017/2/10.
 */

import React, {Component,} from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Constant from '../../style/constant'
import styles from '../../style'
import I18n from '../../style/i18n'
import Icon from 'react-native-vector-icons/Feather'


const config = {
    ["tabRecommended"]: 'activity',
    ["tabDynamic"]: 'aperture',
    ["tabMy"]: 'users',
};

/**
 * 底部Tab
 */
class TabIcon extends Component {

    constructor(props) {
        super(props)
    }
//flexDirection 布局中子视图排放的方向。有两个值：水平轴（row）,竖直轴（column）。默认是竖直轴。
//justifyContent子元素沿着主轴的排列方式。有五个值：flex-start、center、flex-end、space-around以及space-between。
// 默认是flex-start
    //align-items属性适用于所有的flex容器，它是用来设置每个flex元素在侧轴上的默认对齐方式。
    //align-items和align-content有相同的功能，不过不同点是它是用来让每一个单行的容器居中而不是让整个容器居中。
    //align-content属性只适用于多行的flex容器，并且当侧轴上有多余空间使flex容器内的flex线对齐。
    // 感觉这样翻译了  之后还是略微有些抽象，不过有一个重点就是多行，
    render() {
        let iconPath = config[this.props.tabIconName];
        let color = this.props.focused ? Constant.tabSelectedColor : Constant.tabUnSelectColor;
        return (
            <View style={styles.centered}>
                <Icon name={iconPath} size={Constant.tabIconSize} color={color}/>
                <Text style={[{color: color}, {fontSize: Constant.smallTextSize}]}>{this.props.title}</Text>
            </View>
        );
    }
}

const propTypes = {
    focused: PropTypes.bool,
    title: PropTypes.string,
    tabName: PropTypes.string,
    tabIconName: PropTypes.string,
};
TabIcon.propTypes = propTypes;

export default TabIcon;