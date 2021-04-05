// This file contains common functions
// related to Local storage

import  AsyncStorage  from "@react-native-community/async-storage";

// save data into local storage
export async function saveData(key, value){
    await AsyncStorage.setItem(key, value);
 }
// get data from local storage

export async function getData(key){
    
    let val=''
    val =  await AsyncStorage.getItem(key);

    try{
        if(val != null|| val!=''){
            return val
        }else{
            return false
        }}catch(error){
            console.log('error')
        }
 }
// remove data from local storage
 export async function removeData(key) {
        try {
        await AsyncStorage.removeItem(key);
        return true;
        }
        catch(exception) {
        return false;
        }
  }