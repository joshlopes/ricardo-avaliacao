import {EvaluationSubTopic} from "./EvaluationSubTopic";
import {EvaluationCategory} from "./EvaluationCategory";

export type EvaluationTopic = {
    id: string,
    name: string,
    evaluationCategory: EvaluationCategory,
    subtopics: EvaluationSubTopic[],
}
