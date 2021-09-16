import * as React from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import App from "./components/App";
import CreatePost from "./components/create";
import DiscoverPage from "./components/discoverPage";
import MenuPage from "./components/menuPage";
import PostPage from "./components/postPage";
import PostsPage from "./components/postsPage";
import DiscoverMerchant from "./components/discoverMerchant";
import DiscoverPostPage from "./components/discoverPostPage";
import MexEntryHome from "./components/mexEntryHome";
import MexEntryOverview from "./components/mexEntryOverview";

export interface IRoutesProps {}

export default class Routes extends React.Component<IRoutesProps> {
  public render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={App} />
            <Route
              exact
              path="/merchant/:merchantID/create"
              render={(props) => (
                <CreatePost
                  merchantID={props.match.params.merchantID}
                  routerProps={props}
                />
              )}
            />
            <Route
              exact
              path="/merchant/:merchantID/post/:postID"
              render={(props) => (
                <PostPage
                  merchantID={props.match.params.merchantID}
                  postID={props.match.params.postID}
                  routerProps={props}
                />
              )}
            />
            <Route
              exact
              path="/pax/merchant/:merchantID/post/:postID"
              render={(props) => (
                <DiscoverPostPage
                  merchantID={props.match.params.merchantID}
                  postID={props.match.params.postID}
                  routerProps={props}
                />
              )}
            />
            <Route
              exact
              path="/merchant/:merchantID/posts"
              render={(props) => (
                <PostsPage
                  merchantID={props.match.params.merchantID}
                  routerProps={props}
                />
              )}
            />
            <Route
              exact
              path="/discover"
              render={(props) => <DiscoverPage routerProps={props} />}
            />
            <Route
              exact
              path="/pax/merchant/:merchantID/menu"
              render={(props) => (
                <MenuPage
                  routerProps={props}
                  merchantID={props.match.params.merchantID}
                />
              )}
            />
            <Route
              exact
              path="/pax/merchant/:merchantID/posts"
              render={(props) => (
                <DiscoverMerchant
                  routerProps={props}
                  merchantID={props.match.params.merchantID}
                />
              )}
            />
            <Route
              exact
              path="/pax/merchant/:merchantID/home"
              render={(props) => (
                <Redirect
                  to={`/pax/merchant/${props.match.params.merchantID}/menu`}
                />
              )}
            />
            <Route
              exact
              path="/merchant/:merchantID/home"
              render={(props) => (
                <MexEntryHome
                  merchantID={props.match.params.merchantID}
                  routerProps={props}
                />
              )}
            />
            <Route
              exact
              path="/merchant/:merchantID/overview"
              render={(props) => (
                <MexEntryOverview
                  merchantID={props.match.params.merchantID}
                  routerProps={props}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
