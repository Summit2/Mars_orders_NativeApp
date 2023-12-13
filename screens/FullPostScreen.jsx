import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import {View} from "react-native";
import {Loading} from "../components/Loader";
import {axiosInstance} from "../API";


const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`

const PostDetails = styled.View`
  flex-direction: column;
`

const PostText = styled.Text`
  flex-direction: column;
  font-size: 18px;
  line-height: 24px;
`



const FullPostScreen = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()

    const { id, name, img } = route.params

    const fetchGroup = () => {
        navigation.setOptions({
            name,
        })

        axiosInstance
            .get('/cargo/'+id)
            .then(({data}) => {
                setData(data)
                // alert(data)
            })
            .catch((err) => {
                console.log(err)
                alert('/cargo/'+id)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(fetchGroup, [])

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Loading />
            </View>
        )
    }

    return (
        <View style={{ padding: 20 }}>
            <PostImage  
    source={{ uri: `data:image/png;base64,${data.image_binary}` }}
    style={{ width: 200, height: 200 }} 
  />            
            <PostDetails>
                <PostText>
                    Название: {data.title}
                </PostText>

                <PostText>
                    Вес: {data.weight}
                </PostText>

                <PostText>
                    Описание: {data.description}
                </PostText>

            </PostDetails>

        </View>
    )
}

export default FullPostScreen;