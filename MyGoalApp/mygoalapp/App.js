import React, {useState} from 'react';
import {View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, } from 'react-native';


export default function App() {

  const[enteredGoalText, setEnteredGoalText] = useState('');

const [courseGoal, setCourseGoal] = useState([]);

const goalInputHandler = (enteredText) => {
  setEnteredGoalText(enteredText);

};
const addGoalHandler = () => {
  if (enteredGoalText.trim() === '') return;
  setCourseGoal((currentCourseGoals) => [...currentCourseGoals, enteredGoalText]);
  setEnteredGoalText('');
};

const deleteGoal =() => {
  const updateGoals = [...courseGoal];
  updateGoals.splice(index, 1)
  setCourseGoal(updateGoals)
};

const getRainbowColor = (index) => {
  const color =['#6495ed', '#7764ed', '#bc64ed']
  return {backgroundColor: color[index % color.length]}
};

return(
<View>
    <View>
      <TextInput
        placeholder="My Goal"
        onChangeText={goalInputHandler}
        value={enteredGoalText}
      />
      <Button title="MyGoal" onPress={addGoalHandler} />
    </View>
    <FlatList
      data={courseGoal}
      renderItem={({item, index})=> (
        <View style={[styles.goalContainer, getRainbowColor(index)]}>
          <Text>{item}</Text>
          <TouchableOpacity onPress={() => deleteGoal(index)}>
          <Text></Text>
          </TouchableOpacity>
          </View>                                                    
        )}
      keyExtractor={(item, index) => index.toString()}/>
</View>
);}

const styles = StyleSheet.create({

  goalContainer: {
    paddingTop: 20,
    padding: 10
  }
});