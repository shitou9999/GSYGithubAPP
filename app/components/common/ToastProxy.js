import React, {Component} from 'react';
import Toast from 'react-native-root-toast'

/**
 * 文本提示框 react-native-root-toast
 * 纯javascript解决方案，免去了原生安装的各种繁杂步骤，直接一行npm install react-native-root-toast --save搞定
 * 同时兼容iOS和Android，使用完全一致的接口，不用再为同时兼容两个平台再写额外的代码
 * 可以自定义toast的各类属性（显示时间、位置、延时、动画、阴影等）
 * 同时支持两种调用形式（可以使用API调用，也可以作为Component直接放在render里面进行控制）
 *
 * export与export default均可用于导出常量、函数、文件、模块等
 * 你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用
 * *********在一个文件或模块中，export、import可以有多个，export default仅有一个!!!!!!!!!!
 * 通过export方式导出，在导入时要加{ }，export default则不需要
 *  https://www.cnblogs.com/xiaotanke/p/7448383.html
 *
 */
export default function toast(text, duration = Toast.durations.SHORT, position = Toast.positions.CENTER) {
    // static show = (message, options = {position: positions.BOTTOM, duration: durations.SHORT}) => {
    //     return new RootSiblings(<ToastContainer
    //         {...options}
    //         visible={true}
    //     >
    //         {message}
    //     </ToastContainer>);
    // };

//     var name="李四";
//     export { name }
// //import { name } from "/.a.js"
//     可以写成：
// var name="李四";
//     export default name
// //import name from "/.a.js" 这里name不需要大括号
//     在一个文件或模块中，export、import可以有多个，export default仅有一个，也就是说如下代码：
//     var name1="李四";
//     var name2="张三";
//     export { name1 ,name2 }
//     也可以写成如下，也是可以的，import跟他类似。
//     var name1="李四";
//     var name2="张三";
//     export name1;
//     export name2;

    return Toast.show(text, {
        duration: duration,
        position: position,
        shadow: true,
        animation: true,// toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true,// 是否可以通过点击事件对toast进行隐藏
        delay: 0,// toast显示的延时
        onShow: () => {
            // toast出现回调（动画开始时）
        },
        onShown: () => {
            // toast出现回调（动画结束时）
        },
        onHide: () => {
            // toast隐藏回调（动画开始时）
        },
        onHidden: () => {
            // toast隐藏回调（动画结束时）
        }
    });
}

export function hideToast(toast) {
    //Toast.hide(toast)
    setTimeout(function () {
        Toast.hide(toast)
    },500)
}
