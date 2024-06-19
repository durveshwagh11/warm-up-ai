
"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'

function RecordAnsSection() {
    const [userAnswer, setUserAnswer] = useState('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(() => {
        results.map((result) => {
          setUserAnswer(prevAns=>prevAns + result?.transcript);
        });
      }, [results])
  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col justify-center mt-20 items-center bg-black rounded-lg p-5'>
            <Image src={'/214713.png'} width={200} height={200} className='absolute' alt='mig'></Image>
            <Webcam
            mirrored={true}
            style={{
                height:300,
                width: '100%',
                zIndex:10
            }}/>
            </div>
            <Button variant = "outline" className="my-10"
                onClick = {isRecording?stopSpeechToText:startSpeechToText}>
                {isRecording? 
                <h2 className='text-red-600 flex gap-2'>
                    <Mic/> Stop Recording
                </h2>
                :
                'Record Answer'}</Button>

                <Button onClick={() => console.log(userAnswer)}>Show User</Button>
            
    </div>
  )
}

export default RecordAnsSection