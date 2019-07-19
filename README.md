## react-native-little-modal [![npm version](https://badge.fury.io/js/react-native-little-modal.svg)](http://badge.fury.io/js/react-native-little-modal)

------------------------

### Features
1. Pure javascript solution, easy to install.
2. Both `android` and `ios` platform you can use.
3. Like the antd modal and you can create multiple modals.

### Install

`npm install react-native-little-modal`

### Usage

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
        onPress: () => {},
        style: {color: "#333"}
    },
    {
        text: "cancel"
    }
])
```

### Available props
#### Modal.open(options, content)
- options

| Name                | Type                        | Default                     | Description                                                                                              |
|---------------------|-----------------------------|-----------------------------|----------------------------------------------------------------------------------------------------------|
| animationType       | "slide" or "fade" or "node" | "none"                      | Modal show animation                                                                                     |
| maskClosable        | Boolean                     | false                       | Close the modal when maskClosable is true                                                                |
| contentWrapperStyle | Style                       |                             | Extra style for content wrapper                                                                          |
| modalKey            | String                      | "react-native-little-modal" | A special key for the modal and you need to hide with this key                                           |
| onModalClose        | Function                    |                             | Callback when the modal will be closed|                                                                  |
| backgroundColor     | "black" or "transparent"    | black                       | Background color for modal                                                                               |
| useRNModal          | Boolean                     | android: true, ios: false   | warning: use it when you want to create top view, but on ios cannot create mutiple react native modals!| |

- content - any react element                                                                                     

#### Modal.alert(title, text, btns, modalKey)


| Name     | Type                                                      | Default                     | Description |
|----------|-----------------------------------------------------------|-----------------------------|-------------|
| title    | String or React.element                                   | ""                          | title       |
| text     | String or React.element                                   | ""                          | text        |
| btns     | {text: string, onPress?: () => void, style?: TextStyle}[] |                             | buttons     |
| modalKey | String                                                    | "react-native-little-modal" | modal key   |

### Warning

- On ios platform (if you don't use "useRNModal"), modal element created by this library can\`t cover other `native` Modal elements,like: [Official Modal Element](http://facebook.github.io/react-native/docs/modal.html#content)
- When you set useRNModal = true on ios platform, DO NOT CREATE MUTIPLE MODALS, or the app will crash! 🙃