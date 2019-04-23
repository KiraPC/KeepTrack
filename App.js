import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { View, FlatList, AsyncStorage } from 'react-native';

import TrakedItem from './components/TrakedItem';
import NewItem from './components/NewItem/index.';

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
        )
    }

    _getTrakedItem({ item }) {
        return (
            <TrakedItem
                key={item.id}
                id={item.id}
                title={item.title}
                img={item.img}
                current={item.current}
                total={item.total}
                updateStateItems={this.updateStateItems.bind(this)}
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

    async updateStateItems() {
        const trakedItems = await this.fetchItems();

        this.setState({ trakedItems });
    }

    async componentWillMount() {
        await this.updateStateItems();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    centerComponent={{ text: 'Traker', style: { color: '#fff' } }}
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