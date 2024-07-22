// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TextInput, Button } from 'react-native';

const WorkoutTracker = () => {
    const [exercises, setExercises] = useState([
        { id: 1, name: 'Push-ups', sets: 3, reps: 15 },
        { id: 2, name: 'Sit-ups', sets: 3, reps: 20 },
        { id: 3, name: 'Squats', sets: 3, reps: 25 },
    ]);

    const [newExercise, setNewExercise] = useState('');
    const [newSets, setNewSets] = useState('');
    const [newReps, setNewReps] = useState('');

    const addExercise = () => {
        if (newExercise && newSets && newReps) {
            setExercises([
                ...exercises,
                { id: exercises.length + 1, name: newExercise, sets: parseInt(newSets), reps: parseInt(newReps) },
            ]);
            setNewExercise('');
            setNewSets('');
            setNewReps('');
        }
    };

    return (
        <View style={styles.container}>
            {exercises.map((exercise) => (
                <View key={exercise.id} style={styles.exerciseContainer}>
                    <Text style={styles.exerciseText}>{exercise.name}</Text>
                    <Text style={styles.setsRepsText}>Sets: {exercise.sets}</Text>
                    <Text style={styles.setsRepsText}>Reps: {exercise.reps}</Text>
                </View>
            ))}
            <TextInput
                style={styles.input}
                placeholder="Exercise Name"
                value={newExercise}
                onChangeText={setNewExercise}
            />
            <TextInput
                style={styles.input}
                placeholder="Sets"
                value={newSets}
                keyboardType="numeric"
                onChangeText={setNewSets}
            />
            <TextInput
                style={styles.input}
                placeholder="Reps"
                value={newReps}
                keyboardType="numeric"
                onChangeText={setNewReps}
            />
            <Button title="Add Exercise" onPress={addExercise} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    exerciseContainer: {
        marginBottom: 20,
    },
    exerciseText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    setsRepsText: {
        fontSize: 16,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Workout Tracker</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <WorkoutTracker />
            </ScrollView>
        </SafeAreaView>
    );
}