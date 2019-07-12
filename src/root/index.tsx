import * as React from "react";
import { View, DeviceEventEmitter, Keyboard } from "react-native";

// top view 事件
const TOP_VIEW_EVT_TYPE = {
  ADD: "add_top_view_el",
  REMOVE: "remove_top_view_el",
  REMOVEALL: "remove_all_top_views"
}

export interface TopViewElement {
  element: React.ReactNode;
  name: string;
}

export default class Root extends React.Component<any, any> {
  static set(element: TopViewElement) {
    DeviceEventEmitter.emit(TOP_VIEW_EVT_TYPE.ADD, element);
  }
  static remove(name: string) {
    DeviceEventEmitter.emit(TOP_VIEW_EVT_TYPE.REMOVE, name);
  }
  static removeAll() {
    DeviceEventEmitter.emit(TOP_VIEW_EVT_TYPE.REMOVEALL);
  }
  static elements = [] as TopViewElement[]

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      elements: [] as TopViewElement[],
    }
  }

  render() {
    const { elements = [] } = this.state;
    const list: React.ReactNode[] = elements.map(item => item.element);
    return (
      <React.Fragment>
        {!list.length ? null : list}
      </React.Fragment>
    )
  }

  componentWillMount() {
    Root.elements = []
    DeviceEventEmitter.addListener(TOP_VIEW_EVT_TYPE.ADD, this.setTopView.bind(this));
    DeviceEventEmitter.addListener(TOP_VIEW_EVT_TYPE.REMOVE, this.removeTopView.bind(this));
    DeviceEventEmitter.addListener(TOP_VIEW_EVT_TYPE.REMOVEALL, this.removeAllTopView.bind(this));
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners(TOP_VIEW_EVT_TYPE.ADD);
    DeviceEventEmitter.removeAllListeners(TOP_VIEW_EVT_TYPE.REMOVE);
    DeviceEventEmitter.removeAllListeners(TOP_VIEW_EVT_TYPE.REMOVEALL);
  }

  setTopView = (TopViewElement) => {
    const currents = Root.elements.filter(item => item.name !== TopViewElement.name);
    const newElements = [...currents, TopViewElement]
    Root.elements = newElements
    this.setState({
      elements: newElements,
    });
  }

  removeTopView = (name) => {
    const rest = Root.elements.filter(item => item.name !== name);
    Root.elements = [...rest]
    this.setState({
      elements: rest
    });
  }

  removeAllTopView = () => {
    this.setState({
      elements: []
    })
  }
}