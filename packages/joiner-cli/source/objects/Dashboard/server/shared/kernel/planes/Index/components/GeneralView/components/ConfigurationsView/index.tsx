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
    // #endregion libraries


    // #region external
    import {
        compareValues,
    } from '#server/utilities/general';

    import {
        JoinerConfiguration as Configuration,
    } from '#server/data/interfaces';

    import EntityView from '#kernel-components/EntityView';

    import client from '#kernel-services/graphql/client';

    import {
        OBLITERATE_CONFIGURATION,
    } from '#kernel-services/graphql/mutate';

    import {
        getCurrentOwner,
    } from '#kernel-services/logic/queries';

    import { AppState } from '#kernel-services/state/store';
    import selectors from '#kernel-services/state/selectors';
    import actions from '#kernel-services/state/actions';

    import {
        getFilterIDs,
    } from '#kernel-services/utilities';
    // #endregion external


    // #region internal
    import {
        configurationRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface ConfigurationsViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

export interface ConfigurationsViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateConfigurations: Configuration[];
}

export interface ConfigurationsViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type ConfigurationsViewProperties = ConfigurationsViewOwnProperties
    & ConfigurationsViewStateProperties
    & ConfigurationsViewDispatchProperties;

const ConfigurationsView: React.FC<ConfigurationsViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            // #endregion values

            // #region methods
            setGeneralView,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional

        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateConfigurations,
        // #endregion state

        // #region dispatch
        dispatch,
        dispatchRemoveEntity,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region handlers
    const handleConfigurationObliterate = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'configuration',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_CONFIGURATION,
                variables: {
                    input,
                },
            });
        } catch (error) {
            return;
        }
    }
    // #endregion handlers


    // #region state
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateConfigurations),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateConfigurations.map(
            configuration => configurationRowRenderer(
                configuration,
                handleConfigurationObliterate,
            ),
        ),
    );
    // #endregion state


    // #region handlers
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(
            searchTerms,
            value,
        );

        const filteredConfigurations = stateConfigurations.filter(stateConfiguration => {
            if (filterIDs.includes(stateConfiguration.id)) {
                return true;
            }

            return false;
        });

        const sortedConfigurations = filteredConfigurations.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedConfigurations.map(
                configuration => configurationRowRenderer(
                    configuration,
                    handleConfigurationObliterate,
                ),
            ),
        );
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateConfigurations,
        );
        const filteredRows = stateConfigurations.map(
            configuration => configurationRowRenderer(
                configuration,
                handleConfigurationObliterate,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateConfigurations,
    ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <div>
                path
            </div>

            <div />

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="3fr 30px 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no configurations"

            filterUpdate={filterUpdate}
            refresh={() => {
                getCurrentOwner(dispatch);
            }}
        />
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ConfigurationsViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateConfigurations: selectors.data.getConfigurations(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ConfigurationsViewDispatchProperties => ({
    dispatch,
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
});


const ConnectedConfigurationsView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(ConfigurationsView);
// #endregion module



// #region exports
export default ConnectedConfigurationsView;
// #endregion exports
