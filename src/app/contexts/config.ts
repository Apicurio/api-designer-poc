import { createContext, useContext } from "react";

export type FederatedModulesType = {
    ads: string;
}

export type ApiUrlsType = {
    ams: string;
    srs: string;
}

export type AuthType = {
    enabled: boolean;
}

export type ApiDesignerConfigType = {
    apis: ApiUrlsType;
    federatedModules: FederatedModulesType;
    auth: AuthType;
}

export const ApiDesignerConfigContext = createContext<ApiDesignerConfigType | undefined>(
    undefined
);
export const useApiDesignerContext = (): ApiDesignerConfigType | undefined =>
    useContext(ApiDesignerConfigContext);
