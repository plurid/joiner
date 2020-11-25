// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledPackageLine {
    theme: Theme;
}

export const StyledPackageLine = styled.div<IStyledPackageLine>`
    display: grid;
    grid-template-columns: 400px 200px;
    margin-bottom: 1rem;
`;



export const StyledPackageLineButtons = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 30px);
    align-items: center;
    justify-content: center;
    justify-items: center;
`;
// #region module
