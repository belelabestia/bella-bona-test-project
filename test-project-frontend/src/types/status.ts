export type Status =
  | "processing"
  | "done";

export const statusOrThrow = (text: string): Status | never => {
  if (text !== "processing" && text !== "done") throw new Error("invalid status");
  return text;
};
