// This file contains all Common function related to API(GET, POST, POST FORM, DELETE)

import *  as Config from './ApiConfig';
import {Alert} from 'react-native';
import * as Storage from '../service/AsyncStoreConfig'
const headers1 = {
}
export class ApiConfig {
    //GET
    //params->(end point url)
    getJSON(url) {
            return new Promise((resolve, reject) => {
                Storage.getData('token').then((token)=>{
                    console.log("token"+token)
                    var fetchURL = function () {
                        url = Config.serverUrl + url;
                    fetch(url, {
                            headers: { "Content-type": "application/json","Token":token},
                        }).then(res => res.json())
                            .catch(function (error) {
                            reject(error);
                        })
                        .then(function (obj) {
                            resolve(obj);
                        })
                        .done();
                    }
                    fetchURL();
            })
        })
    }
    //DELETE
    //params->(end point url, Params)
    deleteJSON(url, params = {}) {
        return new Promise((resolve, reject) => {
            Storage.getData('token').then((token)=>{
                var par=JSON.stringify(params)
                var fetchURL = function () {
                    url = Config.serverUrl + url;
                    console.warn(headers1)
                //  alert(url)
                    fetch(url,{
                                headers: { "Content-type": "application/json","Token":token
                            },
                                method: 'DELETE',
                                body: par
                            })
                            .then(res => res.json())
                            .then(function (obj) {
                            //alert(JSON.stringify(obj))
                            resolve(obj);
                            })
                            .catch(function (error) {
                            reject(error);
                            })
                            .done();
                }
                    fetchURL();
            });
        });
}
    //POST
    //params->(end point url, Params)
    postJSON(url, params = {}) {
        return new Promise((resolve, reject) => {
            Storage.getData('token').then((token)=>{
                console.log("token"+token)
                var par=JSON.stringify(params)
                var fetchURL = function () {
                    url = Config.serverUrl + url;
                    console.log(headers1)
                    //  alert(url)
                    fetch(url,{
                                headers: { "Content-type": "application/json","Token":token
                                },
                                method: 'POST',
                                body: par
                            })
                            .then(res => res.json())
                            .then(function (obj) {
                                //alert(JSON.stringify(obj))
                                console.log("success",url,obj)
                                resolve(obj);
                                })
                                .catch(function (error) {
                                    console.log("ERROR",url,params,error)

                                reject(error);
                            })
                            .done();
                }
                    fetchURL();
            });
        });
    }
    //POST FORM
    //params->(end point url, Params)

    postFormJSON(url, params = {}) {
    // alert(JSON.stringify(params))
        return new Promise((resolve, reject) => {
                Storage.getData('token').then((token)=>{
                var fetchURL = function () {
                    url = Config.serverUrl + url;
                    fetch(url,{
                                headers: {"Token":token},
                                method: 'POST',
                                body: params
                            }).then(res => res.json())
                                .catch(function (error) {
                                    alert(JSON.stringify(error))
                                reject(error);
                            })
                            .then(function (obj) {
                                resolve(obj);
                            })
                            .done();
                }
                fetchURL();
            });
        });
  }
}