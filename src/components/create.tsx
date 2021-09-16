import * as React from "react";
import ReactPlayer from "react-player";
import { RouterProps } from "react-router-dom";
import "../css/createPost.css";
import MerchantService from "../services/MerchantService";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import { itemClassName } from "react-horizontal-scrolling-menu/dist/constants";

export interface CreatePostProps {
  merchantID: string;
  routerProps: RouterProps;
}

export interface CreatePostState {
  mediaID: number;
  fileUploaded?: any;
  file?: any;
  isImg: boolean;
  title: string;
  success: boolean;
  loading: boolean;
  error: boolean;
  itemOptions: any[];
  selectedItems: number[];
}

export default class CreatePost extends React.Component<
  CreatePostProps,
  CreatePostState
> {
  private hiddenFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: CreatePostProps) {
    super(props);
    this.state = {
      mediaID: 0,
      loading: false,
      isImg: true,
      title: "",
      success: false,
      error: false,
      itemOptions: [],
      selectedItems: [],
    };
    this.buttonClick = this.buttonClick.bind(this);
    this.hiddenFileInput = React.createRef();
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onPostClick = this.onPostClick.bind(this);
  }

  onPostClick() {
    console.log(this.state);
    this.setState({
      ...this.state,
      loading: true,
    });
    MerchantService.uploadMedia({
      file: this.state.file,
    })
      .then((res) => {
        return MerchantService.createPost({
          title: this.state.title,
          merchantID: Number(this.props.merchantID),
          mediaID: res.id,
          items: this.state.selectedItems,
        });
      })
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          loading: false,
          success: true,
        });
      })
      .catch((e) => {
        console.log("outer error", e);
        this.setState({
          ...this.state,
          loading: false,
          success: false,
          error: true,
        });
      });
  }

  componentDidMount() {
    MerchantService.getMenu({
      merchantID: Number(this.props.merchantID),
    })
      .then((res) => {
        this.setState({
          ...this.state,
          itemOptions: res.items.map((item, i) => {
            return {
              value: item.id,
              label: item.name,
            };
          }),
        });
      })
      .catch((err) => {
        console.log("error in menu", err);
        this.setState({
          ...this.state,
          loading: false,
          success: false,
          error: true,
        });
      });
  }

  buttonClick = () => {
    this.hiddenFileInput.current?.click();
  };

  onTitleChange = (e: any) => {
    this.setState({
      ...this.state,
      title: e.target.value,
    });
  };

  onFileInputChange = (e: any) => {
    console.log(e);
    let mediaType: string = e.target.files[0].type;
    this.setState({
      ...this.state,
      fileUploaded: URL.createObjectURL(e.target.files[0]),
      isImg: mediaType.startsWith("image"),
      file: e.target.files[0],
    });
  };

  onSubmit = (e: any) => {
    if (e.key === "Enter") {
      this.onPostClick();
    }
  };

  onSelectChange(e: any) {
    this.setState({
      ...this.state,
      selectedItems: e.map((item: any) => {
        return item.value;
      }),
    });
  }

  public render() {
    return (
      <div>
        {this.state.loading && <div className="App App-header">Loading...</div>}
        {!this.state.loading && this.state.error && (
          <div className="App App-header">
            Error occured, please check console
          </div>
        )}
        {!this.state.loading && !this.state.error && (
          <div className="App App-header">
            {this.state.success && (
              <Redirect to={`/merchant/${this.props.merchantID}/posts`} />
            )}
            <div className="CreatePost">
              {this.state.fileUploaded && this.state.isImg && (
                <img
                  className="PostImage"
                  src={this.state.fileUploaded}
                  onError={(e) => {
                    console.log(e);
                  }}
                  alt=""
                />
              )}
              {this.state.fileUploaded && !this.state.isImg && (
                <div className="PostImage">
                  <ReactPlayer
                    controls={true}
                    width="100%"
                    height="100%"
                    url={this.state.fileUploaded}
                  />
                </div>
              )}
              <div style={{}}>
                <label htmlFor="media">
                  <input
                    ref={this.hiddenFileInput}
                    type="file"
                    id="media"
                    name="photo"
                    accept="image/*, video/*"
                    hidden
                    onChange={this.onFileInputChange}
                    // value={photo}
                  />
                  <button className="FileInput" onClick={this.buttonClick}>
                    Choose File
                  </button>
                </label>
              </div>

              <input
                placeholder="Title"
                value={this.state.title}
                onChange={this.onTitleChange}
                onKeyPress={this.onSubmit}
                className="Title"
              ></input>
              <div
                style={{
                  margin: "2% 0 0 0",
                }}
              >
                <Select
                  isMulti
                  isClearable
                  placeholder="Select items ..."
                  name="colors"
                  options={this.state.itemOptions}
                  onChange={this.onSelectChange}
                />
              </div>
              <div
                onClick={this.onPostClick}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "2% 0 2% 0",
                  margin: "2% 0 2% 0",
                  border: "1px solid grey",
                  borderRadius: "2%",
                  background: "green",
                  color: "white",
                }}
              >
                Post
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
