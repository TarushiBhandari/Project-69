import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component{

    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    getCameraPermission=async ()=>{
        const {status}= await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermissions: status==='granted', 
            buttonState: 'clicked'});
    }

    handleBarCodeScan=async ({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render(){
        const hasCameraPermissions= this.state.hasCameraPermissions;
        const buttonState= this.state.buttonState;

        if(buttonState==='clicked' && hasCameraPermissions){
            return (
                <BarCodeScanner
                    onBarCodeScanned= {scanned? undefined:this.handleBarCodeScan}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }else if(buttonState==='normal')
        {
            return(
                <View style={{
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: 20,
                        alignText: 'center',
                        marginTop: 200
                    }}>
                        {hasCameraPermissions ?this.state.scannedData:'Request Camera Permission'}
                    </Text>
    
                    <TouchableOpacity style={{
                        backgroundColor: 'yellow',
                        padding: 10,
                        margin: 100,
                        borderRadius: 10
                    }} onPress={this.getCameraPermission}>
                    
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            margin: 20
                        }}>
                            Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            )
        }  
    }
}