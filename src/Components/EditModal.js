//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DateHelper from '../helper/Date';
import ArrayHelper from '../helper/Array';
import _ from '../helper/Language';

// create a component
class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: '',
            location: '',
            time: '',
            date: '',
            datePickerVisible: false,
            timePickerVisible: false,
        }
    }
    componentWillMount() {
        AsyncStorage.getItem('list').then(data => {
            let array = JSON.parse(data);
            const index = ArrayHelper.find(array, this.state.id);
            const { name, location, time, date } = array[index];
            this.setState({ name, location, time, date });
        })
    }
    addNewTodo() {
        if (this.state.name.length < 1) {
            Alert.alert(_('nameRequired'));
        }
        else {
            const { name, location, time, date } = this.state;
            AsyncStorage.getItem('list').then(data => {
                let newArray = JSON.parse(data);
                const index = ArrayHelper.find(newArray, this.state.id);
                newArray[index].name = name;
                newArray[index].location = location;
                newArray[index].time = time;
                newArray[index].date = date;
                const upData = JSON.stringify(newArray);
                AsyncStorage.setItem('list', upData);
                this.props.updateData();
                this.props.closeModal();
            })
        }
    }
    onClosePicker() {
        this.setState({ datePickerVisible: false, timePickerVisible: false })
    }
    render() {
        return (
            <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.h1}> {_('editTask')} </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                        placeholder={_('taskName')}
                        returnKeyType="next"
                        selectTextOnFocus={true}
                        onSubmitEditing={() => this.location.focus()}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(location) => this.setState({ location })}
                        value={this.state.location}
                        placeholder={_('location')}
                        returnKeyType="next"
                        onSubmitEditing={() => this.setState({ datePickerVisible: true })}
                        ref={(input) => this.location = input}
                    />
                    <View style={styles.dateTime}>
                        <TouchableOpacity onPress={() => this.setState({ datePickerVisible: true })}>
                            <Text style={styles.dateTimeInput}>
                                {this.state.date}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ timePickerVisible: true })}>
                            <Text style={styles.dateTimeInput}>
                                {this.state.time ? this.state.time : _('hour')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.addNewTodo()}>
                        <Text style={styles.addButton}> {_('edit')} </Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.datePickerVisible}
                        onConfirm={date => this.setState({ date: DateHelper.getDate(date) })}
                        onCancel={() => this.onClosePicker()}
                        mode="date"
                    />
                    <DateTimePicker
                        isVisible={this.state.timePickerVisible}
                        onConfirm={time => this.setState({ time: DateHelper.getTime(time) })}
                        onCancel={() => this.onClosePicker()}
                        mode="time"
                    />
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    innerContainer: {
        backgroundColor: "white",
        height: 300,
        width: '90%',
        borderRadius: 10,
        padding: 20
    },
    h1: {
        color: 'black',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10
    },
    input: {
        borderBottomColor: 'gray',
        color: 'black',
        fontWeight: '800',
        fontSize: 18
    },
    addButton: {
        backgroundColor: '#ee7659',
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 45,
        fontSize: 18,
        width: '90%',
        marginTop: 20,
        marginLeft: '5%',
        borderRadius: 25
    },
    dateTime: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    dateTimeInput: {
        width: 90,
        height: 40,
        fontWeight: '500',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
});

//make this component available to the app
export default EditModal;
