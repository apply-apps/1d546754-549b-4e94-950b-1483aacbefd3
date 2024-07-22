// Filename: index.js
// Combined code from all files
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions, Text, Button, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Accelerometer } from 'expo-sensors';

const { width, height } = Dimensions.get('window');
const CELL_SIZE = 20;
const GRID_WIDTH = Math.floor(width / CELL_SIZE);
const GRID_HEIGHT = Math.floor(height / CELL_SIZE);

const initialSnake = [{ x: 5, y: 5 }];

const generateFood = () => {
  const x = Math.floor(Math.random() * GRID_WIDTH);
  const y = Math.floor(Math.random() * GRID_HEIGHT);
  return { x, y };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState('RIGHT');
  const [running, setRunning] = useState(false);

  const moveSnake = useCallback(() => {
    let newSnake = [...snake];
    let head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    newSnake = [head, ...newSnake.slice(0, -1)];

    // Check for collision with walls or self
    if (
      head.x >= GRID_WIDTH ||
      head.x < 0 ||
      head.y >= GRID_HEIGHT ||
      head.y < 0 ||
      newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      setRunning(false);
      return;
    }

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
      newSnake.push({});
      setFood(generateFood());
    }

    setSnake(newSnake);
  }, [snake, direction, food]);

  useEffect(() => {
    if (running) {
      const intervalId = setInterval(moveSnake, 100);
      return () => clearInterval(intervalId);
    }
  }, [moveSnake, running]);

  useEffect(() => {
    const subscription = Accelerometer.addListener(({ x, y }) => {
      if (running) {
        if (Math.abs(x) > Math.abs(y)) {
          setDirection(x > 0 ? 'LEFT' : 'RIGHT');
        } else {
          setDirection(y > 0 ? 'UP' : 'DOWN');
        }
      }
    });

    return () => subscription && subscription.remove();
  }, [running]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Snake Game</Text>
      <GameEngine style={styles.gameContainer}>
        {snake.map((segment, index) => (
          <View
            key={index}
            style={[
              styles.snakeSegment,
              {
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
              },
            ]}
          />
        ))}
        <View style={[styles.food, { left: food.x * CELL_SIZE, top: food.y * CELL_SIZE }]} />
      </GameEngine>
      {running ? (
        <TouchableOpacity style={styles.button} onPress={() => setRunning(false)}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setRunning(true)}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40, // To avoid status bar overlap
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  gameContainer: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'lightgray',
  },
  snakeSegment: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'green',
  },
  food: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'red',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

const App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <SnakeGame />
  </SafeAreaView>
);

export default App;