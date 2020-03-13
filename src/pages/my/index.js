import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import BookmarkPage from "./bookmarkPage";

const My = props => {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={path}>
          <BookmarkPage />
        </Route>
        <Route path={`${path}/bookmark`}>
          <BookmarkPage />
        </Route>
      </Switch>
    </div>
  );
};

export default My;
