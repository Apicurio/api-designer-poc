import React, {useEffect} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Config, ConfigContext, BasenameContext} from "@rhoas/app-services-ui-shared";
import {AppLayout} from "@app/app-layout";
import {AppRoutes} from "@app/routes";
import {Spinner} from "@patternfly/react-core";
import {ApiDesignerConfigType} from "@app/config";

import "@app/app.css";

import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import "@patternfly/patternfly/utilities/Sizing/sizing.css";
import "@patternfly/patternfly/utilities/Spacing/spacing.css";
import "@patternfly/patternfly/utilities/Display/display.css";
import "@patternfly/patternfly/utilities/Flex/flex.css";


const App: React.FunctionComponent = () => {

    // @ts-ignore
    const config: ApiDesignerConfigType = ApiDesignerConfig || window["ApiDesignerConfig"];

    return (
        <BasenameContext.Provider value={{getBasename: () => ""}}>
            <ConfigContext.Provider
                value={
                    {
                        srs: {
                            apiBasePath: config.apis.srs,
                        },
                        ams: {
                            apiBasePath: config.apis.ams,
                        },
                    } as Config
                }
            >
                <Router>
                    <React.Suspense fallback={<Spinner/>}>
                        <AppLayout>
                            <AppRoutes/>
                        </AppLayout>
                    </React.Suspense>
                </Router>
            </ConfigContext.Provider>
        </BasenameContext.Provider>
    );
}

export default App;
