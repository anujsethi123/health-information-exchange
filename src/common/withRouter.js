import { useParams, useNavigate } from "react-router-dom";

export function withRouter(Component) {
  return (props) => (
    <Component {...props} params={useParams()} navigate={useNavigate()} />
  );
}
