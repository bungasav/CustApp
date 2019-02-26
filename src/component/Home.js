import React from 'react';
import {
  ImageBackground, Dimensions, View, Image, TouchableOpacity, TextInput, StyleSheet,
  RefreshControl, FlatList, TouchableHighlight, WebView, ActivityIndicator, Linking
} from 'react-native';
import { Container, Content, Text, H3, Icon, Button, Toast, Card, CardItem, Body, Segment, Row, Left } from 'native-base';
import { Actions } from 'react-native-router-flux'
import PTRView from 'react-native-pull-to-refresh';
import logo from '../assets/logo.png';
import backgro from '../assets/background-3.png';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      ResultRest: '',
      data: [],
      page: 1,
      seed: 1,
      result: null,
      error: null,
      refreshing: false,
    };
  }

  componentWillMount() {
    this.makeRemoteRequest();
  }

  // Service
  makeRemoteRequest = () => {
    const params = 'user_code=' + 'U0015' + '&user_token=' + '65AB4ACC-1749-4FE4-9C49-91F5C6CCAE38' + '&event_id=1'
      + '&hmac_unixtime=' + '' + '&hmac_token=' + '' + '&sorting=' + '' + '&pageNo=' + '-99' + '&pageSize=' + 9 + '&search=' + ''
    const url1 = `http://103.106.81.88:8094/apidevext/api/CustomerAppsTV?getStoreEvent`;
    this.setState({ loading: true });
    fetch(url1, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params,
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          ResultRest: res.Result,
          data: res["store_event"],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    return new Promise((resolve) => {
      this.makeRemoteRequest();
      setTimeout(() => { resolve() }, 2000)
    });
  }


  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  GetItem(item) {
    Alert.alert(item);
  }


  render() {
    const keyExtractor = item => item.id_buku;
    const imagess = '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';
    const onPress = item => Actions.product({ store_id: item.store_id });


    return (
      <Container>
        <PTRView onRefresh={this.handleRefresh}>
          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#000' }}>
            <Row>
              <View style={{
                marginTop: 10,
                marginHorizontal: 5,
                width: '66.66666667%',
              }}>
                <FlatList
                  numColumns={1}
                  data={this.state.data}
                  renderItem={({ item }) => (
                    <Card transparent style={{ paddingHorizontal: 6, width: '25%' }}>
                      <CardItem cardBody>
                        <View style={{
                          // flexDirection: 'row',
                          // marginTop: 5,
                          width:'20%'
                        }}>
                          <TouchableOpacity onPress={() => onPress(item)} style={{ flex: 1, marginHorizontal: 5 }}>
                            <Image
                              source={{ uri: 'data:image/png;base64,' + imagess }}
                              style={{
                                height: 150,
                                width: 100,
                                //flex: 1,
                                borderWidth: 1,
                              }}
                            />
                          </TouchableOpacity>
                          <View style={{
                            flexDirection: 'column',
                             width: 235,
                            marginLeft: 10
                          }}>
                            <View style={{
                              flexDirection: 'row'
                            }}>
                              <Text style={{ fontWeight: '800', }}>Name       :</Text>
                              <Text style={{ fontWeight: '800', marginLeft: 5 }}>{item.store_name}</Text>
                            </View>
                            <View style={{
                              flexDirection: 'row'
                            }}>
                              <Text style={{ fontWeight: '800', }}>Category      :</Text>
                              <Text style={{ fontWeight: '800', marginLeft: 5 }}>{item.category_name}</Text>
                            </View>
                          </View>
                        </View>
                      </CardItem>
                    </Card>
                  )}
                  keyExtractor={keyExtractor}
                />
              </View>
              <View style={{ width: '33.33333333%' }}>
                <ImageBackground source={backgro} style={{ width: 450, height: 1000 }}>
                  <View style={styles.square}>
                    <Text style={styles.boxwelcome}> Selamat Datang </Text>
                  </View>
                  <View style={styles.squaretext}>
                    <Text style={styles.boxnotes}> Silahkan Memilih Merchant di samping untuk menikmati  menu kesukaan </Text>
                  </View>
                  <Button style={{alignSelf:'center', marginTop:15}}>
                    <Text>Klik Disini Untuk Bantuan</Text>
                  </Button>
                </ImageBackground>
              </View>
            </Row>
          </View>
        </PTRView>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: '80%',
    height: 60,
    backgroundColor: 'purple',
    marginTop: 250,
    alignSelf: 'center'
  },
  boxwelcome: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'center',
    paddingTop: 10,
  },
  squaretext: {
    width: '80%',
    height: 80,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  boxnotes: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
    paddingTop: 20,
    padding: 30,
  }
});

export default Home;