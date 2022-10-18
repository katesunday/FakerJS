import { UserType } from "../data/usersData";
import {
  addNewUserTC,
  deleteUsersTC,
  modifyUserTC,
  usersReducer,
} from "./usersReducer";

let startState: UserType[];

beforeEach(() => {
  startState = [
    {
      id: 1,
      first_name: "Masha",
      last_name: "Ivanova",
      email: "masha@gmail.com",
      avatar: "link",
    },
    {
      id: 2,
      first_name: "James",
      last_name: "Ateh",
      email: "James@gmail.com",
      avatar: "link",
    },
  ];
});
test("correct user should be added", () => {
  const newUser = {
    id: 3,
    first_name: "Philip",
    last_name: "Vaval",
    email: "Philip@gmail.com",
    avatar: "link",
  };
  const endState = usersReducer(
    startState,
    addNewUserTC.fulfilled(newUser, "", newUser)
  );

  expect(endState.length).toBe(3);
  expect(endState[0].id).toBe(3);
});

test("correct user should be deleted", () => {
  const endState = usersReducer(
    startState,
    deleteUsersTC.fulfilled({ id: 1 }, "", { id: 1 })
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(2);
});

test("correct user should be modified", () => {
  const userToModify = {
    id: 1,
    first_name: "Maria",
    last_name: "Ivanova",
    email: "masha@gmail.com",
    avatar: "link",
  };
  const endState = usersReducer(
    startState,
    modifyUserTC.fulfilled(userToModify, "", userToModify)
  );

  expect(endState.length).toBe(2);
  expect(endState[0].first_name).toBe("Maria");
});
