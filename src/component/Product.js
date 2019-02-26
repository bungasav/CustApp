import React from 'react';
import {
  ImageBackground, Dimensions, View, Image, TouchableOpacity, TextInput, StyleSheet,
  RefreshControl, FlatList, TouchableHighlight, WebView, ActivityIndicator, Linking
} from 'react-native';
import { Container, Content, Text, H3, Icon, Button, Toast, Card, CardItem, Body, Segment, } from 'native-base';
import { Actions } from 'react-native-router-flux'
// import { StackNavigator } from 'react-navigation';
import PTRView from 'react-native-pull-to-refresh';
// import Realm from 'react-native-realm'

class Service extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      store_id: this.props.store_id,
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

  makeRemoteRequest = () => {
    const { store_id } = this.state;
    const params = 'user_code=' + 'U0015' + '&user_token=' + '65AB4ACC-1749-4FE4-9C49-91F5C6CCAE38' + '&store_id=' + store_id
      + '&category_id=' + ''  + '&pageNo=' + '-99' + '&pageSize=' + 9 
    const url1 = `http://103.106.81.88:8094/apidevext/api/CustomerAppsTV?getProductStore`;
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
          data: res["product"],
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
        const imagess = 'iVBORw0KGgoAAAANSUhEUgAAADsAAAA9CAYAAAFkeyE4AAAAAXNSR0IArs4c6QAACuFJREFUaAXlmwWMlEsSgGsWd/fFHRLcJSH4wwke5JAQSAiH53h4gAA5CIQLBAmBYIcHgt07XA8n2MMtuPNwZ6+/5vXPvzPz/yM7w164Tma7/+6qrq7u6uqq6l6PqHT69Ok4cu9UtmxZj+fUqVNxJUqU8G6zvmOskirs2bNHNmzYYK8SC+D+/ftSqFAhuXfvnv4ZKIvEx48fJSbmG/zbt28lderUkjRpUklqIFOmTCnJkiXTn2nSpJEPHz7oskXi69evBtZqpCLmwYMH/zYtYBlMU+fZvn37v7Jnz97YVNhzz/v37/1OEEAWbT5GjBhBZiWrkYZSpUrJ9OnTrUbd7efPn3XF69evJW3atLoMzwJNNQlx9jR48OA4PRb+8Lty5Ypuf/bsmf6mznW0nt9UqlOnTiNrFCEUYnLmzOkX8eHDh8LUjx49Wm7evOm3S2sq7K23b9+Wly9fypcvXyR9+vQyf/58GT9+vB1Ely0JMC1r167VonH06FGpVKmSPH/+XDdly5bNgFi5JV87duyQXbt2WQ1uhUmTJn1rRv7NdJtcSbJ9WXR56tSpPnAWZTdKTm0eGlgup1l3QixXrpzHs3r16rTFixd/5QTkr/7WrVtLmjdv/hdXCfKHaOq2bdtWyO86GwC3PEmSJMUdkRcvXqxx1Sw79uGIXLduXXn16pVkypTJEdlHwkaOHCm1a9eWffv2iRqatG/fXhDXvHnz+nTiQ7lChQpy7do1vaMbNGgg+/fvlzlz5vggUhEPGXVw8uRJuXv3rpQpU0YuX74sd+7ckb59+/ooF5CtpQJRyaF4PFpuaJN3795JqlSp5MWLF5IuXTqtW7VuUW07d+78xeJ5zJgxGiHQHyayfv3638DMZiBHMTklpdW1IjPwW7ZsaRyPZ7batGnTfIgrna21ijkSDEA8ZCr79+9vKQADhD71lyye7Y0cNPYTwd8aA+9D2d6JW1npt0tJN27cmK5YsWIhbUklcUtatGhxQ+9nVQgJ2W1EgdqYv6xZs3piQh1xoI4DtXMI+ohIIKRItoe8yHv37tWagTOeLYiO2rp1K1yENK6gCSvdLnPnzsVEEA5CVBUbqHTp0lKkSBE5fvy4Vhbnzp0LagABCV+/fl044y9duqQ1ERZcrVq1ZPbs2dKxY0eJjY0VJSf6B0Wn/eM9moCE1ZaRN2/eaE6ZXmXvSJ48eaRly5bahFy5cqXm9OzZs5pzZobBBUquhA8cOCCNGjXSWh+NZ/TPhQsX5ODBg1qZmzrar169KugqpVID0RUfi2DGjBlS9I8W4nEdUsB+bQBxcjn9Jhk0aJBVh64Xf3bM06dP44YOHeqkuYOupw/6Mire5Oxjv4QNALkyGuP8GVRO1IEFx96HdxnCPlNtzYdXYdSoUd9PNa8284npOHHiRPPpmDPVQRN27CWMBghHTIRCpR+jzJR0oSIlBB5rrmnTpr9pW2fdunWTlNr7q+owTUI6dcNVSui8UizD2rZtu9WzadOm28qqi3VDiGSbkua/WYZeJDt26wuP6ocTZUCJIsWJQtSvLeq2JuvXr8co037JqlWrtIGPh2A5q27If7aFxOnChQu1e41/ztl7/vx5qVy5chBk4oOERPTTp08WNmU8L/Rvr169rPpgCkERxUaaOXOmZMyYEWdb+0pKoej+MXmox/LAxgomBSSKlYBjhqFGRIipJWpB8OvYsWOaBpZj586dpWjRosHQ/B4gc4KGqNKXgi8KV8rT1+GTsWPHapOmW7duGpWjMHfu3E7dxKsPqBwwzjDMmELcz549e2q7mAhR8uTJrc6IC2LU4eMGSq7TyxTeuHFDatasqf1BuFyyZIkQJHr06JEoE0U70zjUTLuKdUgwrq8r0cmTJ+stwVoZ5xt7OUeOHKICMNo+Nlzly5dPVqxYIW3atNHbydT7y12VA94+kSwI9u7dW8fN6CRLliz6Z5/eZs2a6egHxjsz4CZUftfUhCiVkaUNcSJ9mTNntgaN5wxBw71pYIpNSDdFihS62oQfDAy5D6d/771cSsdWs8P8WQ7P/X2W/LJ0/fWXeP35EP0j2+9y8MPv8YAS9KFD0/GJ6qCut606ZcqUuBMnTjiZu0HVg08/3n3z7XdN4YzThPUxmz8UbtlWrHnr1q39o/kbialTjlTchAkTguLMAAEPnunDX+53eu2AT548iVOK3PTpmgMHvB3fX9lxeu3zgsbZo+5GcJSdEjAqMu8KY3B9pNc02HOIcWC7nZtDhgyRLl262NEcy0Fx6ogdZoOr7g2zz4Bo/x9EsfBjlMlxJeB8RBBABVfGWF5b4cKFo+q1qfuz714bTKxZs6aOuk6Zr66MinofVxFk8od3xbmuQlP/VNu967hx47568ImbNGny68/EpPesKivr7ZEjR7LEIEY/M6MwXrBgwdTKpKyBaopalMN7hhPrm8VUh3PyRNHDicV0UGd6tAaHDb9582ZtL/Cyol69eqKef0SLnK/NH0lKWFILFiwQpRd0t4RIKHfv3l1fKBLINd+8Pli+fLn2iPEHo5GiurJY4ljw5l0Mzi/Mc4vBHQ3hmsOHD+ubZJjj5oIXE9FKUWVWhV9l0aJF1kUTK5srVy4dYlDnnnZnYKxKlSrSqlUrzSNmjnqYoC94uVLPnz9/xHiPCLP400TziJUQ3SMAw/Wr8j50mAJxJmLQtWtXefz4sXBlxG0be9SIb4YMGXRZnYf6mQMRJaSAgMDAgQMjwnCCtbFyn3S8hYDQgAEDRL1a0leKxGlghKtfolTqqkrH27BqiF6wyryeYJ/ygAwviYkiceeJiPN6yNRFgtsEr+yZM2e0smnYsKFetRo1amgR5DqT842bQ96WcKvI/mUfN27cWHvUFy9etHhYtmyZLpcvX173R1RF3bf5RFsshDAKCWaWYCaiRjQNpcNgEV/zCoOQX9WqVfUKIersY2WLa9Hk8QWrb0889EOEiVWirQkDd+rUSUqWLGkHC6ucIGbVM0HZvXu3XjECcGhZVpMJgBGT0LJMBCvMU0YmBy2MeCPu9oeK4LPHCdKSiJMi6myTfv36mS7DysPes+w5GCW6iAgWKFBAqlWrphkmxkpQEFHkx76GIWWjCivNHiVnEpQZZ8GBg1QQCWGyOnTooCOX6l2Ljrure7WwmDRIYTNLBFo9/tRiyFuvihUryqFDh/Ts8wYMrQuM+XH9yOpgNaF0EE/KPD0wMLwI4KgZPny4niAYR2uz39ULPQ1nBh5OHvCWmRVgj5mnkeEQiTYOL/LatWunpcuJFjfbAffs0qVLpeDjJtJxaHb1KM6pq8Stf3H7kzBOXsm6pYArCzJ7kPsqniSy79yi+m7EItnGDSHj4vkPRxnjckusbFDMmk7QpCgjRJtzlR/a80cllBmmJD8UIpFTu9Z3G0fIzNo7QxlxKUhIl+OB67RoJZQb974cSRxX1atXD5lUUHvWqVcI8kNxzZo1SxsRffr0EW7PIpU4g+fNm6dNzh49erg+DQ6GZkAFFagTNKF6RauvhmEad45v49YFwvfXzrHEPxyQDxs2TL8F9gcXal1IezaYzhFtXtbxtti8rAsGz8BgfPBCAN8XkY1USpAYOw0CgwJmGXBCEv1EOiVYjL0HhFsWyusUb/xofodtLkZzUNHqG2bfRKvz/5V+OZ+VPfAxRv3vxT/4+JmTsrTeKv/4P9r84WJLOc1LlQaN/ZEWUbQnmBCQMn6WqvhXd8XX1/8Ci1e2oHcpNEwAAAAASUVORK5CYII=';
    return (
      <Container>
      <PTRView onRefresh={this.handleRefresh}> 
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffffff' }}>
        <Content>
          <View style={{
            marginTop: 10,
            marginHorizontal: 5,
          }}>
            <FlatList
              numColumns={1}
              data={this.state.data}
              renderItem={({ item }) => (
                <Card transparent style={{ paddingHorizontal: 6 }}>
                  <CardItem cardBody>

                    <View style={{
                      flexDirection: 'row',
                      marginTop: 5,

                    }}>
                      {/* <TouchableOpacity onPress={() => onPress(item.category_id)} style={{ flex: 1, marginHorizontal: 5, }}> */}
                        <Image
                          source={{ uri: 'data:image/png;base64,'+ imagess}}
                          style={{
                            height: 150,
                            width: 100,
                            //flex: 1,
                            borderWidth: 1,
                          }}
                        />
                      {/* </TouchableOpacity> */}

                      <View style={{
                        flexDirection: 'column',
                        width:235,
                      }}>

                        <View style={{
                          flexDirection: 'row',width:165
                        }}>
                          <Text style={{ fontWeight: '800',}}>Name :</Text>
                          <Text style={{ fontWeight: '800', marginLeft: 5 }}>{item.product_name}</Text>
                        </View>

                        <View style={{
                          flexDirection: 'row',width:165
                        }}>
                          <Text style={{ fontWeight: '800',}}>Category :</Text>
                          <Text style={{ fontWeight: '800', marginLeft: 5 }}>{item.category_name}</Text>
                        </View>

                        <View style={{
                          flexDirection: 'row',width:165
                        }}>
                          <Text style={{ fontWeight: '800',}}>Description :</Text>
                          <Text style={{ fontWeight: '800', marginLeft: 5 }}>{item.product_description}</Text>
                        </View>

                        <View style={{
                          flexDirection: 'row',width:165
                        }}>
                          <Text style={{ fontWeight: '800', }}>Price :</Text>
                            <Text style={{ fontWeight: '800',marginLeft: 5 }}>{item.price}</Text>
                         
                        </View>

                        <View style={{
                          flexDirection: 'row',width:165
                        }}>
                          <Text style={{ fontWeight: '800', }}>SKU Code :</Text>
                          <Text numberOfLines={5}
                            style={{ fontWeight: '800', marginLeft: 5,}}
                            multiline={true}>{item.sku_code}</Text>
                        </View>

                      </View>
                    </View>

                  </CardItem>
                </Card>
              )}
              />
          </View>
          
        </Content>
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
});

export default Service;

