export default function DashboardPage() {
  return (
    <div className="bg-primary text-onPrimary w-full">
      <div className="flex divide-x divide-onPrimary overflow-x-scroll no-scrollbar">
        <div className="bg-surface text-onSurface font-semibold py-2 px-4 shrink-0 flex gap-2 items-center">
          <div>Pesanan Saya</div>
          <div className="size-6 rounded-full text-xs font-bold bg-red-500 text-white flex items-center justify-center">
            1
          </div>
        </div>
        <div className="py-2 px-4 shrink-0 flex gap-2 items-center">
          Orderan Masuk
          <div className="size-6 rounded-full text-xs font-bold bg-red-500 text-white flex items-center justify-center">
            2
          </div>
        </div>
        <div className="py-2 px-4 shrink-0">Produk Saya</div>
        <div className="py-2 px-4 shrink-0">Edit Profil</div>
      </div>
      <div className="bg-surface text-onSurface py-2 px-4">asd</div>
    </div>
  );
}
