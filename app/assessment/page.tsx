"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock, AlertCircle } from "lucide-react"

// Sample assessment questions
const questions = [
  {
    id: "q1",
    type: "mcq",
    question: "Which of the following is NOT a valid JavaScript data type?",
    options: [
      { id: "a", text: "String" },
      { id: "b", text: "Boolean" },
      { id: "c", text: "Float" },
      { id: "d", text: "Symbol" },
    ],
    correctAnswer: "c",
  },
  {
    id: "q2",
    type: "mcq",
    question: "What does CSS stand for?",
    options: [
      { id: "a", text: "Computer Style Sheets" },
      { id: "b", text: "Creative Style Sheets" },
      { id: "c", text: "Cascading Style Sheets" },
      { id: "d", text: "Colorful Style Sheets" },
    ],
    correctAnswer: "c",
  },
  {
    id: "q3",
    type: "scenario",
    question:
      "A client wants to improve their website's loading speed. The current website has many large images and unoptimized JavaScript files. What would you recommend to improve performance?",
    type: "text",
  },
  {
    id: "q4",
    type: "mcq",
    question: "Which of the following is a valid way to declare a variable in JavaScript?",
    options: [
      { id: "a", text: "var myVar = 5;" },
      { id: "b", text: "let myVar = 5;" },
      { id: "c", text: "const myVar = 5;" },
      { id: "d", text: "All of the above" },
    ],
    correctAnswer: "d",
  },
  {
    id: "q5",
    type: "mcq",
    question: "What is the purpose of the 'alt' attribute in HTML image tags?",
    options: [
      { id: "a", text: "To display alternate text when the image cannot be loaded" },
      { id: "b", text: "To provide a title for the image" },
      { id: "c", text: "To specify the image source" },
      { id: "d", text: "To set the image alignment" },
    ],
    correctAnswer: "a",
  },
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call to submit answers
    setTimeout(() => {
      setIsSubmitting(false)
      window.location.href = "/assessment/results"
    }, 2000)
  }

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">AI Skill Assessment</h1>
        <p className="mt-2 text-gray-600">Complete this assessment to help us evaluate your skills</p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="font-medium">{formatTime(timeLeft)} remaining</span>
        </div>
        <div className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <Progress value={progress} className="mb-6 h-2" />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {question.type === "mcq" && (
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              {question.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                  <Label htmlFor={`${question.id}-${option.id}`}>{option.text}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === "scenario" && (
            <Textarea
              placeholder="Type your answer here..."
              className="min-h-[150px]"
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestion === 0}>
            Previous
          </Button>

          {currentQuestion < questions.length - 1 ? (
            <Button onClick={goToNextQuestion}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Assessment"}
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="flex justify-center">
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-4 text-amber-800">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">
            Your answers will be analyzed by our AI to determine your skill level and job matches.
          </p>
        </div>
      </div>
    </div>
  )
}
