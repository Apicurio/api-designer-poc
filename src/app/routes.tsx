import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";


// @ts-ignore
const FederatedHomePage = React.lazy(() => import("@ads/ads/FederatedHomePage"));
// @ts-ignore
const FederatedRegistryPage = React.lazy(() => import("@ads/ads/FederatedRegistryPage"));
// @ts-ignore
const FederatedEditorPage = React.lazy(() => import("@ads/ads/FederatedEditorPage"));


const HomePage: React.FunctionComponent = () => {
    return (<FederatedHomePage />);
};

const RegistryPage: React.FunctionComponent = () => {
    return (<FederatedRegistryPage />);
};

const EditorPage: React.FunctionComponent = () => {
    return (<FederatedEditorPage />);
};


export const AppRoutes = (): ReactElement => {
    return (
        <Switch>
            <Route path='/' exact={true} component={HomePage}/>
            <Route path='/registries/:registryId' exact={true} component={RegistryPage}/>
            <Route path='/registries/:registryId/editor' exact={true} component={EditorPage}/>
            <Route path='/editor' exact={true} component={EditorPage}/>
        </Switch>
    );
};
