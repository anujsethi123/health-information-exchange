var FormButton = (props) => (
  <div id="button" className="customRow">
    <button onClick={props.submitHandler}>{props.title}</button>
  </div>
);
export default FormButton;
