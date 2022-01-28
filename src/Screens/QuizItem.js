import React from "react";

const QuizItem = ({ quizzz, handlechangeinput, index }) => {
    const QuizItems=()=>{
    for(let i=0; i<=4; i++){
        console.log('i',i);
        return (
            <div>
              <p className="mt-1">
                <input
                  type="radio"
                  id={`test${index}`}
                  name={`radio-group${index}`}
                  onChange={(event) => handlechangeinput(index, event, 1)}
                />
                <label htmlFor={`test${index}`} className="question-label">
                  {quizzz?.quizoption1}
                </label>
              </p>
            </div>
          );
    }}
  return (
    QuizItems()
  );
};

export default QuizItem;
