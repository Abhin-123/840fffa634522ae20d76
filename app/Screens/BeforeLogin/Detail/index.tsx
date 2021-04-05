import React, { Component, useState, useRef } from "react";
import { connect } from "react-redux";
import { Login, Logout } from "../../../Redux/Actions/login_action";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, Button, Text, View } from "native-base";

export interface Props {
  email: string;
}

const Detail: React.FC<Props> = (props) => {
  const route = useRoute();

  const [data, setData] = useState("");

  React.useEffect(() => {
    const { data } = route.params;
    setData(data);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ padding: 10 }}>{JSON.stringify(data)}</Text>
    </View>
  );
};

function mapStateToProps(state: any) {
  const { hideProgress } = state.loginReducer;
  return { hideProgress };
}

export default connect(mapStateToProps, { Login, Logout })(Detail);
