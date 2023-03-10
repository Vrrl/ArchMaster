import { Avaliation } from "@src/modules/challenge/domain/avaliation";
import { AvaliationTypes } from "@src/modules/challenge/domain/avaliation-types";

export interface AvaliationRepository{
    create(avaliation: Avaliation): Promise<void>;
    getById(id: string): Promise<Avaliation | null>;
    update(avaliation: Avaliation): Promise<void>;
    list(index?: number, limit?: number, submissionId?: string, type?: AvaliationTypes): Promise<Avaliation[]>
}