import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[4/3]',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`${aspectClassName} w-full bg-[#EFEBE0] flex flex-col items-center justify-center p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Leaf className="w-7 h-7 text-[#173D32]/50 mb-2" />
        <span className="text-xs font-medium text-[#173D32]/70 max-w-[18ch]">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`${aspectClassName} w-full overflow-hidden bg-[#EFEBE0] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      />
    </div>
  );
};
