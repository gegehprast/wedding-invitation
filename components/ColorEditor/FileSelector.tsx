import React from 'react'

const FileSelector: React.FC<{ onChange: (result: string) => void }> = ({ onChange }) => {
    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            const reader = new FileReader()

            reader.readAsArrayBuffer(file)

            reader.onload = e => {
                if (e.target?.result) {
                    const decoder = new TextDecoder('utf-8')
                    const dataView = new DataView(e.target.result as ArrayBuffer)
                    const decodedString = decoder.decode(dataView)

                    onChange(decodedString)
                }
            };
        }
    }

    return (
        <input type="file" id="svg-file" accept='image/svg+xml' onChange={handleFileChange} />
    )
}

export default FileSelector