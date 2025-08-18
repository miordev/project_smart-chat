"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilePlus2, FileText, LoaderCircle } from "lucide-react";

type PdfUploadDialogProps = {
  onUploadSuccess: (documentId: string, documentName: string) => void;
};

export const PdfUploadDialog: React.FC<PdfUploadDialogProps> = ({
  onUploadSuccess,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.size > 10 * 1024 * 1024 || !file.type.includes("pdf")) {
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/pdf", {
        method: "POST",
        body: formData,
      });

      // TODO: Handle errors
      // TODO: Handle success
      if (response.ok) {
        // TODO: Add type for the response
        const data = (await response.json()) as { id: string; name: string };
        onUploadSuccess(data.id, data.name);
        setIsOpen(false);
      }
      // else {
      //   alert(data.error || "Upload failed");
      // }
    } catch (error) {
      console.error("Upload error:", error);
      // alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center justify-center rounded-full"
        >
          <FilePlus2 size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="upload-pdf-dialog-description">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText size={24} className="text-primary" />
            Upload PDF Document
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <div className="flex flex-col items-center justify-center w-full gap-4 p-8 border-2 border-dashed rounded-lg transition-colors hover:border-primary">
            <FileText size={48} className="text-muted-foreground" />
            <DialogDescription className="text-sm text-muted-foreground">
              Drag and drop your PDF here, or click to browse
            </DialogDescription>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleOnChange}
              className="hidden"
              id="pdf-upload"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" />
                  <span>Uploading...</span>
                </div>
              ) : (
                <span>Choose File</span>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Supported format: PDF files up to 10MB
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
