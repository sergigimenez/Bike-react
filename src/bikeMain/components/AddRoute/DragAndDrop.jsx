import { PhotoSizeSelectActual } from "@mui/icons-material"
import { Icon } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import { useDispatch } from "react-redux"
import { uploadImage } from "../../../store/Card/thunks"

const fileTypes = ["JPG", "JPEG", "PNG"]

export const DragAndDrop = ({ secondary, formState, onInputChange }) => {

  const [imgUrl, setImgUrl] = useState()
  const dispatch = useDispatch()

  const handleChange = (file) => {
    if (formState.titulo != '') {
      let img = dispatch(uploadImage(file, formState.titulo))
      img.then(resp => {
        resp = resp.split('/upload/')
        let respParsed = resp[0] + "/upload/w_1000,ar_1:1,c_fill,g_auto/" + resp[1]
        setImgUrl(respParsed)
      })
    } else {
      console.log('Falta añadir un titulo a la carrera')
    }
  }

  useEffect(() => {
    onInputChange({ "target": { name: 'img', value: imgUrl } })
  }, [imgUrl])


  return (
    <>
      <div className='dragAndDrop offset-2 col-8 d-flex flex-column align-items-center justify-content-evenly' style={{ height: "80%" }} >
        <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%", height: "100%", border: "2px dotted", borderRadius: "20px", borderColor: secondary }}
          >
            {imgUrl
              ? (
                <img style={{ maxWidth: "100%", width: "auto", maxHeight: "100%" }} src={imgUrl}></img>
              )
              : (
                <Icon sx={{ height: 70, width: 70 }}>
                  <PhotoSizeSelectActual sx={{ height: 70, width: 70 }} />
                </Icon>
              )}
          </div>
        </FileUploader>
      </div>
    </>
  )
}
