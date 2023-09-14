import { Entity } from '@src/core/domain/entity';
import { Avaliation } from './avaliation';

export interface SubmissionProps {
  ownerId: string;
  challengeId: string;
  repositoryLink: string;
  avaliations?: Avaliation[];
}

export class Submission extends Entity<SubmissionProps> {}
