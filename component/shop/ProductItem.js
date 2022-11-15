import React from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Platform, TouchableNativeFeedback } from "react-native";
import Colors from "../../constant/Colors";

const ProductItem = props =>{
    let TouchableCmp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }

    return(
        
        <View style={stlyes.product}>
            <View style={stlyes.touchable}>
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={stlyes.imageContainer}> 
                            <Image style={stlyes.image} source={{uri:props.image}}/>
                        </View>
                        <View style={stlyes.detail}>
                            <Text style={stlyes.title}>{props.title}</Text>
                            <Text style={stlyes.price}>${props.price}</Text>
                        </View>
                        <View style={stlyes.actions}>
                            {props.children}
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </View>
        
    );
};

const stlyes = StyleSheet.create({
    product:{
        shadowColor: 'black',
        shadowOpacity:0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:200,
        margin:20
    },
    touchable:{
        borderRadius:10,
        overflow:'hidden'
    },
    image:{
        width:'100%',
        height:'100%'
    },
    imageContainer:{
        width:'100%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },
    detail:{
        alignItems:'center',
        height:'15%',
        padding:10
    },
    title:{
        fontSize: 16,
        marginVertical: 4
    },
    price:{
        fontSize:14,
        color:'#888'
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
});

export default ProductItem;