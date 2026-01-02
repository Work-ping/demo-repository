import CameraComponent from './cameraComponent'
import DropzoneFormInput from '@/components/form/DropzoneFormInput'



export const tabContents = [
  {
    id: '1',
    title: 'Camera',
    component: (
      <CameraComponent />
    ),
    icon: 'bx:camera'
  },
  {
    id: '2',
    title: 'Upload',
    component: (
      <DropzoneFormInput
        iconProps={{
          icon: 'bx:cloud-upload',
          height: 36,
          width: 36
        }}
        text="Drop employee CSV/Excel file here or click to upload."
        helpText={
          <span className="text-muted fs-13">
            Supported formats: <strong>.csv, .xlsx</strong>
            <br />
            (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
          </span>
        }
        showPreview
      />
    ),
    icon: 'bx:upload'
  }
]
