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
import {Spinner} from "@patternfly/react-core";

const App: React.FunctionComponent = () => {
 return (
     <React.Suspense fallback={<Spinner />}>
         <Router>
             <AppLayout>
                 <AppRoutes />
             </AppLayout>
         </Router>
     </React.Suspense>
 );
}

export default App;
