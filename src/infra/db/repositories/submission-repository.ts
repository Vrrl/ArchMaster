import { Submission } from "@src/modules/challenge/domain/submission";

export interface SubmissionRepository{
    create(submission: Submission): Promise<void>;
    getById(id: string): Promise<Submission | null>;
    update(submission: Submission): Promise<void>;
    list(index?: number, limit?: number): Promise<Submission[]>
}