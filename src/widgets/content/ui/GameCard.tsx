'use client';

import Link from "next/link";
import { useState } from "react";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  disabled?: boolean;
}

export function GameCard({ id, title, description, image, tags, disabled = false }: GameCardProps) {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div className="card bg-base-100 shadow-sm h-full">
      <figure className="h-48 overflow-hidden">
        <img
          src={imgError ? "/content/placeholder.svg" : image}
          alt={title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <div key={tag} className="badge badge-soft badge-neutral">{tag}</div>
          ))}
        </div>
        <div className="card-actions justify-end mt-4">
          {disabled ? (
            <button className="btn btn-disabled">준비중</button>
          ) : (
            <Link href={`/content/${id}`} className="btn btn-soft">
              게임하기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
