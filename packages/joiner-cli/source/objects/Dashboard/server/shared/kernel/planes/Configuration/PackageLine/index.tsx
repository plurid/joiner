// #region imports
    // #region libraries
    import React from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridIconPlay,
        PluridIconCommand,
        PluridIconAdd,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region internal
    import {
        StyledPackageLine,
    } from './styled';
    // #endregion internal
// #region imports



// #region module
export interface PackageLineProperties {
    // #region required
        // #region values
        name: string;
        theme: Theme;
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

const PackageLine: React.FC<PackageLineProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            name,
            theme,
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region render
    return (
        <StyledPackageLine
            theme={theme}
        >
            <div>
                {name}
            </div>

            <div>
                <PluridIconPlay />

                <PluridIconCommand />

                <PluridIconAdd />
            </div>
        </StyledPackageLine>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default PackageLine;
// #endregion exports
