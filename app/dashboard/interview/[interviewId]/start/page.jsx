"use client";

import { useState, useEffect } from 'react';
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionSection from './_components/QuestionSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link'

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        if (params?.interviewId) {
            GetInterviewDetails(params.interviewId);
        }
    }, [params]);

    const GetInterviewDetails = async (interviewId) => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId));

            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0].jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
                setInterviewData(result[0]);
            } else {
                throw new Error("No interview found");
            }
        } catch (error) {
            console.error("Failed to fetch interview details:", error);
        }
    }

    return (
        <div>
            <div className='grid grid-flow-col-1 md:grid-cols-2 gap-10'>
                {/* Question */}
                <QuestionSection 
                    mockInterviewQuestion={mockInterviewQuestion} 
                    activeQuestionIndex={activeQuestionIndex} 
                    setActiveQuestionIndex={setActiveQuestionIndex} 
                />
                {/* audio/ video */}
                <RecordAnsSection
                    mockInterviewQuestion={mockInterviewQuestion} 
                    activeQuestionIndex={activeQuestionIndex} 
                    interviewData={interviewData}   
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex > 0 && 
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
                {activeQuestionIndex != mockInterviewQuestion?.length-1 &&
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex+1)}
                        >Next Question</Button>}
                {activeQuestionIndex == mockInterviewQuestion?.length-1 &&
                    <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
                        <Button>End Interview</Button>
                    </Link>
                }    
            </div>
        </div>
    );
}

export default StartInterview;
