 
import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, LogBox, ScrollView} from 'react-native';
import Api from '../../Axios/Api';
import ImgSlider from '../../components/ImgSlider';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';
import TopNav from '../../components/TopNav';
import SideBar from '../../components/TopNav/SideBar';
import {NavbarContext} from '../../Context';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const HomeScreen = () => {
  const {sildeNav, setSildeNav, data, setdata} = useContext(NavbarContext);

  useEffect(() => {
    getProductApi();
  }, []);

  const getProductApi = async () => {
    const productData = await Api.get('/product');
    setdata(productData.data);
  };

  console.log(data);
  return (
    <View>
      <TopNav />
      {sildeNav && <SideBar />}
      {data[0].loading && <Spinner />}

      {data.length > 1 && (
        <View style={styles.flatlist}>
          <FlatList
            
            data={data}
            numColumns={2}
            ListHeaderComponent={(item, index) => <ImgSlider id={index} data={data} />}
            renderItem={item => <ProductCard items={item.item} />}
            keyExtractor={(item, index) => index.toString()}
          />

          {/* <ScrollView>
             
           {data.map((item, index)=>{
             return <ImgSlider id={index}  data={data} />
          })}
           {data.map((item, index)=>{
             return <ProductCard id={index} items={item} />
          })}
          
           </ScrollView> */}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flatlist: {
    height: '84%',
    marginTop: 20,  
    

  },
});
