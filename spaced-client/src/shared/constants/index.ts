import { ToolbarControl } from "@mantine/rte/lib/components/Toolbar/controls";
import { DashboardType } from "../types/dashboard";
import { Card } from "../types/deck"

export const DEFAULT_CONTROLS: ToolbarControl[][] = [
    ['bold', 'italic', 'underline', 'strike', 'h1','h2','h3','h4','h5','h6',],
    ['alignLeft', 'alignCenter', 'alignRight', 'unorderedList', 'orderedList'],
    ['sup','sub'],
    ['code','blockquote']
  ]

export const EMPTY_DECK: Card[] = [
    {
        front: "",
        back: "",
    },
    
]

export const EMPTY_DASHBOARD: DashboardType = {
    total: 0,
    currentCompletion: 0,
    decks: []
}

export const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
