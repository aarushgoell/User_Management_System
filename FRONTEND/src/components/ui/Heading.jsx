import { useNavigate } from "react-router-dom";

export function Heading({ heading, nav }) {
  const navigate = useNavigate();

  return (
    <div class="headingComp">
      <div>{heading}</div>
      <div
        onClick={() => {
          navigate(nav);
        }}
        class="navbut"
      >
        {heading == "ALL USERS" ? "Create User" : "All Users"}
      </div>
    </div>
  );
}
