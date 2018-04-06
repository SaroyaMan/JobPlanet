import {Position} from './position.model';
import {CandidatePositionStatus} from '../shared/enums';

export class CandidatePosition {

    constructor(public positionId: number,
                public candidateUserId: number,
                public comment: string,
                public status: CandidatePositionStatus,
                public position: Position,
    ) {}
}