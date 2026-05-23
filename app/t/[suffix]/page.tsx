import type { Metadata } from "next";
import { Suspense } from "react";
import { PublicShopPage } from "@/components/shop/PublicShopPage";
import { resolvePublicShop } from "@/lib/shop/public-shop-service";

type PageProps = {
  params: Promise<{ suffix: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { suffix } = await params;
  const result = await resolvePublicShop(suffix);
  if (!result.ok) {
    return { title: "Shop not found" };
  }
  const name = result.data.merchant.nameZh ?? result.data.merchant.name;
  const description =
    result.data.merchant.descriptionZh ?? result.data.merchant.description ?? "";
  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      images: result.data.merchant.logo ? [{ url: result.data.merchant.logo }] : [],
    },
  };
}

export default async function PublicShopRoute({ params }: PageProps) {
  const { suffix } = await params;
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center">
          <p className="text-slate-500">Loading...</p>
        </div>
      }
    >
      <PublicShopPage suffix={suffix} />
    </Suspense>
  );
}
