import * as React from 'react';
import {View, Text, Image, StyleSheet, Button, ScrollView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constant/Colors';
import { Platform } from 'react-native';
import * as cartActions from '../../store/actions/cart';


const ProductDetailScreen = props =>{
    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
    const dispatch = useDispatch();

    return(
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add To Cart" onPress={()=>{
                    dispatch(cartActions.addToCart(selectedProduct));
                }}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

export const screenOptions = navData =>{
    return{
        headerTitle:navData.route.params.productTitle,
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    };
};

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:300
    },
    actions:{
        marginVertical:10,
        alignItems:'center'
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20
    },
    description:{
        fontSize:14,
        textAlign:'center',
        marginHorizontal:20
    }
});

export default ProductDetailScreen;