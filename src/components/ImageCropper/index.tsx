import React, { useState } from "react";
import Cropper from "react-cropper";

// types
import { ImageCropperProps } from "./types";

// styles
import "cropperjs/dist/cropper.css";

export default function ImageCropper(props: ImageCropperProps)
{
  return (
    <Cropper
      style={{ height: "100%", width: "100%" }}
      initialAspectRatio={1}
      preview=".img-preview"
      src={props.src}
      viewMode={1}
      minCropBoxHeight={10}
      minCropBoxWidth={10}
      background={false}
      responsive={true}
      autoCropArea={1}
      checkOrientation={false}
      onInitialized={props.onChange}
      guides={true}
      crossOrigin="anonymous"
    />
  );
}
