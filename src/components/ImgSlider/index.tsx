import React, {useCallback, memo, useRef, useState, useContext} from 'react';
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import {NavbarContext} from '../../Context';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  slide: {
    height: windowHeight * 0.3,
    width: windowWidth,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  slideImage: {width: '50%', height: '100%'},
  slideTitle: {fontSize: 24, fontWeight:"bold",color:'gray'},
  slideSubtitle: {fontSize: 18 ,fontWeight:"bold",color:'gray'  },

  pagination: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: {backgroundColor: 'lightblue'},
  paginationDotInactive: {backgroundColor: 'gray'},

  carousel: {flex: 1},
});

const Slide = memo(function Slide({data}) {
  return (
    <View>
      <View style={styles.slide}>
        <Image source={{uri: data.image}} style={styles.slideImage}></Image>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.slideTitle}>{data.title}</Text>
          <Text style={styles.slideSubtitle}>
            {data.description.slice(0, 20)}...
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{margin: 3}}>
              <Button color="tomato" title="Details" />
            </View>
            <View style={{margin: 3}}>
              <Button color="gold" title="Add to Cart" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

function Pagination({index}) {
  const {data} = useContext(NavbarContext);
  return (
    <View style={styles.pagination} pointerEvents="none">
      {data.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

export default function ImgSlider({data}) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      [],
    ),
  };

  const renderItem = useCallback(function renderItem({item}) {
    return <Slide data={item} />;
  }, []);

  return (
    <>
      <FlatList
        data={data}
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
       
        {...flatListOptimizationProps}
      />
      <Pagination index={index}></Pagination>
    </>
  );
}
