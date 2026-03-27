import RequestResponseDiagram from "./RequestResponseDiagram";
import HttpMethodsDiagram from "./HttpMethodsDiagram";
import DatabaseTableDiagram from "./DatabaseTableDiagram";
import OAuthFlowDiagram from "./OAuthFlowDiagram";

const diagramMap: Record<string, React.ComponentType> = {
  "1-1": RequestResponseDiagram,
  "2-1": HttpMethodsDiagram,
  "3-1": DatabaseTableDiagram,
  "4-1": OAuthFlowDiagram,
};

export function getDiagram(chapterId: string): React.ComponentType | null {
  return diagramMap[chapterId] ?? null;
}
