import {useState} from "react";
import droppedButton from "./dropButton.png";
import dropButton from "./addButton.png";
import "./SingleQuestion.css";

export default function SingleQuestion({question, answer}){
    const [showAnswer, setShowAnswer] = useState(false);

    return<>
        <div class="questionContainer">
            <div class="questionBody">
                <h2 onClick={() => setShowAnswer(!showAnswer)}>Q: {question}</h2>
                <button onClick={() => setShowAnswer(!showAnswer)}>
                    {!showAnswer && <img src={dropButton}></img>}
                    {showAnswer && <img src={droppedButton}></img>}
                </button>
            </div>
            {showAnswer && <p>A: {answer}</p>}
        </div>
    </>;
}