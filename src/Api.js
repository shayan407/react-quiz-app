import React from 'react'
import { ShuffleArray } from './Utilities';

export const fetchQuestions = async (amount, difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await fetch(endpoint);
    const jsonData = await data.json();
    return jsonData.results.map((question) => (
        {
            ...question,
            answers: ShuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ));
}


export const difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
}

const questions = {
    category: "",
    correct_answer: "",
    difficulty: "",
    incorrect_answers: [""],
    question: "",
    type: ""
}

export const questionState = questions & {answers: []};