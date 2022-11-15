import React from "react";
import { FlatList,Platform, Button,Alert } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../component/shop/ProductItem';
import Colors from "../../constant/Colors";
import HeaderButton from '../../component/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

const UserProductScreen = props =>{
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler =id=>{
        props.navigation.navigate('EditScreen', {productId: id});
    };

    const deleteHandler = (id) =>{
        Alert.alert('Are you sure?', 'Do you really want to delete this item?',[
            {text:'No',style:'default' },
            {text:'Yes',style:'destructive', onPress:()=>{dispatch(productsActions.deleteProduct(id))} }
        ]);
    };


    return(
        <FlatList 
            data={userProducts} 
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={()=>{}}
                >
                    <Button 
                        color={Colors.primary} 
                        title = "Edit" 
                        onPress={()=>{editProductHandler(itemData.item.id);}}
                    />
                    <Button 
                        color={Colors.primary} 
                        title = "Delete" 
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                    />
                </ProductItem>
            }
        />
    );
};

export const screenOptions = navData =>{
    return{
        headerTitle:"Your Products",
        headerLeft:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu':'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer();}}/>
            </HeaderButtons>
        ),
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Add' iconName={Platform.OS === 'android' ? 'md-create':'ios-create'} onPress={()=>{navData.navigation.navigate('EditScreen',{prouductId:"p1"});}}/>
            </HeaderButtons>
        )
    };
};

export default UserProductScreen;