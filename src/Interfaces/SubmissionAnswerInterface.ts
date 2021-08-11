export type SubmissionAnswerInterface = {
    answer: { first: string, last: string } | { answer: string },
    text: string,
    prettyFormat: string | undefined,
    order: number,
    type: string,
}