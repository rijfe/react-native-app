import React, {useState} from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { color } from "react-native-reanimated";
import Colors from "../../constant/Colors";

import CartItem from "./CartItem";

const OrderItem = props =>{
    const [showDetails, setShowDetails] = useState(false);

    return(
        <View style={styles.orderitem}>
            <View style={styles.summary}>
                <Text style={styles.totalamount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title={showDetails ? "Hide Detail":"Show Detail!"} onPress={()=>{
                setShowDetails(prevState => !prevState);    
            }}/>
            {showDetails && 
                <View style={styles.detailItems}>
                    {props.item.map(cartItem => 
                        <CartItem 
                            key={cartItem.productId}
                            quantity={cartItem.quantity} 
                            amount={cartItem.sum} 
                            title={cartItem.productTitle}/>)
                    }
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    orderitem:{
        shadowColor: 'black',
        shadowOpacity:0.26,
        shadowOffset: {width: 0, height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        margin:20,
        padding:10,
        alignItems:'center'
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    totalamount:{
        fontSize:16
    },
    date:{
        fontSize:16,
        color:'#888'
    },
    detailItems:{
        width:'100%'
    }
});

export default OrderItem;