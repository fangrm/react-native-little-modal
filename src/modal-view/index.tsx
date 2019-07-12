import React, { Component } from "react";
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
  InteractionManager
} from "react-native";
import { Navigator } from "avocados";

const { height } = Dimensions.get('window')

const animationDuration = 300

interface ModalViewProps {
  isToast?: boolean;
  /**  */
  transparent?: true;
  /**  */
  visible: boolean;
  /**  */
  onRequestClose?: Function;
  /**  */
  animationType?: "fade" | "slide" | "none";
  /** modal关闭动画结束回调 */
  onModalHide?: () => void;
}

export default class IOSModalView extends Component<ModalViewProps, any> {
  private unmount: boolean = false
  private animDialog: any
  constructor(props) {
    super(props);
    this.state = {
      isDestory: false,
      visible: this.props.visible,
      animationSlide: new Animated.Value(0),
      animationFade: new Animated.Value(0),
    }
  }

  componentDidMount() {
    const { onRequestClose } = this.props
    if (onRequestClose) {
      Navigator.customBackHandler.push({
        key: "cModal",
        handler: onRequestClose
      })
    }
    if (this.state.visible) {
      this.show()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible !== nextProps.visible) {
      if (nextProps.visible) {
        this.show()
      } else {
        this.disMiss(this.disMissCallback)
      }
    }
  }

  componentWillUnmount() {
    const { onRequestClose } = this.props
    if (onRequestClose) {
      Navigator.deleteBackHandler("cModal")
    }
    this.unmount = true
  }

  render() {
    if (this.state.isDestory) return <View></View>
    return this.renderIos()
  }

  renderIos = () => {
    return (
      <Animated.View style={[styles.root,
      { opacity: this.state.animationFade },
      {
        transform: [{
          translateY: this.state.animationSlide.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0]
          }),
        }]
      },
      this.props.isToast ? { zIndex: 10000 } : {}
      ]}>
        {this.props.children}
      </Animated.View>
    );
  }

  show = (callback?: Function) => {
    if (this.props.animationType == 'fade') {
      this.animationFadeIn(callback)
    } else if (this.props.animationType == 'slide') {
      this.animationSlideIn(callback)
    } else {
      this.animationNoneIn(callback)
    }
  }

  disMiss = (callback?: Function) => {
    if (!this.unmount) {
      this.setState({
        visible: false,
      }, () => {
        if (this.props.animationType == 'fade') {
          this.animationFadeOut(callback)
        } else if (this.props.animationType == 'slide') {
          this.animationSlideOut(callback)
        } else {
          this.animationNoneOut(callback)
        }
      })
    }
  }

  disMissCallback = () => {
    const { onModalHide } = this.props
    if (!this.unmount) {
      this.setState({
        isDestory: true
      })
      onModalHide ? onModalHide() : null
    }
  }

  stopAnimation = () => {
    if (this.animDialog) {
      this.animDialog.stop();
      this.animDialog = null;
    }
  }

  animationNoneIn = (callback?: Function) => {
    this.state.animationSlide.setValue(1)
    this.state.animationFade.setValue(1)
    callback && callback()
  }

  animationNoneOut = (callback) => {
    callback && callback()
  }

  animationSlideIn = (callback?: Function) => {
    this.stopAnimation()
    this.setState({ visible: true }, () => {
      this.state.animationSlide.setValue(0)
      this.state.animationFade.setValue(1)
      this.animDialog = Animated.timing(this.state.animationSlide, {
        easing: Easing.linear,
        duration: animationDuration,
        toValue: 1,
      }).start(() => callback && callback());
    })
  }

  animationSlideOut = (callback?: Function) => {
    this.stopAnimation()
    this.state.animationSlide.setValue(1)
    this.state.animationFade.setValue(1)
    this.animDialog = Animated.timing(this.state.animationSlide, {
      easing: Easing.linear,
      duration: animationDuration,
      toValue: 0,
    }).start(() => callback && callback());
  }

  animationFadeIn = (callback?: Function) => {
    this.stopAnimation()
    this.setState({ visible: true }, () => {
      this.state.animationSlide.setValue(1)
      this.state.animationFade.setValue(0)
      this.animDialog = Animated.timing(this.state.animationFade, {
        easing: Easing.linear,
        duration: animationDuration,
        toValue: 1,
      }).start(() => callback && callback());
    })
  }

  animationFadeOut = (callback?: Function) => {
    this.stopAnimation()
    this.state.animationSlide.setValue(1)
    this.state.animationFade.setValue(1)
    this.animDialog = Animated.timing(this.state.animationFade, {
      easing: Easing.linear,
      duration: animationDuration,
      toValue: 0,
    }).start(() => callback && callback());
  }
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  }
})