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
  setUserInformation: (userinfo: UserInformation) => void;
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
    const { setUserInformation } = this.props;

    const firstNameIsValid = isNameValid(firstNameInput);
    const lastNameIsValid = isNameValid(lastNameInput);
    const emailIsValid = isEmailValid(emailInput);
    const cityIsValid = isValidCity(cityInput);
    const phoneIsValid = isPhoneValid(phoneInput);

    const shouldShowFirstNameError =
      !firstNameIsValid && shouldShowErrorMessage;
    const shouldShowLastNameError = !lastNameIsValid && shouldShowErrorMessage;
    const shouldShowEmailError = !emailIsValid && shouldShowErrorMessage;
    const shouldShowCityError = !cityIsValid && shouldShowErrorMessage;
    const shouldShowPhoneError = !phoneIsValid && shouldShowErrorMessage;

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
            setUserInformation({
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

        <ErrorMessage
          message={firstNameErrorMessage}
          show={shouldShowFirstNameError}
        />

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

        <ErrorMessage
          message={lastNameErrorMessage}
          show={shouldShowLastNameError}
        />

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

        <ErrorMessage message={emailErrorMessage} show={shouldShowEmailError} />

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

        <ErrorMessage message={cityErrorMessage} show={shouldShowCityError} />

        <ClassPhoneInput
          phoneInput={phoneInput}
          setPhoneInput={(phoneInput) =>
            this.setState({ phoneInput: phoneInput })
          }
        />

        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={shouldShowPhoneError}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
