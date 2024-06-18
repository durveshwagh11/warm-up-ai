"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { chatSession } from '@/utils/gemini-ai'; // Ensure chatSession is correctly imported
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDesc, yearsOfExperience);

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${yearsOfExperience}. Based on these details, provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5} interview questions along with answers in JSON format.`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const responseText = await result.response.text();
            
            const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
            let parsedResponse = null;
            if (jsonMatch && jsonMatch[1]) {
                const jsonResponse = jsonMatch[1];
                console.log("Extracted JSON:", jsonResponse); // Debugging line
                parsedResponse = JSON.parse(jsonResponse);
                console.log(parsedResponse);
            } else {
                throw new Error("JSON format not found in response");
            }

            if (parsedResponse) {
                const resp = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: parsedResponse,
                        jobPosition: jobPosition,
                        jobDesc: jobDesc,
                        jobExperience: yearsOfExperience,
                        createdBy: user?.primaryEmailAddress?.emailAddress ?? 'unknown',
                        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
                    })
                    .returning({
                        mockId: MockInterview.mockId,
                    });

                console.log("Inserted ID:", resp);
                if (resp) {
                    setOpenDialog(false);
                    router.push(`/dashboard/interview/${resp[0]?.mockId}`);
                }
            } else {
                console.log("No response received");
            }
        } catch (error) {
            console.error('Error generating interview questions:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h2 className='text-lg'>+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about the job you are interviewing for</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details about your job position/role, job description, and years of experience</h2>
                                    <div className='mt-7 my-3'>
                                        <label>Job Position/Job Role</label>
                                        <Input placeholder="Ex. Full Stack Developer" required
                                            value={jobPosition}
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-3'>
                                        <label>Job Description/Tech Stack (In Short)</label>
                                        <Textarea placeholder="Ex. React, Next, Node, Databases" required
                                            value={jobDesc}
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-3'>
                                        <label>Years of Experience</label>
                                        <Input placeholder="Ex. 4" type="number" max="30" required
                                            value={yearsOfExperience}
                                            onChange={(event) => setYearsOfExperience(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? 
                                            <>
                                                <LoaderCircle className='animate-spin' /> Generating from AI
                                            </> : 'Start Interview'}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
