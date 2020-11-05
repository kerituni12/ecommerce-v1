import React, { useState, useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";

import { createFilterOptions, Autocomplete } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
const OPTIONS_LIMIT = 7;
const defaultFilterOptions = createFilterOptions();

const filterOptions = (options, state) => {
  return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
      width: "auto",
    },
    marginTop: 4,
  },
  searchIcon: {
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

const styleSearchField = {
  width: "100%",
};

const btnSearch = {
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  color: "white",
  backgroundColor: "black",
  opacity: 0.8,
};

function SearchField(props) {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [tags, setTags] = useState([]);

  let arrayTag = ["đồng hồ", "thiết bị điện tử", "hàng quốc tế"];

  const fetchData = async () => {
    // const callApiData = await callApi("product/").then(async (response) => {
    //   let data = await response.data;
    //   return data;
    // });

    // callApiData.map((item) => {
    //   arrayTag.push(item.title);
    // });

    setTags(arrayTag);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setRedirect(true);
  };

  const handleTag = ({ target }, fieldName) => {
    const { value } = target;
    setKeyword(value);
  };

  if (redirect) {
    window.location = "/";
    setRedirect(false);
  }

  return (
    <div style={{ width: "80%" }}>
      <div className={classes.search} style={styleSearchField}>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            id="custom-input-demo"
            options={tags}
            size="small"
            filterOptions={filterOptions}
            onSelect={(event) => handleTag(event, "tags")}
            renderInput={(params) => (
              <div ref={params.InputProps.ref} style={{ width: "100%" }}>
                <InputBase
                  placeholder="Tìm kiếm sản phẩm ..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  style={styleSearchField}
                  inputProps={{ "aria-label": "search" }}
                  {...params.inputProps}
                />
              </div>
            )}
          />
          <Button variant="contained" style={btnSearch} onClick={handleSubmit}>
            <div className={classes.searchIcon}>
              <SearchIcon style={{ color: "wheat" }} />
            </div>
          </Button>
        </form>{" "}
      </div>
    </div>
  );
}

export default SearchField;
