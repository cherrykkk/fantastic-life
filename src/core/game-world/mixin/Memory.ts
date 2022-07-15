import MemoryList from '../../../assets/文字表现形式.json'
import { Calendar } from '../interface/calendar'

interface Memory {
  year: string,
  month: string,
  date: string,
  B?: object,
  AREA?: object,
}

export function buildMemory(calendar: Calendar, topic: string, args: object): Memory {
  const { year,month,date } = calendar 
  const memory: Memory = Object.assign({year,month,date},args)


  return memory
}