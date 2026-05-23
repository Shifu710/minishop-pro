"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_SRC =
  "https://placehold.co/600x420/e2e8f0/64748b?text=No+Image";

type Props = {
  alt: string;
  src?: string | null;
  className?: string;
  width: number;
  height: number;
};

export function ProductImage({ alt, src, className, width, height }: Props) {
  const [imgSrc, setImgSrc] = useState(src?.trim() || FALLBACK_SRC);

  return (
    <Image
      alt={alt}
      className={className}
      height={height}
      onError={() => setImgSrc(FALLBACK_SRC)}
      src={imgSrc}
      unoptimized={imgSrc.startsWith("https://placehold.co")}
      width={width}
    />
  );
}
