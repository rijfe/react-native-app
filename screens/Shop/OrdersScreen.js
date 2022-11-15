import React from "react";
import { Text,FlatList, Platform} from 'react-native';
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from "../../constant/Colors";
import HeaderButton from '../../component/UI/HeaderButton';
import OrderItem from "../../component/shop/OrderItem";

const OrdersScreen = props =>{
    const orders = useSelector(state => state.orders.orders);

    return(
        <FlatList 
            data={orders} 
            keyExtractor={item=>item.id} 
            renderItem={itemData=>
                <OrderItem 
                    amount ={itemData.item.totalAmount} 
                    date={itemData.item.readableDate}
                    item={itemData.item.items}
                />
            }
        />
    );
};

export const screenOptions = navData =>{
    return{
        headerTitle:"Your Orders",
        headerLeft:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu':'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer();}}/>
            </HeaderButtons>
        ),
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    };
};

export default OrdersScreen;