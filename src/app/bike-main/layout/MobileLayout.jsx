import { Navbar } from "../components/Navbar"
import { SidebarMobile } from "../components/SidebarMobile";

export const MobileLayout = ({ objLayout }) => {

  const { stateMenu, theme, children, onHandleClickMenu, menuItems } = objLayout
  const { primary, secondary, background, color } = theme

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="container">
            <div className="row" style={{ height: "60px", backgroundColor: primary }}>
              <Navbar styleColor={{ color }} onHandleClickMenu={onHandleClickMenu} isLayout="mobile" />
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div style={{ backgroundColor: background, height: "auto" }}>
                <SidebarMobile stateMenu={stateMenu} theme={theme} menuItems={menuItems}></SidebarMobile>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
