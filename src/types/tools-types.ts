export interface PromiseToolType {
  content: { type: "text"; text: string }[];
  isError?: boolean;
  [key: string]: unknown;
}
