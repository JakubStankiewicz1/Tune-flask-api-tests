import { Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Index() {
  
  const apiURL = process.env.EXPO_PUBLIC_API_URL;
  
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(apiURL + "/api/songs/1")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const renderItem = ({ item } : {item:any}) => (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.artist_name}</Text>
      <Text>{item.artist_id}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
}