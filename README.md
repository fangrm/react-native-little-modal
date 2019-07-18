## react-native-little-modal [![npm version](https://badge.fury.io/js/react-native-little-modal.svg)](http://badge.fury.io/js/react-native-little-modal)

------------------------

#### Features
1. Pure javascript solution, easy to install.
2. Both `android` and `ios` platform you can use.
3. Like the antd modal and it supports multiple modals.

#### Install

`npm install react-native-little-modal`

#### Usage

```
import Modal from 'react-native-little-modal';
```
```
Modal.open({
    animationType: "slide",
    maskClosable: true,
    contentWrapperStyle: {
      paddingBottom: 0,
    }
}, <CustomView />)
```

```
Modal.hide()
```
or
```
Modal.alert("title", "text", [
    {
        text: "confirm",
    },
    {
        text: "cancel"
    }
])
```

On ios platform, modal element created by this library can\`t cover other `native` Modal elements,like: [Official Modal Element](http://facebook.github.io/react-native/docs/modal.html#content)