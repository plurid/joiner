// #region imports
    // #region internal
    import * as Types from '../types';

    import initialState from '../initial';
    // #endregion internal
// #endregion imports



// #region module
export const addEntity = (
    state: Types.State,
    action: Types.AddEntityAction,
): Types.State => {
    const {
        type,
        data,
    } = action.payload;

    const newState = {
        ...state,
    };


    // switch (type) {

    // }


    return {
        ...newState,
    };
}


export const removeEntity = (
    state: Types.State,
    action: Types.RemoveEntityAction,
): Types.State => {
    const {
        id,
        type,
    } = action.payload;

    const newState = {
        ...state,
    };


    // switch (type) {

    // }

    return {
        ...newState,
    };
}


export const addEntities = (
    state: Types.State,
    action: Types.AddEntitiesAction,
): Types.State => {
    const {
        type,
        data,
        push,
    } = action.payload;

    const newState = {
        ...state,
    };


    // switch (type) {

    // }

    return {
        ...newState,
    };
}


export const removeEntities = (
    state: Types.State,
    action: Types.RemoveEntitiesAction,
): Types.State => {
    const {
        type,
        ids,
    } = action.payload;

    const newState = {
        ...state,
    };


    // switch (type) {

    // }

    return {
        ...newState,
    };
}


export const clearData = (
    state: Types.State,
    action: Types.ClearDataAction,
): Types.State => {
    return {
        ...initialState,
    };
}



const resolvers = {
    addEntity,
    removeEntity,
    addEntities,
    removeEntities,
    clearData,
};
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
