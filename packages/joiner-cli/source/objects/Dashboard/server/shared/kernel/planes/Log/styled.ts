// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledLog {
    theme: Theme;
}

export const StyledLog = styled.div<IStyledLog>`
    padding: 2rem;

    font-family: ${
        ({
            theme,
        }: IStyledLog) => theme.fontFamilySansSerif
    };
`;


export interface IStyledLogData {
    theme: Theme;
}

export const StyledLogData = styled.div<IStyledLogData>`
    padding: 1rem;

    font-family: ${
        ({
            theme,
        }: IStyledLog) => theme.fontFamilyMonospace
    };
    background-color: ${
        ({
            theme,
        }: IStyledLogData) => theme.backgroundColorSecondary
    };
    box-shadow: ${
        ({
            theme,
        }: IStyledLogData) => theme.boxShadowUmbraInset
    };
`;
// #region module
