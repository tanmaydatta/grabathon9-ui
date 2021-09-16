import * as React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import App from "./components/App";
import CreatePost from "./components/create";
import DiscoverPage from "./components/discoverPage";
import MenuPage from "./components/menuPage";
import PostPage from "./components/postPage";
import PostsPage from "./components/postsPage";

export interface IRoutesProps {}

export default class Routes extends React.Component<IRoutesProps> {
  public render() {
    return (
      <Router>
        <div>
          <nav hidden>
            <Link to="/">Home</Link>
            <Link to="/page1">Page1`</Link>
            <Link to="/page2">Page2</Link>
          </nav>
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
              path="/merchant/:merchantID/menu"
              render={(props) => (
                <MenuPage
                  routerProps={props}
                  merchantID={props.match.params.merchantID}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
