import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ButtonGroup, Text } from "react-native-elements";
import { LinearGradient } from 'expo';
import * as Animatable from 'react-native-animatable'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#586E58'
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
        this.updateIndex = this.updateIndex.bind(this);
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
        if (selectedIndex === 0) {
            this.props.navigation.navigate("Maps");
        } else if (selectedIndex === 1) {
            this.props.navigation.navigate("Animation");
        }
        else if (selectedIndex === 2) {
          this.props.navigation.navigate("Photos");
        }
    }

    render() {
        const buttons = ['Maps', 'Animation', 'Gallery']

        return <LinearGradient colors={["#76b852", "#8dc26f"]} style={StyleSheet.absoluteFill}>
            <View style={styles.container}>
                <Animatable.View animation="zoomInDown" duration={2000} style={styles.textView}>
                <Text style={{ color: "#e5e3e3", textAlign: "center" }} h1>
                    React-Native
                </Text>
                <Text style={{ color: "#e5e3e3", textAlign: "center" }} h1>
                    Final
                </Text>
                </Animatable.View>
                <ButtonGroup onPress={this.updateIndex} buttons={buttons} containerStyle={styles.buttons} textStyle={{ color: "#e5e3e3" }} />
            </View>
          </LinearGradient>;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textView: {
      flex: 1, 
      alignContent: "center", 
      justifyContent: "center", 
      backgroundColor: "transparent" 
  },
  buttons: { 
      position: 'absolute',
      marginLeft: screenWidth * 0.025,
      bottom: 25,
      width: screenWidth * 0.95,
      backgroundColor: "#586E58"
    }
});