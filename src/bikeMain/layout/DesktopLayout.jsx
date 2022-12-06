import { Navbar } from "../components/Navbar"
import { SideBarDesktop } from "../components/SideBarDesktop"

export const DesktopLayout = ({ objLayout }) => {

    const { stateMenu, theme, children, onHandleClickMenu, menuItems, noPadding } = objLayout
    const { primary, secondary, background, color } = theme

    const sideBarWidth = (stateMenu) ? 200 : 50;

    const paddingCard = noPadding ? '0px' : '15px'
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="container">
                        <div className="row" style={{ height: "60px", backgroundColor: primary }}>
                            <Navbar styleColor={{ color }} onHandleClickMenu={onHandleClickMenu} isLayout="desktop"/>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row" style={{ height: "calc(100vh - 60px)" }}>
                            <div
                                style={{ backgroundColor: secondary, width: sideBarWidth + "px", height: "auto", padding: "0 5px", boxSizing: "border-box" }}
                            >
                                <SideBarDesktop styleColor={{ color }} stateMenu={stateMenu} menuItems={menuItems}/>
                            </div>
                            <div style={{ backgroundColor: background, width: `calc(100vw - ${sideBarWidth}px)`, padding: paddingCard ,paddingTop: paddingCard }}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
