/**
 * Created by guoshuyu on 2017/11/11.
 */
import  React, {Component,} from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import * as Constant from '../../style/constant'
import styles from '../../style/index'
import Icon from 'react-native-vector-icons/EvilIcons'
import IconC from 'react-native-vector-icons/Octicons'


/**
 * 通用行Item
 * ICONS是可以直接使用图片名, 就能加载图片的三方,使用很方便, 你不需要在工程文件夹里塞各种图片
 * 组件对外公开一个简单的属性（Props）来实现功能，外部忽略内部实现细节
 *
 */
class CommonRowItem extends Component {

//React中的每一个组件，都包含有一个属性（props），属性主要是从父组件传递给子组件的，
//在组件内部，我们可以通过this.props获取属性对象

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View/>
        )
    }

    //let声明变量，但是所声明的变量，只在let命令所在的代码块{}内有效。
    // 不存在变量提升。
    // let不允许在相同作用域内，重复声明同一个变量
    //react语法中的...三个点要怎样理解--------->把数组全部展开!!!!!!!!!!
    //var array = [1,2,3,4,5,6,7];
    //console.log(array);
    //输出 [1, 2, 3, 4, 5, 6, 7]
    // console.log(...array);
    //输出 1 2 3 4 5 6 7
    render() {
        let {onClickFun, itemText, showIconNext, textStyle, nameStyle,
            topLine, bottomLine, itemIcon, iconSize, nameText} = this.props;
        let IconComponent = (showIconNext) ?
            <Icon name={Constant.nextIcon} size={Constant.smallIconSize} color={Constant.primaryColor}/>
            : <View/>;
        let tl = (topLine) ? StyleSheet.hairlineWidth : 0;
        let bl = (bottomLine) ? StyleSheet.hairlineWidth : 0;
        let leftIcon = (itemIcon) ?
            <IconC name={itemIcon} size={iconSize ? iconSize : 13} color={Constant.primaryColor}/>
            : <View/>;
        let leftText = (nameText) ?
            <Text style={[...nameStyle]}>{nameText}</Text>
            : <View/>;
        return (
            <TouchableOpacity
                {/*item点击*/}
                onPress={() => {
                    onClickFun && onClickFun()
                }}
                style={[{
                    minHeight: 50, marginLeft: Constant.normalMarginEdge, marginRight: Constant.normalMarginEdge,
                }, ...this.props.viewStyle]}>
                <View style={[styles.flexDirectionRow, styles.centerH,
                    {borderTopWidth: tl, borderTopColor: Constant.lineColor},
                    {borderBottomWidth: bl, borderBottomColor: Constant.lineColor},]}>
                    {leftIcon}
                    {leftText}
                    <Text style={[{flex: 1}, ...textStyle]}>{itemText}</Text>
                    {IconComponent}
                </View>
            </TouchableOpacity>
        );
    }
}

const propTypes = {
    itemText: PropTypes.string,
    onClickFun: PropTypes.func,
    showIconNext: PropTypes.bool,
    topLine: PropTypes.bool,
    bottomLine: PropTypes.bool,
    itemIcon: PropTypes.string,
    iconSize: PropTypes.number,
    itemIconColor: PropTypes.string,
    nameText: PropTypes.string,
    itemIconSize: PropTypes.number,
    textStyle: PropTypes.any,
    viewStyle: PropTypes.array,
};
CommonRowItem.propTypes = propTypes;
CommonRowItem.defaultProps = {
    showIconNext: true,
    topLine: true,
    bottomLine: true,
    textStyle: styles.smallText,
    itemIconColor: Constant.primaryColor,
    itemIconSize: Constant.smallIconSize,
    viewStyle: [],
};

export default CommonRowItem;