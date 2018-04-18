/**
 * Created by guoshuyu on 2017/11/12.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import styles, {screenWidth, screenHeight} from "../../style/index"
import * as Constant from "../../style/constant"
import Modal from 'react-native-modalbox';
import {Actions} from "react-native-router-flux";
//声明了就必须立马赋值不然会抛SyntaxError: Missing initializer in const declaration
const width = screenWidth - 100;
const itemHeight = 50;
//const和let一样，也只能在所在的{}范围内有效，超出了也会抛出Uncaught ReferenceError: Wjj is not defined
//和let一样 他也必须先申明，后使用。
/**
 * 通用配置item选择modal
 */
class CommonOptionModal extends Component {
//constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
// 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);// 手动绑定this
        this._renderItem = this._renderItem.bind(this);
        // this.state = {number: 0};
        // this.setState({
        //     number: ++this.state.number
        // });
    }

    componentDidMount() {
        if (this.refs.modal)
            this.refs.modal.open();
    }

    componentWillUnmount() {
    }

    //每次render方法的调用，不会重新创建一个新的事件响应函数，没有额外的性能损失。
    // 但是，使用这种方式要在构造函数中为作为事件响应的方法(onClose)，手动绑定this
    // ES6 Class 的方法默认不会把this绑定到当前的实例对象上，需要我们手动绑定
    onClose() {
        Actions.pop();
        return true;
    }

    _renderItem(data) {
        return (
            <TouchableOpacity
                style={[styles.centered, {width: width, height: itemHeight}, styles.centerH, data.itemStyle]}
                onPress={() => {
                    Actions.pop();
                    data.itemClick && data.itemClick(data);
                }}
                key={data.itemName}>
                <Text style={[styles.normalText]}>{data.itemName}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        let {dataList} = this.props;
        let items = [];
        dataList.forEach((data) => {
            items.push(this._renderItem(data))
        });
        let sumHeight = itemHeight * items.length + 2;
        let currentHeight = (sumHeight >= screenHeight) ? screenHeight : sumHeight;
        return (
            <Modal ref={"modal"}
                   style={[{height: screenHeight, width: screenWidth, backgroundColor: "#F0000000"}]}
                   position={"center"}
                   onClosed={this.onClose}
                   backdrop={true}
                   backButtonClose={false}
                   swipeToClose={true}
                   backdropOpacity={0.8}>
                <View style={[styles.centered, {height: screenHeight, width: screenWidth}]}>
                    <View style={[styles.centered, {height: currentHeight, width: screenWidth}]}>
                        <ScrollView style={[{
                            backgroundColor: Constant.white,
                            borderRadius: 4,
                            width: width,
                        }]}>
                            {items}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }
}

CommonOptionModal.propTypes = {
    dataList: PropTypes.array,
};


CommonOptionModal.defaultProps = {
    dataList: [],
};

export default CommonOptionModal;