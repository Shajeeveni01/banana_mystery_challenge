'use client'

import { useState, useEffect } from 'react'
import { Banana, Loader2, Heart } from 'lucide-react'
import { notification } from 'antd';
import configData from "../../config/config.json";
import axios from 'axios';

export default function Game() {
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)

  const fetchQuestion = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://marcconrad.com/uob/banana/api.php')
      const data = await response.json()
      setQuestion(data)
      setTimeLeft(30)  
    } catch (error) {
      console.error('Error fetching question:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchQuestion()
  }, [])  

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !gameOver) {
      handleWrongAnswer()  
    }
  }, [timeLeft, gameOver])

  const handleAnswer = (answer) => {
    if (answer === question.solution) {
      setScore(prevScore => prevScore + 1)
      fetchQuestion()  
    } else {
      handleWrongAnswer()  
    }
  }

  const handleWrongAnswer = () => {
    setLives(prevLives => prevLives - 1)
    if (lives <= 1) {
      handleGameOver()  
      setGameOver(true)
    } else {
      fetchQuestion()  
    }
  }

  const restartGame = () => {
    setScore(0)
    setLives(3)
    setGameOver(false)
    fetchQuestion()  
  }

  const handleGameOver = async () => {
    notification.success({
      message: 'Game Over!',
      description: 'Your final score: ' + score,
    });
    try {
      await axios.post(`${configData.API_URL}/game/gameover`, { score }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error('An error occurred during game over:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 border border-yellow-400">
        
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold flex items-center justify-center">
            <Banana className="mr-2 h-6 w-6 text-yellow-500" />
            Banana Mystery Challenge
          </h2>
          <p className="text-yellow-700">Solve the puzzle and choose the correct answer!</p>
        </div>

        <div className="space-y-4">
          {gameOver ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-red-600 mb-4">Game Over!</h3>
              <p className="text-lg mb-4">Your final score: {score}</p>
              <button
                onClick={restartGame}
                className="py-2 px-4 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition"
              >
                Play Again
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                
                <div className="flex">
                  {[...Array(lives)].map((_, i) => (
                    <Heart key={i} className="h-6 w-6 text-red-500 mr-1" fill="red" />
                  ))}
                </div>
                <div className="text-lg font-semibold">Score: {score}</div>
              </div>

              
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-yellow-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                ></div>
              </div>

             
              <div className="relative aspect-video">
                <img
                  src={question?.question}
                  alt="Banana puzzle"
                  className="w-full h-auto object-contain"
                />
              </div>

              
              <div className="grid grid-cols-5 gap-2">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="py-2 px-4 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition"
                  >
                    {i}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        
        {!gameOver && (
          <div className="flex justify-center mt-4">
            <button
              onClick={fetchQuestion}
              className="py-2 px-4 border border-yellow-500 text-yellow-500 rounded-full font-semibold hover:bg-yellow-500 hover:text-white transition"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
