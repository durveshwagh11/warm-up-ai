import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {
    const router = useRouter();
    const onstart =() =>{
        router.push('/dashboard/interview/' + interview?.mockId)
    }

    const onFeedbackHandler = () =>{
        router.push('/dashboard/interview/' + interview.mockId + '/feedback')
    }
  return (
    <div>
        <div className='border shadow-sm rounded-lg p-3 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
            <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-600'>{interview?.jobExperience}</h2>
            <h2 className='text-xs text-gray-400 '>Created At: {interview.createdAt}</h2>
            <div className='flex justify-between mt-2 gap-5'>
                <Button size='sm' variant = 'outline' onClick={onFeedbackHandler} className='w-full'>Feedback</Button>
                <Button size='sm' variant = 'outline' onClick={onstart} className='w-full'>Start</Button>
            </div>
        </div>
    </div>
  )
}

export default InterviewItemCard