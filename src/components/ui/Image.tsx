import React from "react";

type TImage = React.FC<{
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  aspect?: number;
  blur?: boolean;
  style?: React.CSSProperties;
}>;

const Image: TImage = ({ src, alt, width = 4, height = 4, borderRadius = 0, aspect, blur = false, style }) => {
  const realWidth = typeof width === "string" ? width : 8 * width;
  const realHeight = typeof height === "string" ? height : 8 * height;
  const realBorderRadius = typeof borderRadius === "string" ? borderRadius : 8 * borderRadius;

  return (
    <div className="relative">
      {blur && (
        <img
          src={src}
          alt={alt}
          width={realWidth}
          height={aspect ? undefined : realHeight}
          style={{
            ...style,
            position: "absolute",
            zIndex: -1,
            inset: 0,
            filter: "blur(12px) saturate(1.5)",
            borderRadius: realBorderRadius,
            aspectRatio: aspect,
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={realWidth}
        height={aspect ? undefined : realHeight}
        style={{
          ...style,
          borderRadius: realBorderRadius,
          aspectRatio: aspect,
        }}
      />
    </div>
  );
};

export default Image;
