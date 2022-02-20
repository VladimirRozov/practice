export interface User{
  login: string
  password: string
  _id?: string
}

export interface Candidate{
  login: string
  password: string
  first_name: string
  second_name: string
  role: string
  description: string
  _id?: string
}

export interface EducationalProgram{
  name:string
  qualification: string
  specialization: string
  number_code: string
  comments?: Comment[]
  documentSrc: string
  user?: string
  _id?: string
}

export interface Document{
  name:string
  link: string
  documentSrc: string,
  chapter: string,
  _id?: string
}

export interface Message {
  message: string
}


export interface WorkingProgram{
  name: string
  semester: string
  educationalProgram: string
  competencies: Competencies[]
  hours: Hour[]
  comments?: Comment[]
  need_subject: Subjects[]
  for_subject: Subjects[]
  user: string
  _id?: string
}

export interface Theory{
  name: string
  workingProgram: string
  program: Program[]
  documentSrc: string
  user: string
}

export interface Practice{
  name: string
  workingProgram: string
  laborTasks: Lab[]
  newLaborTasks: Lab[]
  documentSrc: string
  user: string
}

export interface Competencies{
  code: string
  description: string
}

export interface Comment{
  text: string
  rating: number
  user: string
}

export interface Hour{
  section: string
  lecture: number
  labs: number
  practice: number
  studWork: number
}

export interface Lab{
  name: string
  description: string
}

export interface Subjects{
  name: string
  semester: number
}

export interface Program{
  section: string
  description: string
}
