export interface IStyledProgrssBarContianer {
  backgroundColor: string,
  fillerColor: string,
}

export interface IProgressBar {
  percent?: number,
  backgroundColor?: string,
  fillerColor?: string,
  value?: string,
  divider?: string,
  showValue: boolean,
}
