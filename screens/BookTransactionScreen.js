import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class BookTransactionScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermission:null,
            scanned:false,
            scannedBookId:'',
            scannedStudentId:'',
            buttonState:'normal'
        }
    }
    getCameraPermission=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission:status==="granted",
            buttonState:'id',
            scanned:'false'

        })
    }
    handleBarCodeScanned=async(type,data)=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermission=this.state.hasCameraPermission;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState!='normal' && hasCameraPermission){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState==='normal'){


        return(
            <View style={styles.container}>
                <View>
                    <Image
                    source={require("../assets/booklogo.jpg")} style={{width:200,height:200}}/>
                   <Text style={{textAlign:'center',fontSize:30}}>Wily App</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputBox} placeholder="Book ID"
                    value={this.state.scannedBookId}/>
                    <TouchableOpacity
                    style={styles.scanButton}
                    onPress={()=>{
                        this.getCameraPermission("BookId")
                    }}>
                        <Text style={styles.qrText}>SCAN</Text>
                        </TouchableOpacity>
                </View>

                    <View style={styles.inputView}>
                    <TextInput style={styles.inputBox} placeholder="Student ID"
                    value={this.state.scannedStudentId}/>
             
                <TouchableOpacity style={styles.scanButton}
                onPress={()=>{
                        this.getCameraPermission("StudentId")
                    }}>
                    <Text style={styles.qrText}>SCAN</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    displayText:{
        color:'blue',
        fontSize:15,
        textDecorationLine:'underline',
     
    },
    scanButton:{
        marginTop:50,
        width:200,
        height:70,
        borderRadius:50,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',

    },
    qrText:{
        color:'blue',
        fontSize:15,
        textDecorationLine:'underline',
        alignItems:'center',
        justifyContent:'center',
    },
    inputView:{
        flexDirection:'row',
        margin:20,

    },
    inputBox:{
        width:200,
        height:50,
        borderWidth:1,

    }
})

