import React, {useEffect, useCallback, useReducer} from "react";
import { View,ScrollView , Text, StyleSheet, Platform, TextInput, Alert } from 'react-native';
import Colors from "../../constant/Colors";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector,useDispatch } from "react-redux";

import HeaderButton from '../../component/UI/HeaderButton';
import * as productActions from '../../store/actions/products';
import Input from "../../component/UI/Input";

const FORM_UPDATE = 'UPDATE'

const formReducer = (state, action) => {
    if(action.type === FORM_UPDATE){
        const updatedValues ={
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const EditProductScreen = props =>{
    const prodId = props.route.params.productId;
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer,
        {
            inputValues:{
                title: editedProduct ? editedProduct.title : '',
                imageUrl:editedProduct ? editedProduct.imageUrl : '',
                description:editedProduct ? editedProduct.description : '',
                price: ''
            },
            inputValidities:{
                title: editedProduct ? true : false,
                imageUrl: editedProduct ? true : false,
                description: editedProduct ? true : false,
                price: editedProduct ? true : false,
            },
            formIsValid: editedProduct ? true : false
        }
    );
    
    const submitHandler = useCallback(() =>{
        if(!formState.formIsValid){
            Alert.alert('Wrong input!', 'Please check the errors in the form.',[{text: 'Okay'}])
            return;
        }
        if(editedProduct){
            dispatch(
                productActions.updateProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.description,
                    ormState.inputValues.imageUrl
                )
            );
        }
        else{
            dispatch(productActions.createProduct(
                formState.inputValues.title, 
                formState.inputValues.description,
                formState.inputValues.imageUrl, 
                +formState.inputValues.price
            ));
        }
        props.navigation.goBack();
    }, [dispatch,prodId, formState]);

    useEffect(()=>{
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const textChangeHandler = (inputIdentifier, text) =>{
        let isValid = false;
        if(text.trim().length > 0){
            isValid = true;
        }
        dispatchFormState({
            type: FORM_UPDATE, 
            value: text, 
            isValid:isValid,
            input: inputIdentifier
        });
    };

    return(
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input} 
                        value={formState.inputValues.title} 
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onEndEditing={()=>console.log('onEndEditing')}
                        onSubmitEditing={()=>console.log('onSubmitEditing')}
                    />
                    {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput 
                        style={styles.input} 
                        value={formState.inputValues.imageUrl} 
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')}
                    />
                </View>
                {editedProduct ? null :(<View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.price} 
                        onChangeText={textChangeHandler.bind(this, 'price')}
                        keyboardType='decimal-pad'
                    />
                </View>)}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                    style={styles.input}
                    value={formState.inputValues.description} 
                    onChangeText={textChangeHandler.bind(this, 'description')}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export const screenOptions = navData =>{
    const submitFn = navData.route.params.submit;
    return{
        headerTitle:navData.route.params.productId ? 'Edit Product' : 'Add Product',
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Save' iconName={Platform.OS === 'android' ? 'md-checkmark':'ios-checkmark'} onPress={submitFn}/>
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form:{
        margin:20
    },
    formControl:{
        width:'100%'
    },
    label:{
        marginVertical:8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    }
});

export default EditProductScreen;