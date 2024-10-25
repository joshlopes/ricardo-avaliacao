import {Subject} from "./Subject";
import {EvaluationTopic} from "./EvaluationTopic";

export type EvaluationCategory = {
    id: string,
    name: string,
    year: string,
    Subject: Subject,
    EvaluationTopics: EvaluationTopic[],
}
