import { Model } from 'mongoose';
import { FitnessDocument } from './fitness.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FitnessService {

    constructor(private readonly fitnessModel: Model<FitnessDocument>){}
}
