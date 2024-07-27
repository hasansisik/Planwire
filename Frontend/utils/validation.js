import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string().required("İsim soyisim zorunlu alan"),
  password: Yup.string()
    .matches(/^[A-Za-z0-9.,!?\/]*$/, "Geçersiz karakter içeriyor")
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .required("Zorunlu alan"),
  email: Yup.string()
    .email("Geçerli bir e-posta sağlayın")
    .required("Zorunlu alan"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifreler uyuşmalı")
    .required("Zorunlu alan"),
  complianceModal: Yup.bool().oneOf(
    [true],
    "Kullanıcı Sözleşmesi ve Gizlilik Politikasını onaylamanız gerekmektedir."
  ),
});

export const loginSchema = Yup.object({
  password: Yup.string()
    .matches(/^[A-Za-z0-9.,!?\/]*$/, "Geçersiz karakter içeriyor")
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .required("Zorunlu alan"),
  email: Yup.string()
    .email("Geçerli bir e-posta sağlayın")
    .required("Zorunlu alan"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir e-posta sağlayın")
    .required("Zorunlu alan"),
});

export const resetPasswordSchema = Yup.object({
  passwordToken: Yup.number()
    .required("Zorunlu alan")
    .test(
      "len",
      "Kodunuz 4 hane olmalı",
      (val) => val && val.toString().length === 4
    ),
  newPassword: Yup.string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .required("Zorunlu alan"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Şifreler uyuşmalı")
    .required("Zorunlu alan"),
});

export const nameUpdateSchema = Yup.object({
  name: Yup.string().required("Zorunlu alan"),
});

export const passwordUpdateSchema = Yup.object({
  password: Yup.string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .required("Zorunlu alan"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifreler uyuşmalı")
    .required("Zorunlu alan"),
});

export const emailUpdateSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir e-posta sağlayın")
    .required("Zorunlu alan"),
});

export const phoneNumberUpdateSchema = Yup.object({
  phoneNumber: Yup.string().required("Zorunlu alan"),
});

export const addressUpdateSchema = Yup.object({
  province: Yup.string().required("İl gerekli"),
  city: Yup.string().required("ilçe gerekli"),
  street: Yup.string().required("Mahalle gerekli"),
  avenue: Yup.string().required("Cadde gerekli"),
  no: Yup.string().required("No gerekli"),
});

export const pictureUpdateSchema = Yup.object({
  picture: Yup.string().required("Zorunlu alan"),
});

export const jobTitleUpdateSchema = Yup.object({
  jobTitle: Yup.string().required("Zorunlu alan"),
});

export const companyUpdateSchema = Yup.object({
  company: Yup.string().required("Zorunlu alan"),
});

export const projectCreateSchema = Yup.object({
  projectName: Yup.string().required("Zorunlu alan"),
  projectCode: Yup.string().required("Zorunlu alan"),
});

export const planCreateSchema = Yup.object({
  planName: Yup.string().required("Zorunlu alan"),
  planCode: Yup.string().required("Zorunlu alan"),
  planCategory: Yup.string().required("Zorunlu alan"),
  planImages: Yup.string().required("Zorunlu alan"),
});

export const projectNameUpdateSchema = Yup.object({
  projectName: Yup.string().required("Zorunlu alan"),
});

export const projectCodeUpdateSchema = Yup.object({
  projectCode: Yup.string().required("Zorunlu alan"),
});

export const projectAddressUpdateSchema = Yup.object({
  address: Yup.string().required("Zorunlu alan"),
});

export const personalInfoSchema = Yup.object({
  firstName: Yup.string().required("İsim zorunlu alan"),
  lastName: Yup.string().required("Soyisim zorunlu alan"),
  tc: Yup.string()
    .length(11, "TC kimlik numarası 11 hane olmalıdır")
    .matches(/^[0-9]*$/, "Geçersiz TC kimlik numarası")
    .required("TC kimlik numarası zorunlu alan"),
  birthDate: Yup.date()
    .max(new Date(), "Geçerli bir doğum tarihi girin")
    .required("Doğum tarihi zorunlu alan"),
  address: Yup.string().required("Adres zorunlu alan"),
  phone: Yup.string()
    .matches(/^[0-9]*$/, "Geçersiz telefon numarası")
    .min(10, "Telefon numarası en az 10 hane olmalıdır")
    .required("Telefon numarası zorunlu alan"),
});
