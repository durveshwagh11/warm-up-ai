import { Module } from '@nestjs/common';
import { InterviewModule } from './interview/interview.module';

@Module({
  imports: [InterviewModule],
})
export class AppModule {}
