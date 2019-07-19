import React from "react"
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from "react-native"
import Modal from "react-native-little-modal"

const SCREEN_WIDTH: number = Dimensions.get("window").width

const Button = (props: any) => (
  <TouchableWithoutFeedback onPress={props.onPress}>
    <View style={[{ justifyContent: "center", alignItems: "center" }, props.style]}>
      <Text style={styles.btnText}>{props.title || "button"}</Text>
    </View>
  </TouchableWithoutFeedback>
)

interface State {

}

export default class Hello extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <View style={styles.root}>
        <Text style={{ fontSize: 16, color: "#333", paddingVertical: 20, }}>Hello Modal Demo</Text>
        <Button
          onPress={() => {
            Modal.open({
              animationType: "slide",
            }, (
                <View style={[styles.modalView, { width: SCREEN_WIDTH }]}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text>This is a slide modal</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={() => { Modal.hide() }} style={{ width: "100%" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: 50, borderTopWidth: 1, borderTopColor: "#eaeaea" }}>
                      <Text style={{ fontSize: 16, color: "#333" }}>hide</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ))
          }}
          title="modal slide open"
          style={styles.button}
        />

        <Button
          onPress={() => {
            Modal.open({
              animationType: "fade",
              maskClosable: true,
            }, (
                <View style={styles.modalView}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text>This is a fade modal</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={() => { Modal.hide() }} style={{ width: "100%" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: 50, borderTopWidth: 1, borderTopColor: "#eaeaea" }}>
                      <Text style={{ fontSize: 16, color: "#333" }}>hide</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ))
          }}
          title="modal fade open"
          style={styles.button}
        />
        <Button
          onPress={() => {
            Modal.alert("Alert", "this is a alert Modal", [
              {
                text: "confirm",
                onPress: () => { console.log('alert confirm') }
              }, {
                text: "cancel",
                onPress: () => {
                  Modal
                  Modal.alert("", "Are you sure cancel?", [
                    {
                      text: "yes"
                    }
                  ], "alert_key_2")
                }
              }
            ], "alert_key_1")
          }}
          title="modal alert"
          style={styles.button}
        />
        <Text style={{ fontSize: 16, color: "#333", paddingVertical: 20 }}>or create a special modal</Text>
        <Button
          onPress={() => {
            Modal.open({
              animationType: "fade",
              maskClosable: true,
              modalKey: "special-modal-key"
            }, (
                <View style={styles.modalView}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text>This is a modal with modalKey</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={() => { Modal.hide("special-modal-key") }} style={{ width: "100%" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: 50, borderTopWidth: 1, borderTopColor: "#eaeaea" }}>
                      <Text style={{ fontSize: 16, color: "#333" }}>hide with modalKey</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ))
          }}
          title="spcial modal open"
          style={styles.button}
        />
      </View>
    )
  }
}

// styles

const styles = StyleSheet.create({
  root: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    alignSelf: "center"
  },
  button: {
    width: SCREEN_WIDTH - 32,
    height: 50,
    marginHorizontal: 16,
    borderRadius: 4,
    backgroundColor: "#1890FF",
    marginBottom: 20,
  },
  btnText: {
    fontSize: 16,
    color: "#FFF",
  },

  modalView: {
    width: 300,
    height: 200,
    backgroundColor: "#FFF",
    borderRadius: 8,
    flexDirection: "column",
    alignItems: "center"
  },
})