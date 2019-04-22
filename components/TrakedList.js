import _ from 'lodash';
import Modal from 'react-native-modal';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';

import TrakedItem from './TrakedItemModel';
import NewItemForm from './NewItemForm';
import AddButton from './AddButton';

export default class TrakedList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            isModalVisible: false
        }
    }

    hideModal() {
        this.setState({
            isModalVisible: false
        });
    }

    showModal() {
        this.setState({
            isModalVisible: true
        });
    }

    async fetchItems() {
        const list = [];

        try {
            const keys = await AsyncStorage.getAllKeys();
            console.log('Getted Keys', keys);
            const values = await AsyncStorage.multiGet(keys);
            console.log('Getted values', values);

            for (let i = 0; i < values.length; i++) {
                const value = values[i][1];
                list.push(JSON.parse(value));
            }

            return list;
        } catch (error) {
            console.log('fetchItems error', error);
            return list;
        }
    }

    insertNewItem(newTrakedItem) {
        this.setState(
            (prevState) => {
                prevState.list.push(newTrakedItem);
                return {
                    list: prevState.list
                }
            }
        )
    }

    async removeItem() {
        const list = await this.fetchItems();

        this.setState({ list });
    }

    async componentDidMount() {
        const list = await this.fetchItems();

        this.setState({ list });
    }

    render() {
        return <View style={{ flex: 1, alignItems: 'flex-end' }}>
            {
                this.state.list.map((l, i) => (
                    <TrakedItem
                        key={l.id}
                        id={l.id}
                        title={l.title}
                        img={l.img}
                        current={l.current}
                        total={l.total}
                        removeItem={this.removeItem.bind(this)}
                    />
                ))
            }
            <AddButton
                onPress={this.showModal.bind(this)}
            />
            <Modal
                isVisible={this.state.isModalVisible}>
                <NewItemForm
                    insertNewItem={this.insertNewItem.bind(this)}
                    hideModal={this.hideModal.bind(this)}
                />
            </Modal>
        </View>

    }
}
