import { Card, DeckType } from "./deck";

export interface DeckCompletionType {
  id: string;
  title: string;
  desc: string;
  completion: number;
  count: number;
}

export interface DashboardType {
  total: number;
  decks: DeckCompletionType[];
  currentCompletion: number;
}

export interface TodoDeckType extends DeckType, DeckCompletionType {}
