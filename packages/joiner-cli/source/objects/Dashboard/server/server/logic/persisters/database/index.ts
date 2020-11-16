// #region imports
    // #region external
    import {
        databaseType,
    } from '#server/data/constants';

    import {
        Database as IDatabase,
        DatabaseType,
        DatabasePagination,
        DatabaseAggregator,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
class Database implements IDatabase {
    private type: DatabaseType;

    constructor(
        type: DatabaseType,
    ) {
        this.type = type;
    }

    public async initialize() {
        switch (this.type) {
            default:
                return false;
        }
    }

    public async get(
        entity: string,
        id: string,
    ) {
        switch (this.type) {
            default:
                return;
        }
    }

    public async getAll(
        entity: string,
    ) {
        switch (this.type) {
            default:
                return [];
        }
    }

    public async query(
        entity: string,
        field: string,
        value: string,
        pagination?: DatabasePagination,
    ) {
        switch (this.type) {
            default:
                return [];
        }
    }

    public async size(
        entity: string,
        filter: any,
    ) {
        switch (this.type) {
            default:
                return;
        }
    }

    public async aggregate(
        entity: string,
        pipeline: DatabaseAggregator[],
    ) {
        switch (this.type) {
            default:
                return;
        }
    }

    public async store(
        entity: string,
        id: string,
        data: any,
    ) {
        switch (this.type) {
            default:
                return;
        }
    }

    public async storeBatch(
        entity: string,
        data: any,
    ) {
        switch (this.type) {
            default:
                return;
        }
    }

    public async update(
        entity: string,
        id: string,
        field: string,
        value: any,
    ) {
        switch (this.type) {
            default:
                return;
        }
    }

    public async obliterate(
        entity: string,
        filter: Record<string, any>,
    ) {
        switch (this.type) {
            default:
                return;
        }
    }

    public async obliterateAll(
        entity: string,
        filter?: Record<string, any>,
    ) {
        switch (this.type) {
            default:
                return;
        }
    }
}
// #endregion module



// #region exports
export default Database;
// #endregion exports
