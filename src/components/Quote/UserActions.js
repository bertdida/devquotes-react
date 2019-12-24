import React from "react";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkIcon from "@material-ui/icons/Link";
import Tooltip from "@material-ui/core/Tooltip";

function UserActions({ quote, actions }) {
  return (
    <React.Fragment>
      <Tooltip title="Share on Twitter">
        <IconButton onClick={() => actions.shareOnTwitter(quote)}>
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Facebook">
        <IconButton onClick={() => actions.shareOnFacebook(quote)}>
          <FacebookIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Copy link">
        <IconButton onClick={() => actions.handleCopyLink(quote)}>
          <LinkIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

export default UserActions;
