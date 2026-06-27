import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { InterviewService } from './interview.service';

@Controller('api/interviews')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  async createInterview(
    @Body()
    body: {
      jobPosition: string;
      jobDesc: string;
      jobExperience: string;
      createdBy: string;
    },
  ) {
    return this.interviewService.createInterview(body);
  }

  @Get()
  async getInterviewsByUser(@Query('email') email: string) {
    return this.interviewService.getInterviewsByUser(email);
  }

  @Get(':mockId')
  async getInterviewById(@Param('mockId') mockId: string) {
    return this.interviewService.getInterviewById(mockId);
  }

  @Post(':mockId/answers')
  async saveUserAnswer(
    @Param('mockId') mockId: string,
    @Body()
    body: {
      question: string;
      correctAns: string;
      userAns: string;
      userEmail: string;
    },
  ) {
    return this.interviewService.saveUserAnswer({
      mockIdRef: mockId,
      ...body,
    });
  }

  @Get(':mockId/feedback')
  async getFeedback(@Param('mockId') mockId: string) {
    return this.interviewService.getFeedback(mockId);
  }
}
