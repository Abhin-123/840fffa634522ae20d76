import React, {Component, useState, useRef} from 'react';
import { FlatList } from 'react-native';
import {connect} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import { Container, Button, Text, View, Input } from 'native-base';

const axios = require('axios');
const instance = axios.create();

const Welcome = (props: any) => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [search_word, setsearch_word] = useState("");
  const [pageNumber, setPageNumber] = useState(1)

  React.useEffect(() => {
    const interval = setInterval(() => callApi(), 10000)
    return () => {
      clearInterval(interval);
    }
  }, [pageNumber]);

  const callApi = ()=>{
    let url = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+pageNumber;
    instance({
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
      url: url,
    })
      .then((res) => {
        let newPosts = res.data.hits;
        setPosts([...posts,...newPosts])
        setPageNumber(pageNumber+1)
      })
      .catch((ERROR) => {
        console.log('ERROR',url, ERROR);
      });
  }

  const allPosts = ({item,index}) => {
    return(
      <Button onPress={()=>{navigation.navigate("Detail",{data:item})}} style={{
        padding: 10,
        backgroundColor:'#FFF',
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: '#cecece' }} >
        <Text style={{fontWeight:'bold',marginBottom:5,color:'#000'}}>Created At - <Text style={{fontWeight:'400'}}>{item.created_at}</Text></Text>
        <Text style={{fontWeight:'bold',marginBottom:5}}>Title - <Text style={{fontWeight:'400'}}>{item.title}</Text></Text>
        <Text style={{fontWeight:'bold',marginBottom:5}}>Url - <Text style={{fontWeight:'400'}}>{item.url}</Text></Text>
        <Text style={{fontWeight:'bold',marginBottom:5}}>Author - <Text style={{fontWeight:'400'}}>{item.author}</Text></Text>
      </Button>
    )
  }

  const loadmore = () =>{
    alert("more")
  }

  const header_=()=>{
    return(
      <Input 
        placeholder="Title / author / url" 
        value={search_word}
        onChange={(input)=>{search(input)}}
      />
    )
  }

  const search = item =>{
    if(item===''){

    }
    else {
      //searching for Title
      const title = posts.filter(function(data){
        return data.title.toLowerCase().startsWith(item.toLowerCase());
      })
      setPosts(title)
    }
  }

  return (
    <Container style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={posts}
        ListHeaderComponent={header_}
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
