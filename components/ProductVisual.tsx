export function ProductVisual({ src, alt }: { src: string; alt: string }) {
  return <img className="product-photo" src={src} alt={alt} />;
}
