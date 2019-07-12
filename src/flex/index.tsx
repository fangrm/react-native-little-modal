// 内容弹窗显示器
import * as React from "react";
import {
  View,
  TouchableWithoutFeedback,
  ViewProperties,
  GestureResponderEvent,
  ViewStyle
} from "react-native";

export interface FlexProps extends ViewProperties {
  onPress?: (e: GestureResponderEvent) => void;
  justify?: "start" | "end" | "center" | "between" | "around";
  align?: "start" | "end" | "center" | "between" | "around";
  direction?: "row" | "column";
  children?: React.ReactNode
}

export default class Flex extends React.Component<FlexProps, any> {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const {
      onPress,
      justify = "start",
      align ="center",
      direction = "row",
      style,
      ...restProps
    } = this.props;
    const flexStyleMap: any = {
      "start": "flex-start",
      "end": "flex-end",
      "center": "center",
      "between": "space-between",
      "around": "space-around",
    }
    const defaultStyle: ViewStyle = {
      justifyContent: flexStyleMap[justify],
      alignItems: flexStyleMap[align],
      flexDirection: direction,
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[defaultStyle, style]} {...restProps}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
