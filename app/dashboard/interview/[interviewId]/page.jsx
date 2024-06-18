"use client";

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    if (params.interviewId) {
      GetInterviewDetails(params.interviewId);
    }
  }, [params.interviewId]);

  const GetInterviewDetails = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));
      if (result.length > 0) {
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="mx-5 p-20">
      <h2 className="font-bold text-2xl">Let's get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Position/Job Role:</strong> {interviewData?.jobPosition || "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong> {interviewData?.jobDesc|| "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong> {interviewData?.jobExperience || "Loading..."}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Interview Tips</strong>
            </h2>
            <h2 className="mt-3">{process.env.NEXT_PUBLIC_INFORMATION || "Some interview tips here..."}</h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 rounded-lg border bg-secondary" />
              <Button variant="ghost" className="w-full" onClick={() => setWebCamEnabled(true)}>
                <strong>Enable Web Cam and Microphone</strong>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end mt-3 p-3">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button variant="ghost">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
