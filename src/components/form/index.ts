import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import * as fieldComponents from './field-components';
import * as formComponents from './form-components';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldComponents,
  formComponents,
  fieldContext,
  formContext,
});
