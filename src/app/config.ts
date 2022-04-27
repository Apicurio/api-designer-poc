
export type FederatedModulesType = {
    ads: string;
}

export type ApiUrlsType = {
    ams: string;
    srs: string;
}

export type ApiDesignerConfigType = {
    apis: ApiUrlsType;
    federatedModules: FederatedModulesType;
}
