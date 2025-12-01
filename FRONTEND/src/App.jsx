import { Input } from "./components/ui/Input";
import { UserCreatePage } from "./features/users/pages/UserCreatePage";

function App() {
  return (
    <div>
      {/* <UserCreatePage></UserCreatePage> */}
      <Input type = "text" placeholder="Enter Name" name = "Name"></Input>
    </div>
  );
}

export default App;
