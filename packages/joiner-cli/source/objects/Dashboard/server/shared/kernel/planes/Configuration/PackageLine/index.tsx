// #region imports
    // #region libraries
    import React from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridIconPlay,
        PluridIconCommand,
        PluridIconReset,
        PluridIconAdd,
        PluridIconRepository,
        PluridIconExtract,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region internal
    import {
        StyledPackageLine,
        StyledPackageLineButtons,
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

            <StyledPackageLineButtons>
                <PluridIconPlay
                    title="run"
                />

                <PluridIconCommand
                    title="command"
                />

                <PluridIconReset
                    title="update"
                />


                <PluridIconAdd
                    title="patch"
                />

                <PluridIconRepository
                    title="commit"
                />

                <PluridIconExtract
                    title="publish"
                />
            </StyledPackageLineButtons>
        </StyledPackageLine>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default PackageLine;
// #endregion exports
