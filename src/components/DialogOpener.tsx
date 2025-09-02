"use client";
import { ButtonType } from "@/types/ButtonType";
import React from "react";
import Button from "./Button";
import { useDialog } from "@/providers/dialog-provider";

type DialogOpenerProps = {
  children?: React.ReactNode;
  dialogContent: React.ReactNode;
  buttonProps?: ButtonType;
};

export default function DialogOpener({
  children,
  buttonProps,
  dialogContent,
}: DialogOpenerProps) {
  const dialogContext = useDialog();

  const handleOpenDialog = () => {
    dialogContext.handleShowDialog(true, dialogContent);
  };
  return (
    <div>
      {buttonProps ? (
        <Button onClick={handleOpenDialog} {...buttonProps}></Button>
      ) : (
        <div className="cursor-pointer" onClick={handleOpenDialog}>
          {children}
        </div>
      )}
    </div>
  );
}
