import React from "react";

const useMobile = (breakpoints = 768) => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < breakpoints)

    const handleChange = () => {
        const checkPoints = window.innerWidth < breakpoints
        setIsMobile(checkPoints)
    }

    React.useEffect(()=>{
        handleChange()

        window.addEventListener("resize", handleChange)

        return () => {
            window.removeEventListener("resize", handleChange)
        }
    }, [])

    return [ isMobile ]

}

export default useMobile