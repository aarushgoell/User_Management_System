import { Suspense } from "react";
import {
  ListUsersPage,
  SingleUser,
} from "./features/users/pages/ListUsersPage";
import { UpdateUserPage } from "./features/users/pages/UpdateUserPage";
import { UserCreatePage } from "./features/users/pages/UserCreatePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<UserCreatePage></UserCreatePage>}></Route>

          <Route
            path="/allUsers"
            element={<ListUsersPage></ListUsersPage>}
          ></Route>
          <Route
            path="/update"
            element={<UpdateUserPage></UpdateUserPage>}
          ></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
