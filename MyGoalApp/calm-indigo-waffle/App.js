import React, {useState} from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoal, setCourseGoal] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim() === '') return;

    if(editingIndex !== null){
      const updatedGoals = [...courseGoal];
      updatedGoals[editingIndex] = { text: enteredGoalText, id: updatedGoals[editingIndex].id};
      setCourseGoal(updatedGoals);
      setEditingIndex(null);
    } else {
      setCourseGoal((currentCouseGoal) => [
        ...currentCouseGoal,
        { text: enteredGoalText, id: Math.random().toString() }
      ]);
    }
    setEnteredGoalText('');
  };

  const deleteGoal = (index) => {
    const updatedGoals = [...courseGoal];
    updatedGoals.splice(index, 1);
    setCourseGoal(updatedGoals);
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEditing = (index) => {
    setEnteredGoalText(courseGoal[index].text);
    setEditingIndex(index);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>My Goal</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Here"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title={editingIndex !== null? 'Edit Goal' : 'Add Goal'} onPress={addGoalHandler} />
      </View>

      <FlatList
        style={styles.flatlist}
        data={courseGoal}
        renderItem={({item, index}) => (
          <View style={styles.goalItem}>
            <TouchableOpacity onPress={() => startEditing(index)} style={styles.button}>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteGoal(index)} style={styles.button}>
              <Text style={styles.delete}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '20%',
    borderWidth: 1,
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  },
  flatlist: {
    borderWidth: 1,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderWidth: 1,
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
  delete: {
    borderWidth: 1,
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    padding: 5,
    width: 50,
  },
  edit: {
    borderWidth: 1,
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
    padding: 5,
    width: 50,
  },
  button: {
    width: '20%',
  },
});
