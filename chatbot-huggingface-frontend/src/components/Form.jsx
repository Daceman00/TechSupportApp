import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSendQuestion } from './useSendQuestion';

function Form() {
  const [chatHistory, setChatHistory] = useState([]); 
  const { register, handleSubmit, reset } = useForm();
  const { isSending, response, error, sendQuestion } = useSendQuestion();

  useEffect(() => {
    if (response) {
      console.log("Answer", response.answer)
      const trimmedAnswer = response.answer.includes("Answer:")
        ? response.answer.split("Answer:")[1].trim()
        : response.answer;

      setChatHistory((prev) => [...prev, { question: response.question, answer: trimmedAnswer }]);
    }

    if (error) {
      setChatHistory((prev) => [...prev, { question: "Error", answer: error }]);
    }
  }, [response, error]);

  const onSubmit = (data) => {
    const newQuestion = data.question;
    sendQuestion({
      pdfPath: "C:/Users/Korisnik/Downloads/Manual KUKA.pdf",
      question: newQuestion,
      maxNewTokens: 15
    });

    reset();
  };

  return (
    <div className='flex flex-col justify-between h-screen bg-myOra'>
      <div className='flex flex-col space-y-4 p-4 overflow-y-auto'>
        {/* Render the chat history */}
        {chatHistory.map((chat, index) => (
          <div key={index}>
            {/* User's message */}
            <div className='flex flex-row justify-end items-start gap-[1.25rem]'>
              <div className='mt-[1rem] rounded-[14px] bg-myOrange p-[1.13rem] flex'>
                <h2 className='size-textmd heading ui font-plusjakartasans leading-[1.5rem] text-myIndigo'>
                  {chat.question}
                </h2>
              </div>
              <h1 className='mt-[1rem] flex flex-shrink-0 h-[2.50rem] w-[2.50rem] items-center justify-center rounded-[20px] bg-myGreen text-center'>
                U
              </h1>
            </div>

            {/* Tech Support/Bot's response */}
            <div className='flex flex-row items-start gap-[1.25rem]'>
              <h1 className='mt-[1rem] flex flex-shrink-0 h-[2.50rem] w-[2.50rem] items-center justify-center rounded-[20px] bg-myGreen text-center'>
                T
              </h1>
              <div className='mt-[1rem] rounded-[14px] bg-myOrange p-[1.13rem] flex'>
                <h2 className='size-textmd heading ui font-plusjakartasans leading-[1.5rem] text-myIndigo'>
                  {chat.answer}
                </h2>
              </div>
            </div>
          </div>
        ))}
        {isSending && (
          <div className='flex flex-row items-start gap-[1.25rem]'>
            <h1 className='mt-[1rem] flex flex-shrink-0 h-[2.50rem] w-[2.50rem] items-center justify-center rounded-[20px] bg-myGreen text-center'>
              T
            </h1>
            <div className='mt-[1rem] rounded-[14px] bg-myOrange p-[1.13rem] flex'>
              <h2 className='size-textmd heading ui font-plusjakartasans leading-[1.5rem] text-myIndigo'>
                ...
              </h2>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row justify-center mb-8">
        <textarea
          className='round fill size-xs ml-4 bg-myOrange h-[3.38rem] w-[94%] rounded-[5px] border-myRed'
          placeholder='Enter your question...'
          {...register('question', { required: true })}
        />
        <button className="flex h-[3.38rem] w-[4.63rem] mr-4 items-center justify-center rounded-bl-[0px] rounded-br-[50%] rounded-tl-[opx] rounded-tr-[50%] bg-myGray">
          <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Form;
