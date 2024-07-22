export enum EFileType {
    DOCX = 'docx',
    XLSX = 'xlsx',
    PDF = 'pdf',
    OTHER = 'other'
}

export enum EPreviewType {
    RAW,
    URL
}

export interface IRawFile {
    raw: File
    name: string
}

export interface ISaveFile {
    id: string
    name: string
}