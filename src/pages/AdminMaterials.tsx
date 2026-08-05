import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import {
  fetchMaterials,
  addMaterial,
  updateMaterial,
  deleteMaterial,
  uploadMaterialPhoto,
  MATERIAL_CATEGORIES,
  type Material,
} from "@/data/materials";

const emptyForm = {
  name: "",
  category: MATERIAL_CATEGORIES[0].slug as string,
  price: "",
  unit: "шт",
  description: "",
  imageUrl: "",
  inStock: true,
};

const AdminMaterials = () => {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem("materialsKey") || "");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<Material[]>([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editId, setEditId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = () => fetchMaterials().then(setItems).catch(() => setItems([]));

  useEffect(() => {
    load();
  }, []);

  const notify = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  };

  const handleLogin = () => {
    if (!adminKey.trim()) {
      notify("Введите ключ доступа");
      return;
    }
    localStorage.setItem("materialsKey", adminKey);
    setAuthed(true);
    load();
  };

  const handlePhoto = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadMaterialPhoto(file);
      setForm((f) => ({ ...f, imageUrl: url }));
      notify("Фото загружено");
    } catch {
      notify("Не удалось загрузить фото");
    }
    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.price.trim()) {
      notify("Заполните название и цену");
      return;
    }
    setBusy(true);
    try {
      if (editId) {
        await updateMaterial(adminKey, { ...form, id: editId });
        notify("Товар обновлён");
      } else {
        await addMaterial(adminKey, form);
        notify("Товар добавлен");
      }
      setForm({ ...emptyForm });
      setEditId(null);
      await load();
    } catch (e) {
      notify(e instanceof Error ? e.message : "Ошибка");
    }
    setBusy(false);
  };

  const handleEdit = (m: Material) => {
    setForm({
      name: m.name,
      category: m.category,
      price: m.price,
      unit: m.unit,
      description: m.description,
      imageUrl: m.imageUrl,
      inStock: m.inStock,
    });
    setEditId(m.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить товар?")) return;
    setBusy(true);
    try {
      await deleteMaterial(adminKey, id);
      notify("Товар удалён");
      await load();
    } catch {
      notify("Не удалось удалить");
    }
    setBusy(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <title>Управление стройматериалами</title>
        <meta name="robots" content="noindex, nofollow" />
        <div className="w-full max-w-sm border border-accent/20 rounded-2xl bg-card/40 p-6">
          <Icon name="Lock" size={32} className="text-accent mx-auto mb-4" />
          <h1 className="text-xl font-black text-white text-center mb-6">Вход в управление</h1>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Ключ доступа"
            className="w-full px-4 py-3 rounded-xl bg-background border border-accent/20 text-white mb-3 focus:border-accent outline-none"
          />
          <button
            onClick={handleLogin}
            disabled={busy}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-black font-bold disabled:opacity-50"
          >
            {busy ? "Проверяем..." : "Войти"}
          </button>
          {msg && <p className="text-center text-sm text-red-400 mt-3">{msg}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <title>Управление стройматериалами</title>
      <meta name="robots" content="noindex, nofollow" />

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Стройматериалы</h1>
          <a href="/stroymaterialy" className="text-accent text-sm font-bold hover:underline">
            Открыть каталог →
          </a>
        </div>

        {msg && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-accent/10 border border-accent/30 text-accent text-sm font-semibold">
            {msg}
          </div>
        )}

        <div className="border border-accent/20 rounded-2xl bg-card/40 p-5 sm:p-6 mb-10">
          <h2 className="text-lg font-black text-white mb-5">
            {editId ? "Редактирование товара" : "Добавить товар"}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase">Название</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Кирпич силикатный полуторный М-150"
                className="w-full px-4 py-3 rounded-xl bg-background border border-accent/20 text-white focus:border-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase">Категория</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-accent/20 text-white focus:border-accent outline-none"
              >
                {MATERIAL_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase">Единица</label>
              <input
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                placeholder="шт / м³ / поддон / тонна"
                className="w-full px-4 py-3 rounded-xl bg-background border border-accent/20 text-white focus:border-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase">Цена</label>
              <input
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="от 18 ₽"
                className="w-full px-4 py-3 rounded-xl bg-background border border-accent/20 text-white focus:border-accent outline-none"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background border border-accent/20 w-full cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.inStock}
                  onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                  className="w-4 h-4 accent-yellow-500"
                />
                <span className="text-white text-sm font-semibold">В наличии</span>
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase">Описание</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="Размер, марка, особенности доставки"
                className="w-full px-4 py-3 rounded-xl bg-background border border-accent/20 text-white focus:border-accent outline-none resize-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase">Фото товара</label>
              <div className="flex items-center gap-4 flex-wrap">
                <label className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-accent/30 bg-background text-white text-sm font-semibold cursor-pointer hover:border-accent">
                  <Icon name="Upload" size={16} className="text-accent" />
                  {uploading ? "Загружаем..." : "Выбрать фото"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => e.target.files?.[0] && handlePhoto(e.target.files[0])}
                  />
                </label>
                {form.imageUrl && (
                  <div className="flex items-center gap-3">
                    <img src={form.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg border border-accent/20" />
                    <button
                      onClick={() => setForm({ ...form, imageUrl: "" })}
                      className="text-red-400 text-sm font-semibold hover:underline"
                    >
                      Убрать
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleSubmit}
              disabled={busy}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-black font-bold disabled:opacity-50"
            >
              <Icon name={editId ? "Save" : "Plus"} size={18} />
              {busy ? "Сохраняем..." : editId ? "Сохранить" : "Добавить товар"}
            </button>
            {editId && (
              <button
                onClick={() => {
                  setForm({ ...emptyForm });
                  setEditId(null);
                }}
                className="px-6 py-3 rounded-xl border border-accent/30 text-white font-bold"
              >
                Отмена
              </button>
            )}
          </div>
        </div>

        <h2 className="text-lg font-black text-white mb-4">Товары в каталоге: {items.length}</h2>
        <div className="space-y-3">
          {items.map((m) => {
            const cat = MATERIAL_CATEGORIES.find((c) => c.slug === m.category);
            return (
              <div
                key={m.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-accent/10 bg-card/30 flex-wrap sm:flex-nowrap"
              >
                {m.imageUrl ? (
                  <img src={m.imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-background flex items-center justify-center shrink-0">
                    <Icon name={cat?.icon || "Package"} size={20} className="text-accent/40" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">{m.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {cat?.label || m.category} · {m.price} за {m.unit}
                    {!m.inStock && " · под заказ"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="p-2 rounded-lg border border-accent/30 text-accent hover:bg-accent/10"
                    title="Изменить"
                  >
                    <Icon name="Pencil" size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10"
                    title="Удалить"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            );
          })}
          {items.length === 0 && (
            <p className="text-muted-foreground text-sm py-8 text-center">Товаров пока нет</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMaterials;