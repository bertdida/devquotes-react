import React from "react";
import Typography from "@material-ui/core/Typography";

function NotFoundPage() {
  return <Typography variant="h3">404 Not Found</Typography>;
}

function ForbiddenPage() {
  return <Typography variant="h3">403 Forbidden</Typography>;
}

export default { NotFoundPage, ForbiddenPage };
