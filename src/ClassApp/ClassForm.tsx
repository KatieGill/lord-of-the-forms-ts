import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { PhoneNumber, UserInformation } from "../types";
import {
  isEmailValid,
  isNameValid,
  isPhoneValid,
  isValidCity,
} from "../utils/validations";
import { ClassTextInput } from "./ClassTextInput";
import { ClassPhoneInput } from "./ClassPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

type ClassFormProps = {
  handleUserInformation: (userinfo: UserInformation) => void;
};

type ClassFormState = {
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  cityInput: string;
  phoneInput: PhoneNumber;
  shouldShowErrorMessage: boolean;
};

export class ClassForm extends Component<ClassFormProps, ClassFormState> {
  state: ClassFormState = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInput: ["", "", "", ""],
    shouldShowErrorMessage: false,
  };
  render() {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneInput,
      shouldShowErrorMessage,
    } = this.state;
    const { handleUserInformation } = this.props;
    const resetState = () => {
      this.setState({ firstNameInput: "" });
      this.setState({ lastNameInput: "" });
      this.setState({ emailInput: "" });
      this.setState({ cityInput: "" });
      this.setState({ phoneInput: ["", "", "", ""] });
      this.setState({ shouldShowErrorMessage: false });
    };
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            !isNameValid(firstNameInput) ||
            !isNameValid(lastNameInput) ||
            !isEmailValid(emailInput) ||
            !isValidCity(cityInput) ||
            !isPhoneValid(phoneInput)
          ) {
            alert("Bad Inputs");
            this.setState({ shouldShowErrorMessage: true });
          } else {
            handleUserInformation({
              firstName: firstNameInput,
              lastName: lastNameInput,
              email: emailInput,
              city: cityInput,
              phone: phoneInput.join(""),
            });
            resetState();
          }
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextInput
          labelFor="first-name"
          labelText="First Name"
          inputProps={{
            name: "first-name",
            value: firstNameInput,
            placeholder: "Bilbo",
            onChange: (e) => this.setState({ firstNameInput: e.target.value }),
          }}
        />
        {!isNameValid(firstNameInput) && (
          <ErrorMessage
            message={firstNameErrorMessage}
            show={shouldShowErrorMessage}
          />
        )}

        {/* last name input */}
        <ClassTextInput
          labelFor="last-name"
          labelText="Last Name"
          inputProps={{
            name: "last-name",
            value: lastNameInput,
            placeholder: "Baggins",
            onChange: (e) => this.setState({ lastNameInput: e.target.value }),
          }}
        />
        {!isNameValid(lastNameInput) && (
          <ErrorMessage
            message={lastNameErrorMessage}
            show={shouldShowErrorMessage}
          />
        )}

        {/* Email Input */}
        <ClassTextInput
          labelFor="email"
          labelText="Email"
          inputProps={{
            name: "email",
            value: emailInput,
            placeholder: "bilbo-baggins@adventurehobbits.net",
            onChange: (e) => this.setState({ emailInput: e.target.value }),
          }}
        />
        {!isEmailValid(emailInput) && (
          <ErrorMessage
            message={emailErrorMessage}
            show={shouldShowErrorMessage}
          />
        )}

        {/* City Input */}
        <ClassTextInput
          labelFor="city"
          labelText="City"
          inputProps={{
            name: "city",
            value: cityInput,
            placeholder: "Hobbiton",
            list: "cities",
            onChange: (e) => this.setState({ cityInput: e.target.value }),
          }}
        />
        {!isValidCity(cityInput) && (
          <ErrorMessage
            message={cityErrorMessage}
            show={shouldShowErrorMessage}
          />
        )}

        <ClassPhoneInput
          phoneInput={phoneInput}
          handlePhoneInput={(phoneInput) =>
            this.setState({ phoneInput: phoneInput })
          }
        />

        {!isPhoneValid(phoneInput) && (
          <ErrorMessage
            message={phoneNumberErrorMessage}
            show={shouldShowErrorMessage}
          />
        )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
