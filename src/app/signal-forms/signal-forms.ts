import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import {
  form,
  FormField,
  required,
  email,
  minLength,
  maxLength,
  min,
  max,
  pattern,
  validate,
  validateHttp,
  disabled,
  hidden,
  readonly,
  submit,
  ValidationError,
} from "@angular/forms/signals";
import { CommonModule } from "@angular/common";

export interface IRegistrationModel {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number | null;
  accountType: "individual" | "business" | "premium";
  companyName: string;
  discountCode: string;
  referralCode: string;
  bio: string;
  postalCode: string;
  termsAccepted: boolean;
}

@Component({
  selector: 'app-signal-forms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, FormField, CommonModule],
  templateUrl: './signal-forms.html',
  styleUrl: './signal-forms.scss',
})
export class SignalForms {
  // 1. Reactive form model stored as a Signal
  readonly model = signal<IRegistrationModel>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: null,
    accountType: "individual",
    companyName: "",
    discountCode: "",
    referralCode: "REF-2026-AUTOGEN",
    bio: "",
    postalCode: "",
    termsAccepted: false,
  });

  // Submission state signals
  readonly submittedData = signal<IRegistrationModel | null>(null);
  readonly isSubmitting = signal(false);

  // 2. Define the Signal Form with validation schema
  readonly registrationForm = form(this.model, (f) => {
    // --- Built-in Synchronous Validators ---

    // Required validator
    required(f.username, { message: "Username is required." });
    required(f.email, { message: "Email is required." });
    required(f.password, { message: "Password is required." });
    required(f.confirmPassword, { message: "Please confirm your password." });
    required(f.age, { message: "Age is required." });
    required(f.accountType, { message: "Account type is required." });

    // Email format validator
    email(f.email, { message: "Please enter a valid email address." });

    // MinLength & MaxLength validators
    minLength(f.password, 8, {
      message: "Password must be at least 8 characters long.",
    });
    maxLength(f.bio, 120, {
      message: "Bio cannot exceed 120 characters.",
    });

    // Min & Max numeric validators
    min(f.age, 18, { message: "You must be at least 18 years old." });
    max(f.age, 120, { message: "Please enter a valid age." });

    // Pattern (Regex) validator: e.g. 5 digits or ABC-1234
    pattern(f.postalCode, /^[0-9]{5}$/, {
      message: "Postal code must be exactly 5 digits (e.g. 12345).",
    });

    // --- Custom Synchronous Validators ---

    // Single-field custom validator: No spaces in username
    validate(f.username, ({ value }) => {
      const val = value() || "";
      if (val.includes(" ")) {
        return {
          kind: "no-spaces",
          message: "Username cannot contain spaces.",
        };
      }
      return undefined;
    });

    // Cross-field custom validator: Match password and confirmPassword
    validate(f.confirmPassword, ({ value, valueOf }) => {
      const confirmVal = value();
      const pwdVal = valueOf(f.password);
      if (confirmVal && confirmVal !== pwdVal) {
        return {
          kind: "password-mismatch",
          message: "Passwords do not match.",
        };
      }
      return undefined;
    });

    // Custom boolean requirement: Terms & Conditions
    validate(f.termsAccepted, ({ value }) => {
      if (!value()) {
        return {
          kind: "terms-required",
          message: "You must accept the Terms and Conditions.",
        };
      }
      return undefined;
    });

    // --- Asynchronous / HTTP Validator ---

    // Async validation with debounce to check if username is taken
    validateHttp(f.username, {
      request: ({ value }) => {
        const username = value();
        return username && username.length >= 3
          ? `https://jsonplaceholder.typicode.com/users?username=${encodeURIComponent(
              username
            )}`
          : undefined;
      },
      debounce: 400,
      onSuccess: (result: unknown) => {
        const users = result as Array<{ id: number; username: string }>;
        if (Array.isArray(users) && users.length > 0) {
          return {
            kind: "username-taken",
            message: `Username '${users[0].username}' is already taken. Try another.`,
          };
        }
        return undefined;
      },
      onError: () => {
        return {
          kind: "network-error",
          message: "Could not connect to availability check service.",
        };
      },
    });

    // --- Conditional Field Logic ---

    // Disabled conditionally: Discount code is only allowed for 'premium' accounts
    disabled(f.discountCode, {
      when: ({ valueOf }) => valueOf(f.accountType) !== "premium",
    });

    // Hidden conditionally: Company Name is only shown when account type is 'business'
    hidden(f.companyName, {
      when: ({ valueOf }) => valueOf(f.accountType) !== "business",
    });

    // Readonly field: Referral code cannot be edited by the user
    readonly(f.referralCode, {
      when: () => true,
    });
  });

  // Computed summary stats
  readonly errorsCount = computed(() => {
    return this.registrationForm().errors().length;
  });

  // Submit action handler
  async onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    this.isSubmitting.set(true);

    const success = await submit(this.registrationForm, async () => {
      // Simulate API registration call
      await new Promise((resolve) => setTimeout(resolve, 800));
      this.submittedData.set({ ...this.model() });
      return undefined;
    });

    this.isSubmitting.set(false);

    if (!success) {
      console.warn("Form validation failed during submission.");
    }
  }

  // Reset form to default values
  onReset() {
    this.model.set({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: null,
      accountType: "individual",
      companyName: "",
      discountCode: "",
      referralCode: "REF-2026-AUTOGEN",
      bio: "",
      postalCode: "",
      termsAccepted: false,
    });
    this.submittedData.set(null);
  }
}
