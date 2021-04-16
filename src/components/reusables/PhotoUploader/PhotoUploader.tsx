/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useDropzone } from "react-dropzone";
import "./PhotoUploader.scss";

interface PhotoUploaderProps {
  /** Function to be called when files are added to the uploader. */
  onDrop: (files: File[]) => void;
}

/** Reusable component for uploading photos. */
export function PhotoUploader({ onDrop }: PhotoUploaderProps): JSX.Element {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop,
  });
  return (
    <div className="photo-uploader">
      <div {...getRootProps()} className={`dropzone${isDragActive ? " drag" : ""}`}>
        <input {...getInputProps()} />
        {acceptedFiles.length === 0 ? (
          <span>Drop file here, or click to browse files.</span>
        ) : (
          <span>
            <i className="fas fa-file-image mr-2" />
            {acceptedFiles[0].name}
          </span>
        )}
      </div>
    </div>
  );
}
