import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { View, FlatList, AsyncStorage } from 'react-native';

import TrakedItem from './components/TrakedItem';
import NewItem from './components/NewItem';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trakedItems: []
        }
    }

    _onItemCreated(newItem) {
        this.setState(
            (prevState) => {
                prevState.trakedItems.push(newItem);
                return {
                    trakedItems: prevState.trakedItems
                }
            }
        );
    }

    _getTrakedItem({ item }) {
        return (
            <TrakedItem style={{backgroundColor:'#FF6600'}}
                key={item.id}
                id={item.id}
                title={item.title}
                img={item.img}
                current={item.current}
                total={item.total}
                updateStateItems={this._updateStateItems.bind(this)}
            />
        );
    }

    async fetchItems() {
        const items = [];

        try {
            const keys = await AsyncStorage.getAllKeys();
            const values = await AsyncStorage.multiGet(keys);

            for (let i = 0; i < values.length; i++) {
                const value = values[i][1];
                items.push(JSON.parse(value));
            }
        } catch (error) {
            console.log('fetchItems error', error);
        }

        return items;
    }

    async _updateStateItems() {
        const trakedItems = await this.fetchItems();

        this.setState({ trakedItems });
    }

    async componentWillMount() {
        await this._updateStateItems();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000008' }}>
                <Header
                    centerComponent={{ text: 'KeepTraker', style: {
                        color: '#000000',
                        fontSize: 20,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto'
                    }}}
                    backgroundColor='#FF6600'
                />
                <FlatList
                    data={this.state.trakedItems}
                    extraData={this.state}
                    keyExtractor={item => item.id}
                    renderItem={this._getTrakedItem.bind(this)}
                />
                <NewItem
                    onItemCreated={this._onItemCreated.bind(this)}
                />
            </View>
        );
    }
};