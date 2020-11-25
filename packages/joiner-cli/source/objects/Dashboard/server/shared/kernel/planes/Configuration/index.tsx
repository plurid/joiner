// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridComponentProperty,
    } from '@plurid/plurid-react';

    import {
        PluridIconFrame,
    } from '@plurid/plurid-icons-react';

    import {
        PluridTextItem,
    } from '@plurid/plurid-ui-react';
    // #endregion libraries


    // #region external
    import {
        JoinerConfiguration,
    } from '#server/data/interfaces';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    // import actions from '#kernel-services/state/actions';
    // #endregion external


    // #region internal
    import PackageLine from './PackageLine';

    import {
        StyledConfiguration,
        StyledPackageLines,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ConfigurationOwnProperties {
    plurid: PluridComponentProperty;
}

export interface ConfigurationStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateConfigurations: JoinerConfiguration[];
}

export interface ConfigurationDispatchProperties {
}

export type ConfigurationProperties = ConfigurationOwnProperties
    & ConfigurationStateProperties
    & ConfigurationDispatchProperties;

const Configuration: React.FC<ConfigurationProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region own
        plurid,
        // #endregion own

        // #region state
        stateConfigurations,
        stateGeneralTheme,
        // stateInteractionTheme,
        // #endregion state
    } = properties;

    const {
        id,
    } = plurid.route.plane.parameters;
    // #endregion properties


    // #region state
    const [
        configuration,
        setConfiguration,
    ] = useState(
        stateConfigurations.find(configuration => configuration.id === id)
    );
    // #endregion state


    // #region effects
    useEffect(() => {
        const configuration = stateConfigurations.find(configuration => configuration.id === id);

        if (configuration) {
            setConfiguration(configuration);
        }
    }, [
        stateConfigurations,
    ]);
    // #endregion effects


    // #region render
    const configurationRender = (
        configuration: JoinerConfiguration,
    ) => {
        const {
            path,
            packages,
        } = configuration;

        return (
            <StyledConfiguration>
                <PluridTextItem
                    name="path"
                    render={(
                        <h1>
                            {path}
                        </h1>
                    )}
                />

                <div
                    style={{
                        margin: '2rem 0',
                    }}
                >
                    <PluridTextItem
                        icon={PluridIconFrame}
                        name="packages"
                        render={(<>
                            <h2>
                                packages
                            </h2>
                        </>)}
                    />

                    <StyledPackageLines>
                        <ul>
                            {packages.map(pkg => {
                                return (
                                    <li
                                        key={Math.random() + ''}
                                    >
                                        <PackageLine
                                            name={pkg}
                                            theme={stateGeneralTheme}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </StyledPackageLines>
                </div>
           </StyledConfiguration>
        );
    }

    return (
        <>
            {configuration && configurationRender(configuration)}
        </>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ConfigurationStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateConfigurations: selectors.data.getConfigurations(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ConfigurationDispatchProperties => ({
});


const ConnectedConfiguration = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(Configuration);
// #endregion module



// #region exports
export default ConnectedConfiguration;
// #endregion exports
