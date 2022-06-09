import React, { ReactElement } from "react";
import {Route, Switch, useParams} from "react-router-dom";


// @ts-ignore
const FederatedHomePage = React.lazy(() => import("@ads/ads/FederatedHomePage"));
// @ts-ignore
const FederatedEditorPage = React.lazy(() => import("@ads/ads/FederatedEditorPage"));


const HomePage: React.FunctionComponent = () => {
    const params: any = useParams();
    console.info("[HomePage] Params: ", params);
    return (<FederatedHomePage params={params} />);
};

const EditorPage: React.FunctionComponent = () => {
    const params: any = useParams();
    console.info("[EditorPage] Params: ", params);
    return (<FederatedEditorPage params={params} />);
};


export const AppRoutes = (): ReactElement => {
    return (
        <Switch>
            <Route path='/' exact={true} component={HomePage}/>
            <Route path='/designs/:designId/editor' exact={true} component={EditorPage}/>
        </Switch>
    );
};
