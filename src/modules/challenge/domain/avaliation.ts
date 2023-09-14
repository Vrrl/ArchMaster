import { Entity } from '@src/core/domain/entity';
import { AvaliationTypes } from './avaliation-types';

export interface AvaliationProps {
  submissionId: string;
  avaliatorId?: string;
  type: AvaliationTypes;
}

export class Avaliation extends Entity<AvaliationProps> {}
