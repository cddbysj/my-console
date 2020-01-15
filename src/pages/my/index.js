import React from "react";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";

import BookmarkPage from "./bookmarkPage";

const My = props => {
  const { path, url } = useRouteMatch();
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
