import { PhoneNumber } from "../types";
import { allCities } from "./all-cities";

export function isEmailValid(emailAddress: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailAddress.match(regex);
}

export function isNameValid(name: string) {
  const regex = /\d/;
  return !regex.test(name) && name.length > 1;
}

export function isValidCity(city: string) {
  const cities = [...allCities].map(city => city.toLowerCase());
  return cities.includes(city.toLowerCase());
}

export function isPhoneValid(phoneNumber: PhoneNumber) {
  const number = phoneNumber.join("")
  const regex = /^[0-9]{7}$/;
  return regex.test(number);
}


