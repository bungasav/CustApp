import React from 'react';
import {
  ImageBackground, Dimensions, View, Image, TouchableOpacity, TextInput, StyleSheet,
  RefreshControl, FlatList, TouchableHighlight, WebView, ActivityIndicator, Linking
} from 'react-native';
import { Container, Content, Text, H3, Icon, Button, Toast, Card, CardItem, Body, Segment, Row, Col, } from 'native-base';
import { Actions } from 'react-native-router-flux'
// import { StackNavigator } from 'react-navigation';
import PTRView from 'react-native-pull-to-refresh';
import backimg from '../assets/background-1.jpeg';
import makansini from '../assets/icon-1.png';
import bawapulang from '../assets/icon-2.png';
import white from '../assets/white-layer.png';
import logo from '../assets/logo.gif';

class Service extends React.Component {
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
    return (

      <Container style={styles.container}>
        <ImageBackground source={backimg} style={{ width: '100%', height: '100%' }}>
          <PTRView onRefresh={this.handleRefresh}>
            <Row style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Image source={logo}></Image>
            </Row>
            <Content>
              <Row style={{ alignSelf: 'center' }}>
                <ImageBackground source={white} style={styles.whitelayer}>
                <Text style={styles.servicetitle}>Layanan apa yang anda pilih ?</Text>
                <Row style={{ alignSelf: 'center', marginLeft:-200, marginTop:70 }}>
                  <TouchableOpacity onPress={Actions.home}>
                    <Image style={{ height: 160, width: 180, marginRight:120 }} source={makansini} onPress={Actions.home}
                    ></Image>
                    <Text style={styles.h4}> Makan Ditempat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={Actions.home}>
                    <Image style={{ height: 160, width: 180 }} source={bawapulang} onPress={Actions.home}
                    ></Image>
                    <Text style={styles.h4}> Bawa Pulang</Text>
                  </TouchableOpacity>
                  </Row>
                </ImageBackground>
              </Row>
            </Content>
          </PTRView>
        </ImageBackground>

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
  whitelayer :{
    width:'80%',
    height:500,
     marginTop: 30,
     marginLeft:200,
     borderRadius: 10,
    // position: 'relative'
},
servicetitle:{
  paddingTop:100,
  fontSize:24,
  alignSelf:'center',
  marginLeft:-200
},
h4:{
  fontWeight:'bold',
  fontSize:20,
  fontFamily: 'Nunito',
  marginLeft:12
}
});

export default Service;

