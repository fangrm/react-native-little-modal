import { StyleSheet, Dimensions } from "react-native";
// import * as Theme from "../theme";

const { height, width } = Dimensions.get("window");

export const maskColor = "rgba(0, 0, 0, 0.5)"

export default StyleSheet.create({
  background: {
    width: width,
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: maskColor,
  },
  contentWrapper: {
    width: width,
    flex: 1,
    // paddingBottom: Theme.IPHONE_X_LANDSCOPE
  },
  backgroundTransparent: {
    backgroundColor: "transparent"
  },

  alertWrapper: {
    width: width * 0.75,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  alertContent: {
    width: "100%",
    minHeight: 102,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  alertTitle: {
    width: "100%",
    paddingBottom: 16,
  },
  titleText: {
    fontSize: 18,
    color: "#000",
    lineHeight: 18,
  },
  contentText_noTitle: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    textAlign: "center",
  },
  contentText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 26,
    textAlign: "left"
  },
  btnsWrapper: {
    width: "100%",
  },
  btn_1: {
    flex: 1,
    height: 48,
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
  },
  btn_3: {
    width:"100%",
    height: 48,
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
  },
  btnText_1: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  btnText_2: {
    fontSize: 16,
    color: "#E33333",
    lineHeight: 22,
  },
  btnText_3: {
    fontSize: 16,
    color: "#1890FF",
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: "#EAEAEA",
  },
});
