import {Request, Response} from "express";
import {v4} from "uuid";

import {errorSaver} from "../utilities/errorSaver";
import {genshinModel} from "../models/genshinModel";

export const genshinController = {
    "generateUuid": async (_req: Request, res: Response) => {
        try {
            const newUuid = v4();
            await genshinModel.registerUuid(newUuid);
            res.status(200).json(newUuid);
        } catch (error) {
            res.status(500).json(["server-error"]);
            const errorF = error as Error;
            await errorSaver(
                "register-new-user",
                JSON.stringify(errorF.stack)
            );
        }
    },
    "loginWithUuid": async (req: Request, res: Response) => {
        const {uuid} = req.body;
        try {
            const result = await genshinModel.getUserId(uuid);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json(
                    "Pas d'informations sauvegardés avec cet identifiant"
                );
            }
        } catch (error) {
            const errorF = error as Error;
            await errorSaver(
                "login-with-uuid",
                JSON.stringify(errorF.stack)
            );
        }
    },
    "getUserId": async (uuid: string) => {
        try {
            const result = await genshinModel.getUserId(uuid);
            return result;
        } catch (error) {
            const errorF = error as Error;
            await errorSaver(
                "get-user-failed",
                JSON.stringify(errorF.stack)
            );
            return error;
        }
    },
    "getOneData": async (req: Request, res: Response) => {
        try {
            const {
                uuid,
                data_type,
            } = req.body;
            const userId = await genshinController.getUserId(uuid);
            const result = await genshinModel.getOneData(
                userId[0].Id_genshin_user,
                data_type
            );
            res.status(200).json(result);
        } catch (error) {
            const errorF = error as Error;
            await errorSaver(
                "get-one-data-bdd",
                JSON.stringify(errorF.stack)
            );
        }
    },
    "saveOneData": async (req: Request, res: Response) => {
        const refDateType = [
            "genshinCharactersData",
            "genshinWeaponsData",
            "genshinMaterialsData",
            "genshinOptionsData"
        ];
        const {
            uuid,
            data_type,
            data_string,
        } = req.body;
        if (refDateType.indexOf(data_type) < 0) {
            res.status(406).json("Type de donnée erronnée");
        } else {
            try {
                const userId = await genshinController.getUserId(uuid);
                const data = await genshinModel.getOneData(
                    userId[0].Id_genshin_user,
                    data_type
                );
                let result = null;
                if (data.length > 0) {
                    result = await genshinModel.updateOneData(
                        userId[0].Id_genshin_user,
                        data_type,
                        data_string
                    );

                } else {
                    result = await genshinModel.saveOneData(
                        userId[0].Id_genshin_user,
                        data_type,
                        data_string
                    );
                }
                res.status(200).json(result);
            } catch (error) {
                const errorF = error as Error;
                await errorSaver(
                    "save-one-data-failed",
                    JSON.stringify(errorF.stack)
                );
            }

        }
    },
    "deleteOneData": async (req: Request, res: Response) => {
        const {uuid, data_type} = req.body;
        try {
            const userId = await genshinController.getUserId(uuid);
            await genshinModel.deleteOneData(
                userId[0].Id_genshin_user,
                data_type
            );
            res.status(200).json("Done");
        } catch (error) {
            res.status(500).json(["server-error"]);
            const errorF = error as Error;
            await errorSaver(
                "delete-one-data-failed",
                JSON.stringify(errorF.stack)
            );
        }
    },
    "deleteOneUser": async (req: Request, res: Response) => {
        const {uuid} = req.body;
        try {
            await genshinModel.deleteOneUser(uuid);
            res.status(200).json("Done");
        } catch (error) {
            res.status(500).json(["server-error"]);
            const errorF = error as Error;
            await errorSaver(
                "delete-one-user-failed",
                JSON.stringify(errorF.stack)
            );
        }
    },
};
