// 内容弹窗显示器
import * as React from "react";
import {
  View,
  Modal as RNModal,
  Text,
  TouchableOpacity,
  InteractionManager,
  TextStyle,
  ViewStyle,
  ImageStyle,
  Platform
} from "react-native";
import MyModal from "./modal-view";
import Flex from "./flex";
import Root from "../modal-wrapper/root";
import RootSiblings from "react-native-root-siblings";
import styles from "./styles";

const isIOS = Platform.OS === "ios"

let isModalInit = false

const defaultKey = "modal_content_wrapper"
let modalMap: any = {};
// const TouchableFlex = Flex as any;

// const contentTopOffset: number = Theme.SCREEN_HEIGHT * 0.15;
// const contentHeight: number = Theme.SCREEN_HEIGHT - contentTopOffset;

export interface btnProps {
  text: string,
  style?: TextStyle,
  onPress?: Function,
}

export interface ModalWrapperProps {
  /** key */
  modalKey?: string;
  /**  */
  isToast?: boolean
  /** 动画 */
  animationType?: "none" | "slide" | "fade";
  /** 硬件回退键触发 */
  onRequestClose?: (evt?: any) => void;
  /** 清除节点 */
  removeFromRoot?: (key?: string) => void;
  /** modal 关闭回调 */
  onModalClose?: (evt?: any) => void;
  content?: React.ReactNode;
  /** Modal背景色 / 遮罩层 */
  backgroundColor?: "black" | "transparent";
  /** 点击蒙层关闭 */
  maskClosable?: boolean;
  // /** 横屏配置 */
  // supportedOrientations?: 'portrait' | 'portrait-upside-down' | 'landscape' | 'landscape-left' | 'landscape-right'
  /** 使用RN Modal */
  useRNModal?: boolean;
  /**  */
  contentWrapperStyle?: TextStyle | ViewStyle | ImageStyle;
}

export class ModalWrapper extends React.Component<ModalWrapperProps, any> {
  static defaultProps = {
    useRNModal: !isIOS // ios默认不使用RNModal
  }
  public unmount: boolean = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: true
    };
  }
  render() {
    const { visible } = this.state;
    const isSlideUp = this.props.animationType === "slide"
    const {
      isToast,
      content,
      animationType,
      onRequestClose = () => { this.onClose() },
      backgroundColor = "black",
      maskClosable = false,
      useRNModal,
      contentWrapperStyle,
    } = this.props;
    
    const wrapperStyle = [
      styles.background,
      backgroundColor === "transparent" ? styles.backgroundTransparent : {}
    ];
    /** 阻止事件冒泡，会影响到 content 里面的手势监听，例如scrollView */
    let processContent = maskClosable ? (
      <TouchableOpacity activeOpacity={1} disabled={false}>
        <TouchableOpacity activeOpacity={1} disabled={false}>
          {content}
        </TouchableOpacity>
      </TouchableOpacity>
    ) : content

    const Modal = useRNModal ? RNModal : MyModal
    return (
      <React.Fragment>
        {
          visible && <View style={wrapperStyle} />
        }
        <Modal
          isToast={isToast && isIOS}
          visible={visible}
          transparent={true}
          animationType={animationType || "none"}
          onRequestClose={onRequestClose}
          onModalHide={!useRNModal && this.onModalHide}
        >
          <Flex
            onPress={maskClosable && this.onClose}
            direction="column"
            justify={isSlideUp ? "end" : "center"}
            style={[styles.contentWrapper, contentWrapperStyle || {}]}
          >
            {isSlideUp && (
              <Flex style={{ flex: 1, width: "100%" }} onPress={this.onClose} />
            )}
            {processContent}
          </Flex>
        </Modal>
      </React.Fragment>
    );
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  onClose = () => {
    if (this.props.onModalClose) {
      this.props.onModalClose();
    }
    /** 开始执行关闭操作 */
    this.close()
  }

  close = () => {
    const { useRNModal, modalKey } = this.props
    if (!this.unmount) {
      if (modalMap[modalKey]) {
        modalMap[modalKey] = null
      }
      this.setState({
        visible: false
      }, () => {
        if (useRNModal) {
          InteractionManager.runAfterInteractions(() => {
            this.props.removeFromRoot(modalKey)
          })
        }
      })
    }
  };

  /** 非RNModal等待动画结束后再销毁节点 */
  onModalHide = () => {
    const { modalKey } = this.props
    this.props.removeFromRoot(modalKey)
  }
}

function removeFromRoot(key?: string) {
  const modalKey = key || defaultKey
  // if (!modalMap[modalKey]) return
  Root.remove(modalKey)
  // modalMap[modalKey] = null
}

function modalShow(options: ModalWrapperProps, content: any) {
  /** 清空toast */
  // Toast.hide()
  // AntdToast.hide()
  const modalKey = options.modalKey || defaultKey
  if (modalMap[modalKey]) {
    removeFromRoot(modalKey)
  }
  const useRNModal = options.useRNModal === undefined ? !isIOS : options.useRNModal
  /** 多modal层叠时处理遮罩层 */
  let backgroundColor = options.backgroundColor
  Object.keys(modalMap).forEach((key) => {
    if (!!modalMap[key]) {
      backgroundColor = "transparent"
    }
  })
  const cb = () => {
    Root.set({
      name: modalKey,
      element: (
        <ModalWrapper
          modalKey={modalKey}
          key={modalKey}
          ref={component => {
            modalMap[modalKey] = component;
          }}
          {...options}
          content={content}
          removeFromRoot={removeFromRoot}
          backgroundColor={backgroundColor}
        />
      )
    });
  }
  /** RNModal在ios下只能有1个，必须确定清空其它RNModal后才能创建新的RNModal */
  useRNModal ? InteractionManager.runAfterInteractions(cb) : cb()
}

export default {
  open(options: ModalWrapperProps, content: React.ReactElement<any>) {
    if (!isModalInit) {
      new RootSiblings(<Root />)
      isModalInit = true
    }
    modalShow(options, content);
  },
  hide(key?: string) {
    const modalKey = key || defaultKey
    if (modalMap[modalKey]) {
      modalMap[modalKey].close();
    }
  },
  alert(
    title: React.ReactText | React.ReactElement<Text> | null,
    content: React.ReactText | React.ReactElement<Text>,
    btns: btnProps[],
    key?: string
  ) {
    const container = (
      <Flex style={styles.alertWrapper} direction="column">
        <Flex style={styles.alertContent} direction="column" justify="center">
          {!!title &&
            <Flex style={styles.alertTitle} justify="center">
              <Text style={styles.titleText}>{title}</Text>
            </Flex>
          }
          <Text style={title ? styles.contentText : styles.contentText_noTitle}>{content}</Text>
        </Flex>
        {
          btns.length > 2 ?
            <Flex style={styles.btnsWrapper} direction="column">
              {
                btns.map((btn, i) => {
                  return (
                    <Flex
                      key={i}
                      onPress={() => {
                        const modalKey = key || defaultKey
                        const modal = modalMap[modalKey]
                        modal && modal.close()
                        btn.onPress ? btn.onPress() : null
                      }}
                      style={styles.btn_3}
                      justify="center"
                    >
                      <Text style={[styles.btnText_3, btn.style]}>{btn.text}</Text>
                    </Flex>
                  )
                })
              }
            </Flex>
            :
            <Flex style={styles.btnsWrapper}>
              {
                btns.map((btn, i) => {
                  let extraStyle = null
                  if (i === 1) extraStyle = styles.borderLeft
                  return (
                    <Flex
                      key={i}
                      onPress={() => {
                        const modalKey = key || defaultKey
                        const modal = modalMap[modalKey]
                        modal && modal.close()
                        btn.onPress ? btn.onPress() : null
                      }}
                      style={[styles.btn_1, extraStyle]}
                      justify="center"
                    >
                      <Text style={[styles[`btnText_${i + 1}`], btn.style]}>{btn.text}</Text>
                    </Flex>
                  )
                })
              }
            </Flex>
        }
      </Flex>
    )
    modalShow({
      animationType: "fade",
      useRNModal: false,
      modalKey: key || defaultKey,
      maskClosable: true,
    }, container)
  },
  removeAll() {
    Root.removeAll()
  }
};
