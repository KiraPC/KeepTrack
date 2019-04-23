import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text} from 'react-native-elements'

export default class TrakedItemModel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const srcOptions = {};
        if (this.props.img) {
            srcOptions['uri'] = this.props.img;
        } else {
            srcOptions['icon'] = { name: 'user', type: 'font-awesome' };
        }

        return <View style={styles.container}>
            <Avatar
                size="medium"
                rounded
                source={srcOptions}
            />
            <Text style={styles.content}>
                {this.props.title || 'No Title yet!'}
            </Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        fontSize: 18,
        left: 50,
        bottom: 10,
        alignContent: 'center'
    }
});

