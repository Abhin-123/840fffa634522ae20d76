import React, {Component, useState, useRef} from 'react';
import { FlatList } from 'react-native';
import ProgressBar from '../../../service/ProgressBar';
import {connect} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import { Container, Button, Text, View } from 'native-base';

const axios = require('axios');
let i = 0;
const instance = axios.create();

const Welcome = (props: any) => {

  const [posts, setPosts] = useState([]);

  React.useEffect(() => {
    const interval = setInterval(() => callApi(), 3000)
    return () => {
      clearInterval(interval);
    }
  }, []);

  const callApi = ()=>{
    
    let url = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+i
    instance({
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
      url: url,
    })
      .then((res) => {
        var temp_post = Object.assign([], posts);
        //let a = res.data.hits;
        //temp_post.push(a)
        let newPosts = temp_post.concat(res.data.hits)
        //console.log(newPosts)
        //let x = res.data.hits;
        
        setPosts(newPosts);
        console.log("posts",posts)
        console.log("hitss",res.data.hits)
        console.log("response of : "+i+" - "+posts+" length "+posts.length)
        i++;

      })
      .catch((ERROR) => {
        console.log('ERROR',url, ERROR);
      });
  }

  const allPosts = ({item,index}) => {
    return(
      <View  style={{
        padding: 10,
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: '#cecece' }} >
        <Text style={{fontWeight:'bold',marginBottom:5}}>Created At - <Text style={{fontWeight:'400'}}>{item.created_at}</Text></Text>
        {/* <Text style={{fontWeight:'bold',marginBottom:5}}>Title - <Text style={{fontWeight:'400'}}>{item.title}</Text></Text>
        <Text style={{fontWeight:'bold',marginBottom:5}}>Url - <Text style={{fontWeight:'400'}}>{item.url}</Text></Text>
        <Text style={{fontWeight:'bold',marginBottom:5}}>Author - <Text style={{fontWeight:'400'}}>{item.author}</Text></Text> */}
      </View>
    )
  }

  const loadmore = () =>{

  }

  return (
    <Container style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={posts}
        //contentContainerStyle={{paddingBottom: 90}}
        style={{width:'100%',height:'100%'}}
        renderItem={allPosts}
        onEndReachedThreshold={0.1}
        onEndReached={loadmore}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

function mapStateToProps(state: any) {
  const {hideProgress} = state.loginReducer;
  return {hideProgress};
}

export default connect(mapStateToProps, {})(Welcome);
