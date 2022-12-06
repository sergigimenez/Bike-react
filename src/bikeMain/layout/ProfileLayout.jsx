export const ProfileLayout = ({ children }) => {

    return (
        <>
            <div className='col-12'>
                <div className='col-12'>
                    <div className='col-12' style={{ padding: 0 }}>
                        <img
                            style={{
                                height: "200px", width: "100%",
                                backgroundImage: "url(https://res.cloudinary.com/dhvkbs4lv/image/upload/v1665306434/bike/catalu%C3%B1a%20bike%20race%202020.png)",
                                backgroundSize: "auto",
                                backgroundPosition: "center",
                                filter: "blur(2px)"
                            }}
                        ></img>
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}
