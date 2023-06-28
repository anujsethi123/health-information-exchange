var FormInput = (props) => (
  <div className="customRow">
    <label>{props.description}</label>
    <input
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      //   onChange={props.handleChange}
      onChange={(e) => {
        props.onChange(e);
      }}
    />
  </div>
);

export default FormInput;
