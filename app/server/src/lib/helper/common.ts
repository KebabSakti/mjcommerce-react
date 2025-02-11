import multer from "multer";
import { BadRequest } from "./failure";

export async function delay(value: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, value));
}

export function toModel<T extends Record<string, any>>(
  object: Record<string, any>
): T {
  let model: T = {} as T;

  for (const [key, value] of Object.entries(object)) {
    model = { ...model, [key]: value };
  }

  return model;
}

export function invoice(): string {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = String(currentDate.getFullYear()).slice(-2); // Get last two digits of the year
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const prefix = "INV";
  const dateString = day + month + year + hours + minutes + seconds;

  const randomDigits = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number

  return prefix + dateString + randomDigits;
}

export function convertToValidPhoneNumber(phoneNumber: string) {
  // Check if the phone number already starts with '+62' or '62'
  if (phoneNumber.startsWith("+62") || phoneNumber.startsWith("62")) {
    // Phone number is already valid
    return phoneNumber;
  }

  // Check if the phone number starts with '0'
  if (phoneNumber.startsWith("0")) {
    // Remove the leading '0' and prepend '62'
    return "62" + phoneNumber.substring(1);
  }

  // Add '62' prefix to the phone number
  return "62" + phoneNumber;
}

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload/image/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ".jpg");
    },
  }),
  fileFilter: (_, file, cb) => {
    const images = ["image/jpeg", "image/jpg", "image/png"];
    if (images.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new BadRequest("Hanya gambar yang boleh di upload"));
    }
  },
}).array("picture");

export function generateOTP(): string {
  let otp = '';
  for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10); // Generate random digit (0-9)
  }
  return otp;
}
