"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { loadUser, editProfile, EditProfilePayload } from "@/redux/actions/userActions";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    address: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    email: "",
    company: "",
  });

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        jobTitle: user.jobTitle || "",
        address: user.address || "",
        password: "",
        confirmPassword: "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
        company: user.company || "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSubmit = () => {
  if (formData.password !== formData.confirmPassword) {
    alert("Şifreler eşleşmiyor!");
    return;
  }

  const updatedData = Object.keys(formData).reduce((acc, key) => {
    if (formData[key as keyof typeof formData]) {
      acc[key as keyof EditProfilePayload] = formData[
        key as keyof typeof formData
      ] as string;
    }
    return acc;
  }, {} as EditProfilePayload);

  console.log(updatedData);
  dispatch(editProfile(updatedData));
};

  return (
    <div>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="pb-5">
          <h5>Profili Düzenle</h5>
          <p className="text-muted-foreground font-normal text-sm">
            Profilinizi düzenleyebilir ve inceleyebilirsiniz.
          </p>
        </div>
        <Button className="flex gap-2 text-xs" onClick={handleSubmit}>
          Kaydet
        </Button>
      </div>
      {/* Profile */}
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Kullanıcı Adı</p>
          <p className="text-muted-foreground font-normal text-xs">
            Kullanıcı adını düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="name"
          onChange={handleChange}
          placeholder={formData.name}
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">İş Pozisyonu</p>
          <p className="text-muted-foreground font-normal text-xs">
            İş Pozisyonunu düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="jobTitle"
          onChange={handleChange}
          placeholder={formData.jobTitle}
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Adres</p>
          <p className="text-muted-foreground font-normal text-xs">
            Adresinizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Textarea
          name="address"
          onChange={handleChange}
          placeholder={formData.address}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Şifre</p>
          <p className="text-muted-foreground font-normal text-xs">
            Şifrenizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Şifre"
          className="w-[300px]"
        />
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Şifre Tekrar"
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Telefon Numarası</p>
          <p className="text-muted-foreground font-normal text-xs">
            Telefon Numarasını düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="phoneNumber"
          onChange={handleChange}
          placeholder={formData.phoneNumber}
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Mail Adresi</p>
          <p className="text-muted-foreground font-normal text-xs">
            Mail Adresinizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          name="email"
          onChange={handleChange}
          placeholder={formData.email}
          className="w-[300px]"
        />
      </div>
    </div>
  );
}
