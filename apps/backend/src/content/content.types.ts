export type Grade = 1 | 2 | 3 | 4 | 5;
export type ChallengeId = "fuentes" | "recorrido";
export type AssistanceKind = "hint" | "dialogue";

export type AssistanceRequest = {
  missionId: string;
  grade: Grade;
  challengeId: ChallengeId;
  optionId: string;
  kind: AssistanceKind;
};

export type AnswerOption = {
  id: string;
  label: string;
};

export type Challenge = {
  id: ChallengeId;
  title: string;
  prompt: string;
  options: AnswerOption[];
  feedback: {
    correct: string;
    retry: string;
  };
};

export type MissionVariant = {
  grade: Grade;
  editorialStatus: "synthetic-demo";
  historyCards: Array<{ id: string; title: string; text: string }>;
  challenges: Challenge[];
};

export type PublicMission = {
  id: string;
  contentVersion: string;
  editorialStatus: "synthetic-demo";
  title: string;
  description: string;
  location: {
    anchor: string;
    mapMode: "schematic";
    note: string;
  };
  areas: ["Ciencias Sociales", "Matemática"];
  curricularMappings: [];
  variant: MissionVariant;
};
