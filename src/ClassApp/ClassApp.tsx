import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
type State = { userInformation: UserInformation | null };

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    userInformation: null,
  };
  render() {
    const { userInformation } = this.state;
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={
            // toggle the following lines to change
            // null
            //defaultUser
            userInformation
          }
        />
        <ClassForm
          handleUserInformation={(userInfo: UserInformation) =>
            this.setState({ userInformation: userInfo })
          }
        />
      </>
    );
  }
}
