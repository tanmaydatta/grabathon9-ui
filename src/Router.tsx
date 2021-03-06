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
import Comments from "./components/comments";
import PaxEntryHome from "./components/paxEntry";
import { GetPostRes } from "./dto/dto";

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
              path="/pax/:userID/merchant/:merchantID/post/:postID"
              render={(props) => (
                <DiscoverPostPage
                  userID={props.match.params.userID}
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
              path="/pax/:userID/discover"
              render={(props) => (
                <DiscoverPage
                  userID={props.match.params.userID}
                  routerProps={props}
                />
              )}
            />
            <Route
              exact
              path="/pax/:userID/merchant/:merchantID/menu"
              render={(props) => {
                const state = props.location.state as {
                  selected: boolean;
                  post: GetPostRes;
                };
                console.log(state);
                return (
                  <MenuPage
                    userID={props.match.params.userID}
                    post={state?.post}
                    routerProps={props}
                    merchantID={props.match.params.merchantID}
                    selected={state?.selected}
                  />
                );
              }}
            />
            <Route
              exact
              path="/pax/:userID/merchant/:merchantID/posts"
              render={(props) => (
                <DiscoverMerchant
                  routerProps={props}
                  merchantID={props.match.params.merchantID}
                  userID={props.match.params.userID}
                />
              )}
            />
            <Route
              exact
              path="/pax/:userID/merchant/:merchantID/home"
              render={(props) => (
                <Redirect
                  to={`/pax/${props.match.params.userID}/merchant/${props.match.params.merchantID}/menu`}
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
              path="/pax/:userUD/home"
              render={(props) => (
                <PaxEntryHome
                  userID={props.match.params.userUD}
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
            <Route
              exact
              path="/pax/:userID/post/:postID/comments"
              render={(props) => (
                <Comments
                  userID={props.match.params.userID}
                  routerProps={props}
                  postID={props.match.params.postID}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
