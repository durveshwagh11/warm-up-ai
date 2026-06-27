import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AiService } from '../ai/ai.service';
import { MockInterview, UserAnswer } from '../database/schema';
import { eq, desc } from 'drizzle-orm';

@Injectable()
export class InterviewService {
  constructor(
    private databaseService: DatabaseService,
    private aiService: AiService,
  ) {}

  async createInterview(data: {
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdBy: string;
  }) {
    const prompt = `Job position: ${data.jobPosition}, Job Description: ${data.jobDesc}, Years of Experience: ${data.jobExperience}. Generate 5 interview questions with answers in JSON format.`;

    const aiResponse = await this.aiService.generateContent(prompt);

    const mockId = `mock-${Date.now()}`;

    const [result] = await this.databaseService.db
      .insert(MockInterview)
      .values({
        jsonMockResp: aiResponse,
        jobPosition: data.jobPosition,
        jobDesc: data.jobDesc,
        jobExperience: data.jobExperience,
        createdBy: data.createdBy,
        createdAt: new Date().toISOString(),
        mockId: mockId,
      })
      .returning();

    return result;
  }

  async getInterviewsByUser(email: string) {
    const interviews = await this.databaseService.db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, email))
      .orderBy(desc(MockInterview.id));

    return interviews;
  }

  async getInterviewById(mockId: string) {
    const [interview] = await this.databaseService.db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, mockId));

    return interview;
  }

  async saveUserAnswer(data: {
    mockIdRef: string;
    question: string;
    correctAns: string;
    userAns: string;
    userEmail: string;
  }) {
    const feedbackPrompt = `Question: ${data.question}, User Answer: ${data.userAns}, Correct Answer: ${data.correctAns}. Provide feedback and rating (1-10).`;

    const feedback = await this.aiService.generateContent(feedbackPrompt);

    const [result] = await this.databaseService.db
      .insert(UserAnswer)
      .values({
        mockIdRef: data.mockIdRef,
        question: data.question,
        correctAns: data.correctAns,
        userAns: data.userAns,
        feedback: feedback,
        rating: '8',
        userEmail: data.userEmail,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return result;
  }

  async getFeedback(mockId: string) {
    const feedbacks = await this.databaseService.db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, mockId))
      .orderBy(desc(UserAnswer.id));

    return feedbacks;
  }
}
