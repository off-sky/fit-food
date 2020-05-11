export enum ActionColors {
    ACCENT = 'accent',
    ACCENT_BORDER = 'accent_border',
    WHITE = 'white'
}

export interface Action {
    displayLabel: string;
    callback?: Function;
    disabled: boolean;
    color: ActionColors;
}