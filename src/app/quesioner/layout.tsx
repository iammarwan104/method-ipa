import React from "react";

export default function Layout({children}: {children : React.ReactNode}){
    return(
        <>
        <div className="bg-cuslor-1 px-[10%] md:px-[5%] lg:px-[15%] ">
            {children}
        </div>
        </>
    )
}