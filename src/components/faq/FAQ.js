import {useState} from "react";
import SingleQuestion from "./SingleQuestion";
import { questionData } from "./questions";
import React from "react";
import "./FAQ.css";

export default function FAQ() {
  const[questions, setQuestions] = useState(questionData);

  return (
    <div id="HelpBody">
      <section id="FAQBody">
        <h1>Frequently Asked Questions</h1>
        {questions.map((question) => (
          <SingleQuestion 
          question={question.question}
          answer={question.answer} />
        ))}
      </section>
      <section id="ContactBody">
        <h2>Need more help? Send in your question below!</h2>
            <form>
                <section>
                    <input type="text" name="name" placeholder="John Doe"></input>
                    <input type="email" name="email" placeholder="johnDoe@email.com"></input>
                    <input type="submit"></input>
                </section>
                <input type="text" name="question" placeholder="I have a question about..."></input>
            </form>
      </section>
    </div>
  );
}
