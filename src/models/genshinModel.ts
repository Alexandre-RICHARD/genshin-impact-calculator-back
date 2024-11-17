import {dbRequestExecuter as db} from "./../database";

export const genshinModel = {
    "registerUuid": async (uuid: string) => {
        const request = `
        INSERT INTO
            genshin_user
            (
                user_uuid
            )
            VALUES
            (
                ?
            )
            RETURNING Id_genshin_user, user_uuid;
        `;
        const parameters = [uuid];
        const result = await db(request, parameters);
        return result;
    },
    "getUserId": async (uuid: string) => {
        const request = `
        SELECT Id_genshin_user FROM genshin_user WHERE user_uuid = ?
    `;
        const parameters = [uuid];
        const result = await db(request, parameters);
        return result;
    },
    "getOneData": async (id: number, data_type: string) => {
        const request = `
        SELECT data_string
        FROM genshin_data
        WHERE Id_genshin_user = ?
        AND data_type = ?
    `;
        const parameters = [
            id,
            data_type
        ];
        const result = await db(request, parameters);
        return result;
    },
    "saveOneData": async (
        id: number,
        data_type: string,
        data_string: string
    ) => {
        const request = `
        INSERT INTO genshin_data (Id_genshin_user, data_type, data_string)
        VALUES (?, ?, ?);
    `;
        const parameters = [
            id,
            data_type,
            data_string
        ];
        const result = await db(request, parameters);
        return result;
    },
    "updateOneData": async (
        id: number,
        data_type: string,
        data_string: string
    ) => {
        const request = `
        UPDATE genshin_data 
        SET data_string = ?
        WHERE Id_genshin_user = ? 
        AND data_type = ?;
    `;
        const parameters = [
            data_string,
            id,
            data_type
        ];
        const result = await db(request, parameters);
        return result;
    },
    "deleteOneData": async (id: number, data_type: string) => {
        const request = `
        DELETE FROM genshin_data
        WHERE Id_genshin_user = ?
        AND data_type = ?
    `;
        const parameters = [
            id,
            data_type
        ];
        const result = await db(request, parameters);
        return result;
    },
    "deleteOneUser": async (uuid: string) => {
        const request = `
        DELETE FROM genshin_user
        WHERE user_uuid = ?
    `;
        const parameters = [uuid];
        const result = await db(request, parameters);
        return result;
    },
};
