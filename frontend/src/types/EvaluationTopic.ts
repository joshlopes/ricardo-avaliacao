import {EvaluationSubtopic} from "./EvaluationSubtopic";
import {EvaluationCategory} from "./EvaluationCategory";

export type EvaluationTopic = {
    id: string,
    name: string,
    evaluationCategory: EvaluationCategory,
    subtopics: EvaluationSubtopic[],
}
