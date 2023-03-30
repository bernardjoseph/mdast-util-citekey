import type {Parent} from 'unist'
import type {PhrasingContent, Literal} from 'mdast'

export interface Citekey extends Parent {
  type: 'citekey'
  children: Array<CitekeyMarker | CitekeyStart | CitekeyId | CitekeyEnd>
}

export interface CitekeyMarker extends Literal {
  type: 'citekeyMarker'
}

export interface CitekeyStart extends Literal {
  type: 'citekeyStart'
}

export interface CitekeyId extends Literal {
  type: 'citekeyId'
}

export interface CitekeyEnd extends Literal {
  type: 'citekeyEnd'
}

declare module 'mdast' {
  interface StaticPhrasingContentMap {
    citekey: Citekey
    citekeyMarker: CitekeyMarker
    citekeyStart: CitekeyStart
    citekeyId: CitekeyId
    citekeyEnd: CitekeyEnd
  }
}
