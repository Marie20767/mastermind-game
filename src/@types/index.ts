/* eslint-disable no-unused-vars */
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

export interface PegColorsType {
  Red: '#ac274d',
  Yellow: '#f7d840',
  Blue: '#2b9de5',
  Orange: '#f49633',
  Green: '#06ba7e',
  White: '#fff',
  Purple: '#a99cc7',
}

export interface EmptyPegColorsType {
  InnerCircle: CircleColor,
  OuterCircle: CircleColor,
}

export type PegColor = '#ac274d' | '#f7d840' | '#2b9de5' | '#f49633' | '#06ba7e' | '#fff' | '#a99cc7';

export type CircleColor = PegColor | '#4e4e4c' | 'transparent';

export type UserAnswer = PegColor | null;

export type SolutionArray = PegColor[]

export type OnClickDiv = React.MouseEventHandler<HTMLDivElement> | undefined

export type OnClickButton = React.MouseEventHandler<HTMLButtonElement> | undefined

export type OnClickIcon = React.MouseEventHandler<SVGSVGElement> | undefined

export type OnClickPickUserAnswer = (color: PegColor) => void

export type RoundAnswers = UserAnswer[]

export type AllUserAnswers = RoundAnswers[]

export type SetAllUserAnswers = (allUserAnswers: AllUserAnswers) => void

export type RoundPegFeedback = number[]

export type AllPegFeedback = RoundPegFeedback[]

export type InitialValue = string[] | null[][] | number[][] | number | boolean

export type SetBooleanFunction = (parameter: boolean) => void

export type SetNumberFunction = (parameter: number) => void

export type IconType = IconProp
