import { Lightbulb } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {
    return (
        <div className='p-5 border rounded-lg my-10'>
            {mockInterviewQuestion && mockInterviewQuestion.length > 0 ? (
                <div>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                        {mockInterviewQuestion.map((questionObj, index) => (
                            <h2
                                key={index}
                                className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${index === activeQuestionIndex ? 'bg-primary text-white' : 'bg-secondary'}`}
                                onClick={() => setActiveQuestionIndex(index)}
                            >
                                Question #{index + 1}
                            </h2>
                        ))}
                    </div>
                    <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
                    <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                        <h2 className='flex gap-2 items-center text-blue-500'>
                            <Lightbulb/>
                            <strong>Note:</strong>
                        </h2>
                        <h2 className='text-sm text-blue-500 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
                    </div>
                </div>
            ) : (
                <p>No questions available.</p>
            )}
        </div>
    );
}

export default QuestionSection;
