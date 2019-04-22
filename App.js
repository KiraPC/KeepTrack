import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements'

import TrakedList from './components/TrakedList'

export default class App extends React.Component {
    render() {
        return (
            <View>
                <Header
                    centerComponent={{ text: 'Traker', style: { color: '#fff' } }}
                />
                <TrakedList/>
            </View>
        );
    }
};