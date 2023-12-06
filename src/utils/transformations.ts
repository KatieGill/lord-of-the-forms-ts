export const capitalize = (name: string) => {
  const firstLetter = name.charAt(0).toUpperCase(); 
  const remainingLetters = name.slice(1).toLowerCase();
  return `${firstLetter}${remainingLetters}`
}

export const formatPhoneNumber = (phoneInput: string) => {
  const array = phoneInput.match(/^(\d{2})(\d{2})(\d{2})(\d{1})$/) as unknown as string[];
  array.shift();
  return array.join("-");
}