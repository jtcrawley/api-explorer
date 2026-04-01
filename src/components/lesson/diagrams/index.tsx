import WelcomeDiagram from "./WelcomeDiagram";
import RequestResponseDiagram from "./RequestResponseDiagram";
import HttpMethodsDiagram from "./HttpMethodsDiagram";
import DatabaseTableDiagram from "./DatabaseTableDiagram";
import OAuthFlowDiagram from "./OAuthFlowDiagram";
import CapstoneArchitectureDiagram from "./CapstoneArchitectureDiagram";
import ERDDiagram from "./ERDDiagram";
import RelationshipsDiagram from "./RelationshipsDiagram";
import StatusCodesDiagram from "./StatusCodesDiagram";
import DataStatesDiagram from "./DataStatesDiagram";
import APIPatternsDiagram from "./APIPatternsDiagram";
import CRUDDiagram from "./CRUDDiagram";
import TicketAnatomyDiagram from "./TicketAnatomyDiagram";

const diagramMap: Record<string, React.ComponentType> = {
  "1-0": WelcomeDiagram,
  "1-1": RequestResponseDiagram,
  "2-1": HttpMethodsDiagram,
  "2-3": StatusCodesDiagram,
  "2-4": DataStatesDiagram,
  "2-5": APIPatternsDiagram,
  "3-1": DatabaseTableDiagram,
  "3-2": ERDDiagram,
  "3-3": CRUDDiagram,
  "3-4": RelationshipsDiagram,
  "4-1": OAuthFlowDiagram,
  "4-3": TicketAnatomyDiagram,
  "5-1": CapstoneArchitectureDiagram,
};

export function getDiagram(chapterId: string): React.ComponentType | null {
  return diagramMap[chapterId] ?? null;
}
