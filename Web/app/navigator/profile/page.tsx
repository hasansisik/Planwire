"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { loadUser } from "@/redux/actions/userActions";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="pb-5">
          <h5>Profili Düzenle</h5>
          <p className="text-muted-foreground font-normal text-sm">
            Profilinizi düzenleyebilir ve inceleyebilirsiniz.
          </p>
        </div>
        <Button className="flex gap-2 text-xs">Kaydet</Button>
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
          placeholder={user.name || "Kullanıcı Adı"}
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
          placeholder={user.position || "İş Pozisyonu"}
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
        <Textarea placeholder={user.address || "Adres Bilgileri"} />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Şifre</p>
          <p className="text-muted-foreground font-normal text-xs">
            Şifrenizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input type="password" placeholder="Şifre" className="w-[300px]" />
        <Input
          type="password"
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
          placeholder={user.phoneNumber || "Telefon Numarası"}
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
          placeholder={user.email || "Mail Adresi"}
          className="w-[300px]"
        />
      </div>
    </div>
  );
}
