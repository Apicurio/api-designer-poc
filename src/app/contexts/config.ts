import { createContext, useContext } from "react";

export type FederatedModulesType = {
    ads: string;
    editors: string;
}

export type ApiUrlsType = {
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
