/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useDropzone } from "react-dropzone";
import "./PhotoUploader.scss";

interface PhotoUploaderProps {
  onDrop: (files: File[]) => void;
}

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
