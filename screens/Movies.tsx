import react from "react";
import styled from "styled-components/native";

import { TouchableOpacity, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, "movies">> = ({
  navigation,
}) => (
  <Btn
    onPress={() => navigation.navigate("Stack", { screen: "Three" })}
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <Title>Moviessss</Title>
  </Btn>
);
export default Movies;