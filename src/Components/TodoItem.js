//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { SwipeRow, Button, Icon } from 'native-base';
import DateHelper from '../helper/Date';
import _ from '../helper/Language';

const { width, height } = Dimensions.get('window');
class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateText: _('loading'),
            stateColor: 'black',
            borderBottomColor: 'grey',
        }
    }
    componentWillReceiveProps() {
        // State 0 bekliyor, 1 tamamlandi, 2 iptal edildi 
        if (this.props.item.state === 0) {
            this.setState({ stateText: ' ', stateColor: '#202824', borderBottomColor: '#EAEAEA' });
        }
        if (this.props.item.state === 1) {
            this.setState({ stateText: _('done'), stateColor: '#7ED221', borderBottomColor: '#7ED221' });
        }
        if (this.props.item.state === 2) {
            this.setState({ stateText: _('cancel'), stateColor: '#DE0A0A', borderBottomColor: '#DE0A0A' });
        }
    }
    componentWillMount() {
        // State 0 bekliyor, 1 tamamlandi, 2 iptal edildi 
        if (this.props.item.state === 0) {
            this.setState({ stateText: ' ', stateColor: '#202824', borderBottomColor: '#EAEAEA' });
        }
        if (this.props.item.state === 1) {
            this.setState({ stateText: _('done'), stateColor: '#7ED221', borderBottomColor: '#7ED221' });
        }
        if (this.props.item.state === 2) {
            this.setState({ stateText: _('cancel'), stateColor: '#DE0A0A', borderBottomColor: '#DE0A0A' });
        }
    }
    render() {
        return (
            <View style={styles.perList}>
                <SwipeRow
                    rightOpenValue={-75}
                    leftOpenValue={75}
                    body={
                        <TouchableOpacity onPress={() => this.props.changeState(this.props.item.id)} >
                            <View style={styles.listTop}>
                                <Text style={[styles.date, { color: this.state.stateColor }]}> {DateHelper.getMonthName(this.props.item.date)} {this.props.item.time}</Text>
                                <View style={styles.locationAndName}>
                                    <Text style={[styles.text, { color: this.state.stateColor }]}> {this.props.item.name} </Text>
                                    {this.props.item.location ? <Text style={[styles.locationText, { color: this.state.stateColor }]}> {this.props.item.location} </Text> : null}
                                </View>
                            </View>
                            <View style={styles.listBottom}>
                                <Text style={[styles.state, { color: this.state.stateColor }]}> {this.state.stateText} </Text>
                                <View style={styles.lineRow}>
                                    <Text style={[styles.dot, { color: this.state.borderBottomColor }]}>•</Text>
                                    <Text style={[styles.line, { borderBottomColor: this.state.borderBottomColor }]}></Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    right={
                        <Button danger onPress={() => this.props.deleteTodo(this.props.item.id)}>
                            <Icon active name="trash" />
                        </Button>
                    }
                    left={
                        <Button warning onPress={() => this.props.editTodo(this.props.item.id)}>
                            <Icon active name="brush" />
                        </Button>
                    }
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    perList: {
        display: 'flex',
        flexDirection: 'column',
    },
    listTop: {
        flexDirection: 'row',
        marginLeft: 15,
    },
    date: {
        fontWeight: '400',
        width: width / 4
    },
    time: {
        fontWeight: '400',
        maxWidth: width / 5
    },
    locationAndName: {
        flexDirection: 'column'
    },
    text: {
        fontWeight: '400',
        width: width / 2
    },
    locationText: {
        fontWeight: '400',
        fontSize: 12,
        width: width / 2,
        height: 16
    },
    listBottom: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 10
    },
    state: {
        width: width / 4
    },
    lineRow: {
        marginTop: -15,
        width: width
    },
    dot: {
        fontSize: 38
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginLeft: 10,
        marginTop: calc(),
    }
});
function calc() {
    const hep = Dimensions.get('screen').height;
    if (hep < 533) {
        return -35 - ((500 - hep) / 50)
    } else {
        return -35 + ((hep - 500) / 50)
    }
}

//make this component available to the app
export default TodoItem;
