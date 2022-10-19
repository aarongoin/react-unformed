var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import * as React from "react";
import { getFieldValue } from "../core/getFieldValue";
import {
  getFormValuesAsFormData,
  getFormValuesAsJson
} from "../core/getFormValues";
import { setFieldError } from "../core/setFieldError";
import { setFieldValue } from "../core/setFieldValue";
function Form(_a) {
  var _b = _a, {
    dialog,
    method = "post",
    action,
    submitFormData,
    submitJson,
    onChange,
    onBlur,
    className
  } = _b, props = __objRest(_b, [
    "dialog",
    "method",
    "action",
    "submitFormData",
    "submitJson",
    "onChange",
    "onBlur",
    "className"
  ]);
  if (!submitFormData && !submitJson)
    throw new Error(
      "Must supply a submit method prop of either `submitFormData` or `submitJson`."
    );
  const smartProps = {};
  if (onChange)
    smartProps["onChange"] = (event) => {
      const form = event.target.form;
      const formErrors = onChange(
        (name) => getFieldValue(form, name),
        (name, value) => setFieldValue(form, name, value)
      );
      if (formErrors)
        for (const name of Object.keys(formErrors))
          setFieldError(form, name, formErrors[name]);
    };
  if (onBlur)
    smartProps["onBlur"] = (event) => {
      const form = event.target.form;
      const formErrors = onBlur(
        (name) => getFieldValue(form, name),
        (name, value) => setFieldValue(form, name, value)
      );
      if (formErrors)
        for (const name of Object.keys(formErrors))
          setFieldError(form, name, formErrors[name]);
    };
  return /* @__PURE__ */ React.createElement("form", __spreadProps(__spreadValues(__spreadProps(__spreadValues({}, props), {
    className: "df-Form".concat(className ? " " : "", className || ""),
    noValidate: typeof window !== "undefined",
    method: dialog ? "dialog" : method,
    action
  }), smartProps), {
    onSubmit: (event) => {
      const form = event.target;
      if (!dialog)
        event.preventDefault();
      if (form.reportValidity()) {
        (submitFormData ? submitFormData(getFormValuesAsFormData(form)) : submitJson(getFormValuesAsJson(form))).then((formErrors) => {
          if (!formErrors)
            return;
          for (const name of Object.keys(formErrors))
            setFieldError(form, name, formErrors[name]);
        });
      }
    }
  }));
}
export {
  Form
};
