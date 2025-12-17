import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import * as fieldComponents from './field-components';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withFieldGroup, withForm } = createFormHook({
  formContext,
  formComponents: {},
  fieldContext,
  fieldComponents,
});
