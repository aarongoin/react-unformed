import { getFormFieldValue } from "./getFormFieldValue";
import { setFormFieldError } from "./setFormFieldError";
import { setFormFieldValue } from "./setFormFieldValue";
import { FormHandler, FormValues } from "./types";

export function validateForm<FV extends FormValues = FormValues>(
  form: HTMLFormElement,
  validator?: FormHandler<FV>
): boolean {
  let form_valid = true;
  const formErrors = validator?.(
    (name) => getFormFieldValue(form, name),
    (name, value) => setFormFieldValue(form, name, value)
  );
  for (const el of Array.from(form.elements)) {
    if (!el.name) continue;
    const err = formErrors?.[el.name] || "";
    let is_valid =
      el.dispatchEvent(new Event("invalid", { cancelable: true })) && !err;
    if (is_valid || err) setFormFieldError(form, el.name, err);
    if (!is_valid) form_valid = false;
  }

  return form_valid;
}
