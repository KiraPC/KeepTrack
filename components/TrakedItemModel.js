import React, { Component } from 'react';
import { AsyncStorage, View, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements'

import Item from './Item';
import ControllerButtons from './ControllerButtons';

export default class TrakedItemModel extends Component {
    constructor(props) {
        super(props);

        this.item = {
            id: this.props.id,
            title: this.props.title,
            img: this.props.img,
            current: this.props.current,
            total: this.props.total
        }
    }

    async updateItemModel(current) {
        this.item.current = current;
        await AsyncStorage.setItem(this.item.id, JSON.stringify(this.item));
    }

    async _deleteItemModel() {
        await AsyncStorage.removeItem(this.item.id);
        this.props.removeItem(this.item.id);
    }

    render() {
        return <Card>
            <View style={styles.container}>
                <Icon
                    name='delete'
                    onPress={this._deleteItemModel.bind(this)}
                />
            </View>
            <Item
                id={this.item.id}
                img={this.item.img}
                title={this.item.title}
            />
            <ControllerButtons
                current={this.item.current || 0}
                total={this.item.total}
                updateItem={this.updateItemModel.bind(this)}
            />
        </Card>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 320,
        marginBottom: 0
    }
});
