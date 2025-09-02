"use client";
import DialogContainer from "@/components/DialogContainer";
import { handleBodyScroll } from "@/utils/handle-body-scroll";
import { createContext, useContext, useEffect, useState } from "react";

type DialogContextType = {
  showDialog: boolean;
  handleShowDialog: (
    showDialog: boolean,
    // dialogType?: DialogTypeEnum,
    // user?: UserType,

    content?: React.ReactNode,
    isFullscreen?: boolean
  ) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

function DialogProvider(props: { children: React.ReactNode }) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  // const [dialogType, setDialogType] = useState<DialogTypeEnum | undefined>();
  // const [user, setUser] = useState<UserType | undefined>();
  const [content, setContent] = useState<React.ReactNode | undefined>();

  const handleShowDialog = (
    showDialog: boolean,
    // dialogType?: DialogTypeEnum,
    // user?: UserType,

    content?: React.ReactNode,
    isFullscreen?: boolean
  ) => {
    handleBodyScroll(!showDialog);
    setShowDialog(showDialog);
    if (isFullscreen) {
      setFullscreen(isFullscreen);
    } else {
      setFullscreen(false);
    }
    // setDialogType(dialogType);
    // setUser(user);
    setContent(content);
  };

  // const getDialogChild = (): React.ReactNode => {
  //   switch (dialogType) {
  //     case DialogTypeEnum.GO_LIVE:
  //       return <GoLive />;
  //     case DialogTypeEnum.CANCEL_LIVE:
  //       return <CancelLive />;
  //     case DialogTypeEnum.FILTER:
  //       return (
  //         <Filters
  //           filters={[
  //             {
  //               label: "Male",
  //               selected: false,
  //               onClick: () => console.log("select male"),
  //             },
  //           ]}
  //         />
  //       );
  //     case DialogTypeEnum.QUESTION:
  //       return <SendLike userToBeLiked={user} />;
  //     case DialogTypeEnum.FEED_IMAGE || DialogTypeEnum.PROFILE_IMAGE:
  //       return (
  //         <ImageUploader
  //           type={
  //             dialogType === DialogTypeEnum.FEED_IMAGE
  //               ? ImageTypeEnum.FEED_IMAGE
  //               : ImageTypeEnum.PROFILE_IMAGE
  //           }
  //         />
  //       );
  //     case DialogTypeEnum.AUTH:
  //       return <AuthSection />;
  //     case DialogTypeEnum.DYNAMIC_DIALOG:
  //       return dynamicDialog;
  //   }
  // };

  useEffect(() => {
    const handleResize = () => {
      handleBodyScroll(!showDialog);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showDialog]);

  return (
    <DialogContext.Provider value={{ showDialog, handleShowDialog }}>
      {showDialog && (
        <DialogContainer
          // title={
          //   dialogType
          //     ? getDialogHeader(dialogType, user?.username)?.title
          //     : undefined
          // }
          // body={
          //   dialogType
          //     ? getDialogHeader(dialogType, user?.username)?.body
          //     : undefined
          // }
          fullscreen={fullscreen}
          closeDialog={() => handleShowDialog(false)}
        >
          {content}
        </DialogContainer>
      )}
      {props.children}
    </DialogContext.Provider>
  );
}

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within DialogProvider");
  }
  return context;
};

export default DialogProvider;
