import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props =>{
    return(
        <View style ={styles.cartItem}>
            <View style ={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                {props.deleteable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons 
                        name={Platform.OS === 'android' ? 'md-trash':'ios-trash'}
                        size={23}
                        color="red"
                    />
                </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent: 'space-between',
        marginHorizontal:20
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center'
    },
    quantity:{
        color:'#888',
        fontSize:16
    },
    title:{
        fontSize:16
    },
    amount:{
        fontSize:16
    },
    deleteButton:{
        marginLeft:20
    }
});

export default CartItem;