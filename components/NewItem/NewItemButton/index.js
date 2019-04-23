import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default class TrakedItemModel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={styles.container}
                onPress={this.props.onPress}>
                <View>
                    <Icon name='add-circle'
                        color='#FF6600'
                        size={65} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: { 
        position: 'absolute',
        bottom: 15,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
