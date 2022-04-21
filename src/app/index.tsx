import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Config, ConfigContext, BasenameContext } from "@rhoas/app-services-ui-shared";
import {AppLayout} from "@app/app-layout";
import {AppRoutes} from "@app/routes";

import "@app/app.css";

import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/utilities/Accessibility/accessibility.css";
import "@patternfly/patternfly/utilities/Sizing/sizing.css";
import "@patternfly/patternfly/utilities/Spacing/spacing.css";
import "@patternfly/patternfly/utilities/Display/display.css";
import "@patternfly/patternfly/utilities/Flex/flex.css";

declare const __BASE_PATH__: string;

const App: React.FunctionComponent = () => {
 return (
     <ConfigContext.Provider
         value={
             {
                 srs: {
                     apiBasePath: __BASE_PATH__,
                 },
             } as Config
         }
     >
         <BasenameContext.Provider value={{ getBasename: () => "" }}>
             <Router>
                 <AppLayout>
                     <AppRoutes />
                 </AppLayout>
             </Router>
         </BasenameContext.Provider>
     </ConfigContext.Provider>
 );
}

export default App;
