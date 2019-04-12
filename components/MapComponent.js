import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Dimensions, Image } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Permissions from "react-native-permissions";
// https://www.mapquestapi.com/geocoding/v1/address?key=lMGA4JJTNMA2NmvIn9GNEyg4lU32GTv4&inFormat=kvp&outFormat=json&location=******&thumbMaps=false
export default class MapComponent extends Component {

        static navigationOptions = {
        title: 'Maps',
        headerStyle: {
            backgroundColor: '#586E58'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
        }
    }
    constructor() {
        super();
        this.state = {
            region: {
                latitude: 0,
                latitudeDelta: 0,
                longitude: 0,
                longitudeDelta: 0
            },
            locationPermission: "unknown"
        };
    }



    fetchLocation(location){
        fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=lMGA4JJTNMA2NmvIn9GNEyg4lU32GTv4&inFormat=kvp&outFormat=json&location=${location}*&thumbMaps=false`)
        .then((response) => response.json())
        .then((response) => {
            this.setState({
                region: {
                    latitude: response.results[0].locations[0].latLng.lat,
                    latitudeDelta: 0.025,
                    longitude: response.results[0].locations[0].latLng.lng,
                    longitudeDelta: 0.025
                }
            });
        })
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
      };

    componentDidMount() {
        this._getLocationAsync();
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
              region: {
                latitude: position.coords.latitude,
                latitudeDelta: 0.025,
                longitude: position.coords.longitude,
                longitudeDelta: 0.025
              }
            });
        },
            (error) => alert(JSON.stringify(error)));
    }
    render() {
        return (
            <View>
                <View style={styles.top}>
                    <TextInput style={{
                    height:'100%',
                    width:'100%',
                    borderColor:'gray',
                    borderWidth:1,
                    textAlign:'center'
                    }}
                    placeholder="Enter a Destination"
                    onSubmitEditing={(event)=> this.fetchLocation(event.nativeEvent.text)}
                    />
                </View>
                <MapView
                //liteMode 
                key={`map_1`}
                region={this.state.region}
                style={styles.bot}>
                
                <Marker coordinate={this.state.region}>
                    <Image style={{width:50, height:50}} source={require("../assets/solar.gif")} resizeMode="cover" />
                </Marker>
                <Circle center={this.state.region} radius={500} />
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    },
    top:{
        height:Dimensions.get('window').height*.1,
        width: Dimensions.get('window').width,
    },
    bot:{
        height:Dimensions.get('window').height*.9,
        width: Dimensions.get('window').width,
    }
})