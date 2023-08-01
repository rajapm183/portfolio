export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "white" : state.isSelected ? "black" : "black",
    textTransform: "capitalize",
    background: state.isFocused
      ? "black"
      : state.isSelected
      ? "#d5d5d5"
      : undefined,
    ":active": {
      backgroundColor: !state.isDisabled
        ? state.isSelected
          ? 'white'
          : 'black'
        : undefined,
    },
  }),
  control: (provided, state) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    // height:'42px',
    borderRadius: "none",
    border: "1px solid #eeeeee",
    fontWeight: "300",
    color: "#555555",
    background: "#ffffff",
    padding: "8px 12px",
    // minHeight:'52px',
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 10%)",
    fontSize: "15px",
    "&:hover": {
      borderColor: "black",
    },
  }),
  singleValue: (pro, state) => ({
    ...pro,
    textTransform: "capitalize",
  }),
};
