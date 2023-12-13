import { View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import Post from "../components/Post";
import React, {useEffect, useState} from "react";
import {Loading} from "../components/Loader";
import {axiosInstance} from "../API";
import { TextInput, Text,Button} from 'react-native';

const HomeScreen =({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([])
    const [searchText, setSearchText] = useState('');

    const handleSearch = async (text) => {

        setSearchText(text);
      };
    const handleRefresh = async() => {
        fetchPosts();
    }
    const fetchPosts = () => {
        setIsLoading(true)
        axiosInstance
            .get("/cargo/"+`?search=${searchText}`)
            .then(({data}) => {
                if (data.data.length!=0){
                setItems(data.data)}
                else {
                    setItems([])
                }
                // alert(data.data)
            })
            .catch((err) => {
                alert(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    
    useEffect(fetchPosts, [])
    
    

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
          placeholder="Search..."
          onChangeText={handleSearch}
          value={searchText}
        />
        <Button title="Поиск" onPress={handleRefresh} />
      </View>


            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
                data={items}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate("FullPost", {id: item.pk, name: item.title })}>
                        <Post navigation={navigation} id={item.pk} name={item.title} img={item.image_binary}/>
                    </TouchableOpacity>
                )}
            /> 

        </View>
    );
}

export default HomeScreen;
