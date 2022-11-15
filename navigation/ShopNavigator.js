import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProductOverviewScreen, {screenOptions as productOverviewScreenOptions} from "../screens/Shop/ProductOverviewScreen";
import ProductDetailScreen, {screenOptions as ProductDetailScreenOptions} from '../screens/Shop/ProductDetailScreen';
import CartScreen, {screenOptions as CartScreenOptions} from '../screens/Shop/CartScreen';
import OrdersScreen, {screenOptions as OrdersScreenOptions} from '../screens/Shop/OrdersScreen';
import UserProductScreen, {screenOptions as userProducScreenOptions} from '../screens/User/UserProductScreen';
import EditProductScreen, {screenOptions as EditProductScreenOptions} from '../screens/User/EditProductScreen';

const Stack = createStackNavigator();

const productNav = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="ProductOverview" 
                component={ProductOverviewScreen} 
                options={productOverviewScreenOptions}
            />
            <Stack.Screen 
                name="ProductDetail" 
                component={ProductDetailScreen} 
                options={ProductDetailScreenOptions}
            />
            <Stack.Screen name="Cart" component={CartScreen} options={CartScreenOptions}/>
        </Stack.Navigator>
    );
};

const OrderStack = createStackNavigator();

const orderNav = () =>{
    return(
        <OrderStack.Navigator>
            <OrderStack.Screen name="Order" component={OrdersScreen} options={OrdersScreenOptions}/>
        </OrderStack.Navigator>
    );
};

const userProstack = createStackNavigator();

const userProNav = () =>{
    return(
        <userProstack.Navigator>
            <userProstack.Screen name="userPro" component={UserProductScreen} options={userProducScreenOptions}/>
            <userProstack.Screen name="EditScreen" component={EditProductScreen} options={EditProductScreenOptions}/>
        </userProstack.Navigator>
    );
};

const Drawer = createDrawerNavigator();

const shopNav = () => {
    return(
        <NavigationContainer>
            <Drawer.Navigator >
                <Drawer.Screen name="Product" component={productNav} />
                <Drawer.Screen name="Orders" component={orderNav}/>
                <Drawer.Screen name="Your Products" component={userProNav}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default shopNav;