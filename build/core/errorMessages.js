var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { isSelectElement, isTextareaElement } from "./types";
let errorMessages = {
  badinput: "Value is invalid.",
  required: "This field is required.",
  minlength: "Text is too short.",
  maxlength: "Text is too long.",
  pattern: "Value is invalid.",
  min: "Value is too low.",
  max: "Value is high.",
  step: "Value is invalid.",
  email: "Value is invalid.",
  url: "Value is invalid."
};
function setErrorMessages(errs) {
  errorMessages = __spreadValues(__spreadValues({}, errorMessages), errs);
}
function getErrorMessage(input) {
  if (input.validity.badInput)
    return errorMessages.badinput;
  if (input.validity.valueMissing)
    return errorMessages.required;
  if (isSelectElement(input))
    return "";
  if (input.validity.tooShort)
    return errorMessages.minlength;
  if (input.validity.tooLong)
    return errorMessages.maxlength;
  if (isTextareaElement(input))
    return "";
  if (input.validity.patternMismatch)
    return errorMessages.pattern;
  if (input.validity.rangeUnderflow)
    return errorMessages.min;
  if (input.validity.rangeOverflow)
    return errorMessages.max;
  if (input.validity.stepMismatch)
    return errorMessages.step;
  if (input.validity.typeMismatch) {
    if (input.type === "email")
      return errorMessages.email;
    if (input.type === "url")
      return errorMessages.url;
  }
  return "";
}
export {
  getErrorMessage,
  setErrorMessages
};
