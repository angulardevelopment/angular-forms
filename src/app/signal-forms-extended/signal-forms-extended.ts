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
  submit,
} from "@angular/forms/signals";
import { CommonModule } from "@angular/common";

// --- Domain Interfaces ---

export interface Address {
  street: string;
  city: string;
  zipCode: string;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface CardDetails {
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
  cardDetails: CardDetails;
  documentType: "invoice" | "receipt";
  invoiceDetails: InvoiceDetails;
}

// --- Reusable Schema Definitions (schema<T>) ---

// 1. Reusable Address Schema
export const addressSchema = schema<Address>((addr) => {
  required(addr.street, { message: "Street is required." });
  required(addr.city, { message: "City is required." });
  required(addr.zipCode, { message: "ZIP code is required." });
  pattern(addr.zipCode, /^\d{2}-\d{3}$|^\d{5}$/, {
    message: "ZIP code must be 5 digits (e.g. 12345).",
  });
});

// 2. Reusable Contact Schema
export const contactSchema = schema<Contact>((contact) => {
  required(contact.email, { message: "Email is required." });
  email(contact.email, { message: "Invalid email format." });
  required(contact.phone, { message: "Phone number is required." });
  minLength(contact.phone, 9, { message: "Phone must have at least 9 digits." });
});

// 3. Card Payment Schema (Applied conditionally via applyWhen)
export const cardPaymentSchema = schema<CardDetails>((card) => {
  required(card.cardNumber, { message: "Card number is required." });
  pattern(card.cardNumber, /^\d{16}$/, { message: "Card number must be 16 digits." });
  required(card.cardHolder, { message: "Cardholder name is required." });
  required(card.expiryDate, { message: "Expiry date is required (MM/YY)." });
  required(card.cvv, { message: "CVV is required." });
  pattern(card.cvv, /^\d{3,4}$/, { message: "CVV must be 3 or 4 digits." });
});

// 4. Invoice Schema (Applied conditionally via applyWhen / applyWhenValue)
export const invoiceSchema = schema<InvoiceDetails>((inv) => {
  required(inv.companyName, { message: "Company Name is required for commercial invoices." });
  required(inv.taxId, { message: "Tax ID is required for commercial invoices." });
  minLength(inv.taxId, 6, { message: "Tax ID must be at least 6 characters." });
});

@Component({
  selector: 'app-signal-forms-extended',
  imports: [RouterOutlet, FormField, CommonModule],
  templateUrl: './signal-forms-extended.html',
  styleUrl: './signal-forms-extended.scss',
})
export class SignalFormsExtended {
  // Reactive Data Model Signal
  readonly orderModel = signal<CustomerOrder>({
    customerName: "",
    contact: {
      email: "",
      phone: "",
    },
    billingAddress: {
      street: "",
      city: "",
      zipCode: "",
    },
    shippingAddress: {
      street: "",
      city: "",
      zipCode: "",
    },
    deliveryLocations: [
      {
        street: "",
        city: "",
        zipCode: "",
      },
    ],
    paymentMethod: "card",
    cardDetails: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    },
    documentType: "invoice",
    invoiceDetails: {
      companyName: "",
      taxId: "",
    },
  });

  // State signals
  readonly submittedData = signal<CustomerOrder | null>(null);
  readonly isSubmitting = signal(false);

  // Main Form using all Schema Composition techniques
  readonly orderForm = form(this.orderModel, (f) => {
    // Root level validation
    required(f.customerName, { message: "Customer Name is required." });

    // 1. apply: Reusable schema applied to nested object fields
    apply(f.contact, contactSchema);
    apply(f.billingAddress, addressSchema);
    apply(f.shippingAddress, addressSchema);

    // 2. applyEach: Reusable schema applied to each element in an array
    applyEach(f.deliveryLocations, addressSchema);

    // 3. applyWhen: Conditionally applies cardPaymentSchema when paymentMethod === 'card'
    applyWhen(
      f.cardDetails,
      ({ valueOf }) => valueOf(f.paymentMethod) === "card",
      cardPaymentSchema
    );

    // 4. applyWhen: Conditionally applies invoiceSchema when documentType === 'invoice'
    applyWhen(
      f.invoiceDetails,
      ({ valueOf }) => valueOf(f.documentType) === "invoice",
      invoiceSchema
    );
  });

  readonly errorsCount = computed(() => this.orderForm().errors().length);

  // Helper to add extra delivery location to array
  addDeliveryLocation() {
    this.orderModel.update((m) => ({
      ...m,
      deliveryLocations: [
        ...m.deliveryLocations,
        { street: "", city: "", zipCode: "" },
      ],
    }));
  }

  // Helper to remove delivery location
  removeDeliveryLocation(index: number) {
    this.orderModel.update((m) => ({
      ...m,
      deliveryLocations: m.deliveryLocations.filter((_, i) => i !== index),
    }));
  }

  // Set document type
  setDocumentType(type: "invoice" | "receipt") {
    this.orderModel.update((m) => ({
      ...m,
      documentType: type,
    }));
  }

  // Submit Handler
  async onSubmit(event?: Event) {
    if (event) event.preventDefault();
    this.isSubmitting.set(true);

    const success = await submit(this.orderForm, async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      this.submittedData.set(JSON.parse(JSON.stringify(this.orderModel())));
      return undefined;
    });

    this.isSubmitting.set(false);

    if (!success) {
      console.warn("Validation errors prevent form submission.");
    }
  }

  // Reset form
  onReset() {
    this.orderModel.set({
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
    this.submittedData.set(null);
  }
}
