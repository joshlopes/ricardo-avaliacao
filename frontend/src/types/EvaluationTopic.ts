import {Subject} from "./Subject";
import {Subtopic} from "./Subtopic";

export type EvaluationTopic = {
    id: string,
    name: string,
    year: string,
    Subject: Subject,
    subtopics: Subtopic[],
}
