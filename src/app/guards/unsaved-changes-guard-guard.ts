import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component';

export const unsavedChangesGuardGuard: CanDeactivateFn<RegisterComponent> = (
  component
) => {
  return component.onDeactivate();
};
