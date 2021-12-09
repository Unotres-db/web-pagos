import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";

const useUnsavedWarning = (message = "Do you want to leave the form without finalizing it ?")  => {

    const [isDirty, setIsDirty] = useState (false) ;

    useEffect(() => {
        //Detecting browser closing
        window.onbeforeunload = isDirty && (() => message);

        return () => {
           window.onbeforeunload = null;
        };
    }, [isDirty]);

    const routerPrompt = <Prompt when={isDirty} message={message} />;

    return [ routerPrompt, () => setIsDirty(true), () => setIsDirty(false)];
};

export default useUnsavedWarning;