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
  schema,
  apply,
  applyEach,
  applyWhen,
  applyWhenValue,
  required,
  email,
  minLength,
  pattern,
  validate,
  submit,
} from "@angular/forms/signals";
import { compatForm } from "@angular/forms/signals/compat";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";

// --- Interfaces for Schema Composition ---

export interface Address {
  street: string;
  city: string;
  zipCode: string;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface CardPayment {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface InvoiceDetails {
  companyName: string;
  taxId: string;
}

export interface CustomerOrder {
  customerName: string;
  contact: Contact;
  billingAddress: Address;
  shippingAddress: Address;
  deliveryLocations: Address[];
  paymentMethod: "card" | "cash";
  cardDetails: CardPayment;
  documentType: "invoice" | "receipt";
  invoiceDetails: InvoiceDetails;
}

// --- Reusable Schemas ---

export const addressSchema = schema<Address>((addr) => {
  required(addr.street, { message: "Street is required." });
  required(addr.city, { message: "City is required." });
  required(addr.zipCode, { message: "ZIP code is required." });
  pattern(addr.zipCode, /^\d{2}-\d{3}$|^\d{5}$/, {
    message: "ZIP code must be 5 digits (e.g. 12345).",
  });
});

export const contactSchema = schema<Contact>((contact) => {
  required(contact.email, { message: "Email is required." });
  email(contact.email, { message: "Invalid email format." });
  required(contact.phone, { message: "Phone number is required." });
  minLength(contact.phone, 9, { message: "Phone must have at least 9 digits." });
});

export const cardPaymentSchema = schema<CardPayment>((card) => {
  required(card.cardNumber, { message: "Card number is required." });
  pattern(card.cardNumber, /^\d{16}$/, { message: "Card number must be 16 digits." });
  required(card.cardHolder, { message: "Cardholder name is required." });
  required(card.expiryDate, { message: "Expiry date is required (MM/YY)." });
  required(card.cvv, { message: "CVV is required." });
  pattern(card.cvv, /^\d{3,4}$/, { message: "CVV must be 3 or 4 digits." });
});

export const invoiceSchema = schema<InvoiceDetails>((inv) => {
  required(inv.companyName, { message: "Company Name is required for invoices." });
  required(inv.taxId, { message: "Tax ID is required for invoices." });
  minLength(inv.taxId, 6, { message: "Tax ID must be at least 6 characters." });
});

@Component({
  selector: 'app-signal-forms-2',
  imports: [RouterOutlet, FormField, ReactiveFormsModule, CommonModule],
  templateUrl: './signal-forms-2.html',
  styleUrl: './signal-forms-2.scss',
})
export class SignalForms2 {
  // Navigation tab
  readonly activeTab = signal<"compat" | "schemas">("compat");

  // =========================================================================
  // 1. REACTIVE FORMS INTEROP DEMO (compatForm)
  // =========================================================================

  // Existing Reactive Forms FormControl
  readonly ageControl = new FormControl<number>(16, {
    validators: [Validators.required, Validators.min(3)],
    nonNullable: true,
  });

  // Model mixing Signal Forms fields with Reactive Forms FormControl
  readonly compatModel = signal({
    name: "Jan",
    age: this.ageControl,
  });

  // Interop form using compatForm()
  readonly compatUserForm = compatForm(this.compatModel, (f) => {
    required(f.name, { message: "Name is required." });

    // Validate Signal field using FormControl value via valueOf()
    validate(f.name, ({ valueOf }) => {
      const age = valueOf(f.age);
      if (age !== undefined && age < 18) {
        return {
          kind: "too-young",
          message: `User is ${age} years old. Must be at least 18.`,
        };
      }
      return undefined;
    });
  });

  // =========================================================================
  // 2. SCHEMA COMPOSITION DEMO (schema, apply, applyEach, applyWhen)
  // =========================================================================

  readonly orderModel = signal<CustomerOrder>({
    customerName: "",
    contact: { email: "", phone: "" },
    billingAddress: { street: "", city: "", zipCode: "" },
    shippingAddress: { street: "", city: "", zipCode: "" },
    deliveryLocations: [{ street: "", city: "", zipCode: "" }],
    paymentMethod: "card",
    cardDetails: { cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" },
    documentType: "invoice",
    invoiceDetails: { companyName: "", taxId: "" },
  });

  readonly orderForm = form(this.orderModel, (f) => {
    required(f.customerName, { message: "Customer Name is required." });

    // apply: Reusable schemas for nested objects
    apply(f.contact, contactSchema);
    apply(f.billingAddress, addressSchema);
    apply(f.shippingAddress, addressSchema);

    // applyEach: Reusable schema for array elements
    applyEach(f.deliveryLocations, addressSchema);

    // applyWhen: Conditionally applies schema
    applyWhen(
      f.cardDetails,
      ({ valueOf }) => valueOf(f.paymentMethod) === "card",
      cardPaymentSchema
    );

    applyWhen(
      f.invoiceDetails,
      ({ valueOf }) => valueOf(f.documentType) === "invoice",
      invoiceSchema
    );
  });

  // Result state
  readonly submittedResult = signal<unknown | null>(null);

  // Array actions
  addLocation() {
    this.orderModel.update((m) => ({
      ...m,
      deliveryLocations: [
        ...m.deliveryLocations,
        { street: "", city: "", zipCode: "" },
      ],
    }));
  }

  removeLocation(index: number) {
    this.orderModel.update((m) => ({
      ...m,
      deliveryLocations: m.deliveryLocations.filter((_, i) => i !== index),
    }));
  }

  setDocumentType(type: "invoice" | "receipt") {
    this.orderModel.update((m) => ({
      ...m,
      documentType: type,
    }));
  }

  // Interop demo action: update via FormControl
  setAgeFromControl(val: number) {
    this.ageControl.setValue(val);
  }

  // Submit handlers
  async onSubmitCompat(event: Event) {
    event.preventDefault();
    const success = await submit(this.compatUserForm, async () => {
      this.submittedResult.set({
        type: "compatForm (Reactive Forms + Signal Forms)",
        name: this.compatUserForm.name().value(),
        age: this.compatUserForm.age().value(),
        formControlValue: this.ageControl.value,
      });
      return undefined;
    });
    if (!success) console.warn("Compat form invalid.");
  }

  async onSubmitOrder(event: Event) {
    event.preventDefault();
    const success = await submit(this.orderForm, async () => {
      this.submittedResult.set({
        type: "Customer Order Form (Schema Composition)",
        data: this.orderModel(),
      });
      // 1. At this point all fields are already marked as touched
    // 2. If form is invalid - this function will NOT be called
    // 3. form().submitting() === true during execution
    
    // const response = await api.save(form().value());
    
    // // We can return server errors
    // if (response.error) {
    //   return [{
    //     field: myForm.email,
    //     error: customError({ kind: 'server', message: response.error })
    //   }];
    // }
      return undefined;
    });
    if (!success) console.warn("Order form invalid.");
  }
}
