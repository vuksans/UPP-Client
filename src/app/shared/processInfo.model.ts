import {ReviewComment} from './reviewComment.model';

export class ProcessInfoModel {
  constructor(public journalAbstract: string,
              public keyPoints: string,
              public headline: string,
              public authorName: string,
              public branchName: string,
              public reviewCommentDTOList: ReviewComment[]) {}
}
