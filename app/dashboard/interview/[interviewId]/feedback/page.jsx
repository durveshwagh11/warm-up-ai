"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { UserAnswer } from '@/utils/schema';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getFeedback();
  }, [params.interviewId]);

  const getFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
    calculateOverallRating(result);
  };

  const calculateOverallRating = (feedback) => {
    if (feedback.length === 0) {
      setOverallRating(0);
      return;
    }

    const totalRating = feedback.reduce((acc, item) => acc + item.rating, 0);
    const averageRating = totalRating / feedback.length;
    const normalizedRating = Math.max(1, Math.min(10, averageRating)); 
    setOverallRating(normalizedRating);
  };

  return (
    <div className='p-10'>
      

    {feedbackList?.length==0?
    <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>
      :
    <>
      <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here's your interview feedback</h2>
      <h2 className='text-primary text-lg my-3'>
        Your overall rating: <strong>{overallRating !== null ? overallRating.toFixed(1) : 'N/A'}/10</strong>
      </h2>

      <h2 className='text-sm text-gray-500'>
        Find below interview questions with correct answers, your answers, and feedback for improvement
      </h2>
      {feedbackList && feedbackList.map((item, index) => (
        <Collapsible key={index} className='mt-7'>
          <CollapsibleTrigger className='p-2 bg-secondary gap-7 rounded-lg my-2 text-left flex justify-between w-full'>
            {item.question}
            <ChevronDown className='h-5 w-5' />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='flex flex-col gap-2'>
              <h2 className='text-red-500 p-2 border rounded-lg'>
                <strong>Rating:</strong> {item.rating}
              </h2>
              <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                <strong>Your answer:</strong> {item.userAns}
              </h2>
              <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                <strong>Correct answer:</strong> {item.correctAns}
              </h2>
              <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'>
                <strong>Feedback:</strong> {item.feedback}
              </h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      </>}
      <Button className='mt-3' onClick={() => router.replace('/dashboard')}>Go to Home</Button>
    </div>
  );
}

export default Feedback;
