import { ErrorMessage } from "../ErrorMessage";
import { PhoneNumber, UserInformation } from "../types";
import { useState } from "react";
import { FunctionalTextInput } from "./FunctionalTextInput";
import {
  isEmailValid,
  isNameValid,
  isPhoneValid,
  isValidCity,
} from "../utils/validations";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({
  setUserInformation,
}: {
  setUserInformation: (userInformation: UserInformation) => void;
}) => {
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<PhoneNumber>(["", "", "", ""]);
  const [shouldShowErrorMessage, setShouldShowErrorMessage] =
    useState<boolean>(false);

  const firstNameIsValid = isNameValid(firstNameInput);
  const lastNameIsValid = isNameValid(lastNameInput);
  const emailIsValid = isEmailValid(emailInput);
  const cityIsValid = isValidCity(cityInput);
  const phoneIsValid = isPhoneValid(phoneInput);

  const shouldShowFirstNameError = !firstNameIsValid && shouldShowErrorMessage;
  const shouldShowLastNameError = !lastNameIsValid && shouldShowErrorMessage;
  const shouldShowEmailError = !emailIsValid && shouldShowErrorMessage;
  const shouldShowCityError = !cityIsValid && shouldShowErrorMessage;
  const shouldShowPhoneError = !phoneIsValid && shouldShowErrorMessage;

  const resetState = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneInput(["", "", "", ""]);
    setShouldShowErrorMessage(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          !firstNameIsValid ||
          !lastNameIsValid ||
          !emailIsValid ||
          !cityIsValid ||
          !phoneIsValid
        ) {
          alert("Bad Inputs");
          setShouldShowErrorMessage(true);
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
      <FunctionalTextInput
        labelFor="first-name"
        labelText="First Name"
        inputProps={{
          name: "first-name",
          value: firstNameInput,
          placeholder: "Bilbo",
          onChange: (e) => setFirstNameInput(e.target.value),
        }}
      />

      <ErrorMessage
        message={firstNameErrorMessage}
        show={shouldShowFirstNameError}
      />

      {/* last name input */}
      <FunctionalTextInput
        labelFor="last-name"
        labelText="Last Name"
        inputProps={{
          name: "last-name",
          value: lastNameInput,
          placeholder: "Baggins",
          onChange: (e) => setLastNameInput(e.target.value),
        }}
      />

      <ErrorMessage
        message={lastNameErrorMessage}
        show={shouldShowLastNameError}
      />

      {/* Email Input */}
      <FunctionalTextInput
        labelFor="email"
        labelText="Email"
        inputProps={{
          name: "email",
          value: emailInput,
          placeholder: "bilbo-baggins@adventurehobbits.net",
          onChange: (e) => setEmailInput(e.target.value),
        }}
      />

      <ErrorMessage message={emailErrorMessage} show={shouldShowEmailError} />

      {/* City Input */}
      <FunctionalTextInput
        labelFor="city"
        labelText="City"
        inputProps={{
          name: "city",
          value: cityInput,
          placeholder: "Hobbiton",
          list: "cities",
          onChange: (e) => setCityInput(e.target.value),
        }}
      />

      <ErrorMessage message={cityErrorMessage} show={shouldShowCityError} />

      <FunctionalPhoneInput
        phoneInput={phoneInput}
        setPhoneInput={setPhoneInput}
      />

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={shouldShowPhoneError}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
