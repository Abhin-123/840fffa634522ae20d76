import React, { Component, useState, useRef } from "react";
import { FlatList, TextInput } from "react-native";
import { connect } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, Button, Text, View, Input } from "native-base";

const axios = require("axios");
const instance = axios.create();

const Welcome = (props: any) => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  React.useEffect(() => {
    const interval = setInterval(() => callApi(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [pageNumber]);

  const callApi = () => {
    let url =
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=" +
      pageNumber;
    instance({
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      url: url,
    })
      .then((res) => {
        let newPosts = res.data.hits;
        setPosts([...posts, ...newPosts]);
        setSearchPosts([...posts, ...newPosts]);
        setPageNumber(pageNumber + 1);
      })
      .catch((ERROR) => {
        console.log("ERROR", url, ERROR);
      });
  };

  const allPosts = ({ item, index }) => {
    return (
      <Button
        onPress={() => {
          navigation.navigate("Detail", { data: item });
        }}
        style={{
          padding: 10,
          backgroundColor: "#FFF",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          height: 250,
          borderColor: "#cecece",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", marginBottom: 5, color: "#000" }}>
            Created At -{" "}
            <Text style={{ fontWeight: "400" }}>
              {item.created_at} {"\n"}
            </Text>
          </Text>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Title -{" "}
            <Text style={{ fontWeight: "400" }}>
              {item.title} {"\n"}
            </Text>
          </Text>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Url -{" "}
            <Text style={{ fontWeight: "400" }}>
              {item.url} {"\n"}
            </Text>
          </Text>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Author -{" "}
            <Text style={{ fontWeight: "400" }}>
              {item.author} {"\n"}
            </Text>
          </Text>
        </View>
      </Button>
    );
  };

  const loadmore = () => {
    let url =
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=" +
      pageNumber;
    instance({
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      url: url,
    })
      .then((res) => {
        let newPosts = res.data.hits;
        setPosts([...posts, ...newPosts]);
        setSearchPosts([...posts, ...newPosts]);
        setPageNumber(pageNumber + 1);
      })
      .catch((ERROR) => {
        console.log("ERROR", url, ERROR);
      });
  };

  const header_ = () => {
    return (
      <TextInput
        placeholder="Search for Title / author / url"
        style={{
          width: "90%",
          alignSelf: "center",
          height: 50,
          borderWidth: 1,
          borderColor: "#cecece",
          marginVertical: 20,
        }}
        value={searchText}
        onChangeText={(input) => {
          setsearchText(input);
          search(input);
        }}
      />
    );
  };

  const search = (ITEM) => {
    if (ITEM === "") {
      setPosts(searchPosts);
    } else {
      const name = searchPosts;
      const mTemp = name.filter(function (item) {
        return (
          (item.title &&
            item.title.toLowerCase().startsWith(ITEM.toLowerCase())) ||
          (item.author &&
            item.author.toLowerCase().startsWith(ITEM.toLowerCase())) ||
          (item.url && item.url.toLowerCase().startsWith(ITEM.toLowerCase()))
        );
      });
      setPosts(mTemp);
    }
  };

  return (
    <Container
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <FlatList
        data={posts}
        ListHeaderComponent={header_}
        style={{ width: "100%", height: "100%" }}
        renderItem={allPosts}
        onEndReachedThreshold={0.1}
        onEndReached={loadmore}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

function mapStateToProps(state: any) {
  const { hideProgress } = state.loginReducer;
  return { hideProgress };
}

export default connect(mapStateToProps, {})(Welcome);
