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
    } from '~server/utilities/general';

    import {
        JoinerLog as Log,
    } from '~server/data/interfaces';

    import EntityView from '~kernel-components/EntityView';

    import client from '~kernel-services/graphql/client';

    import {
        OBLITERATE_LOG,
    } from '~kernel-services/graphql/mutate';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';

    import {
        getFilterIDs,
    } from '~kernel-services/utilities';
    // #endregion external


    // #region internal
    import {
        logRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface LogsViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any;
        // #endregion methods
    // #endregion required
}

export interface LogsViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateLogs: Log[];
}

export interface LogsViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type LogsViewProperties = LogsViewOwnProperties
    & LogsViewStateProperties
    & LogsViewDispatchProperties;

const LogsView: React.FC<LogsViewProperties> = (
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

        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateLogs,
        // #endregion state

        // #region dispatch
        dispatch,
        dispatchRemoveEntity,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region handlers
    const handleLogObliterate = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'log',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_LOG,
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
        createSearchTerms(stateLogs),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateLogs.map(
            log => logRowRenderer(
                log,
                handleLogObliterate,
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

        const filteredLogs = stateLogs.filter(stateLog => {
            if (filterIDs.includes(stateLog.id)) {
                return true;
            }

            return false;
        });

        const sortedLogs = filteredLogs.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedLogs.map(
                log => logRowRenderer(
                    log,
                    handleLogObliterate,
                ),
            ),
        );
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateLogs,
        );
        const filteredRows = stateLogs.map(
            log => logRowRenderer(
                log,
                handleLogObliterate,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateLogs,
    ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <div>
                log
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
            noRows="no logs"

            filterUpdate={filterUpdate}
            refresh={() => {
            }}
        />
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): LogsViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateLogs: selectors.data.getLogs(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): LogsViewDispatchProperties => ({
    dispatch,
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
});


const ConnectedLogsView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(LogsView);
// #endregion module



// #region exports
export default ConnectedLogsView;
// #endregion exports
