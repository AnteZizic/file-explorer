import React from "react";

import { useStyles } from "./styles";

const FilePage = () => {
  const classes = useStyles();

  return (
    <iframe title="fileView" className={classes.frame} src="/mock.pdf" />
  );
}

export default FilePage;
