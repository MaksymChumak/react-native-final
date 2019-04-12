import React, { Component } from 'react';
import { View, Button, Image, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import {ImagePicker, Permissions} from 'expo';
import { ButtonGroup } from "react-native-elements";
import { LinearGradient } from 'expo';

export default class GalleryComponent extends Component {

    static defaultProps = {
        top:0,
        right:0,
        width:200,
        height:200,
    }

    static navigationOptions = {
        title: 'Gallery',
        headerStyle: {
            backgroundColor: '#586E58'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            image:null,
            top:this.props.top,
            right:this.props.right,
            width:this.props.width,
            height:this.props.height,
            hasCameraPermission: null,
        }
        this.updateImage = this.updateImage.bind(this);
    }

    _getCameraRollAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      };

    componentDidMount() {
        this._getCameraRollAsync();
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect:[5,5],
        });
        if (!result.cancelled){
            this.setState({
                image: result.uri
            })
        }
    }

    updateImage (selectedIndex) {
        if (selectedIndex == 0) {
            this.setState({right: this.state.right+5})
        } else if (selectedIndex == 1) {
            this.setState({right: this.state.right-5})
        } else if (selectedIndex == 2) {
            this.setState({top:this.state.top-5})
        } else if (selectedIndex == 3) {
            this.setState({top:this.state.top+5})
        } else if (selectedIndex == 4) {
            this.setState({
                width:this.state.width+5,
                height:this.state.height+5
            })
        } else if (selectedIndex == 5) {
            this.setState({
                width:this.state.width-5,
                height:this.state.height-5
            })
        }
    }

    render() {
        let {image} = this.state;
        if (image) image = image.replace('file://', '');
        console.log(image)

        const buttons = ['Left', 'Right', 'Up', 'Down', 'Bigger', 'Smaller']
        return <LinearGradient colors={["#76b852", "#8dc26f"]} style={StyleSheet.absoluteFill}>
            <View style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
            }}> 
                <View style={{
                flex:2,
                alignItems:'center',
                justifyContent:'center'
                }}>
                    <Button
                        title="Pick an image from camera roll"
                        onPress={this._pickImage}
                        color="#fff"
                        style={{fontWeight: "bold", fontSize: 24}}
                    />
                </View>
                <View  style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                    <ButtonGroup onPress={this.updateImage} buttons={buttons} containerStyle={styles.buttons} textStyle={{ color: "#e5e3e3" }} />
                </View>
                <View style={{
                flex:6,
                alignItems:'center',
                justifyContent:'center'
                }}>
                    {!image && <ActivityIndicator/>}
                    {image &&
                        <Image source={{
                            uri: image,
                        }} style ={{
                            width:this.state.width,
                            height:this.state.height,
                            top:this.state.top,
                            right:this.state.right,
                        }} />}
                </View>
            </View>
        </LinearGradient>;
    }
}

const styles = StyleSheet.create({
  buttons: { 
      flex: 1,
      marginLeft: Dimensions.get('window').width * 0.025,
      width: Dimensions.get('window').width * 0.95,
      backgroundColor: "#586E58"
    }
});
